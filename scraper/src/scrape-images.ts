#!/usr/bin/env node

import { chromium, Browser, BrowserContext, Page } from 'playwright';
import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import pLimit from 'p-limit';
import path from 'path';
import { RobotsChecker } from './utils/robots-parser.js';
import { ImageDownloader } from './utils/image-downloader.js';
import { Logger } from './utils/logger.js';

interface ScraperOptions {
  url: string;
  sameOrigin: boolean;
  depth: number;
  concurrency: number;
  out: string;
  ignoreRobots: boolean;
  userAgent?: string;
  timeout: number;
  delay: [number, number];
  verbose: boolean;
}

class ImageScraper {
  private browser?: Browser;
  private context?: BrowserContext;
  private visitedUrls = new Set<string>();
  private imageUrls = new Set<string>();
  private downloadedImages = new Set<string>();
  private robotsChecker?: RobotsChecker;
  private imageDownloader?: ImageDownloader;
  private logger: Logger;
  private limit: ReturnType<typeof pLimit>;
  private stats = {
    pagesVisited: 0,
    imagesFound: 0,
    imagesDownloaded: 0,
    imagesFailed: 0,
    bytesDownloaded: 0,
  };

  constructor(private options: ScraperOptions) {
    this.limit = pLimit(options.concurrency);
    this.logger = new Logger(options.verbose);
  }

  async initialize(): Promise<void> {
    this.logger.info('🚀 Initializing scraper...');
    
    // Launch browser
    this.browser = await chromium.launch({
      headless: true,
      args: ['--disable-blink-features=AutomationControlled'],
    });

    // Create context with custom user agent
    this.context = await this.browser.newContext({
      userAgent: this.options.userAgent || 
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      viewport: { width: 1920, height: 1080 },
      locale: 'ko-KR',
    });

    // Initialize utilities
    this.imageDownloader = new ImageDownloader(
      this.context,
      this.options.out,
      this.logger
    );

    // Check robots.txt if not ignored
    if (!this.options.ignoreRobots) {
      const baseUrl = new URL(this.options.url);
      this.robotsChecker = new RobotsChecker(baseUrl.origin, this.logger);
      await this.robotsChecker.initialize();
    }

    this.logger.success('✅ Scraper initialized successfully');
  }

  async scrape(): Promise<void> {
    const startTime = Date.now();
    
    try {
      await this.initialize();
      
      this.logger.info(`🎯 Starting scrape from: ${chalk.cyan(this.options.url)}`);
      this.logger.info(`📊 Configuration: depth=${this.options.depth}, concurrency=${this.options.concurrency}, same-origin=${this.options.sameOrigin}`);
      
      // Start crawling from the initial URL
      await this.crawlPage(this.options.url, 0);
      
      // Download all collected images
      await this.downloadAllImages();
      
      // Print final statistics
      const duration = ((Date.now() - startTime) / 1000).toFixed(2);
      this.printStatistics(duration);
      
    } catch (error) {
      this.logger.error(`Fatal error: ${error}`);
      throw error;
    } finally {
      await this.cleanup();
    }
  }

  private async crawlPage(url: string, depth: number): Promise<void> {
    // Check if already visited or exceeds depth
    if (this.visitedUrls.has(url) || depth > this.options.depth) {
      return;
    }

    // Check robots.txt
    if (this.robotsChecker && !await this.robotsChecker.isAllowed(url)) {
      this.logger.warn(`🚫 Blocked by robots.txt: ${url}`);
      return;
    }

    // Check same-origin policy
    if (this.options.sameOrigin) {
      const baseOrigin = new URL(this.options.url).origin;
      const currentOrigin = new URL(url).origin;
      if (baseOrigin !== currentOrigin) {
        this.logger.debug(`⏭️ Skipping different origin: ${url}`);
        return;
      }
    }

    this.visitedUrls.add(url);
    this.stats.pagesVisited++;

    this.logger.info(`📄 Visiting [${depth}/${this.options.depth}]: ${chalk.gray(url)}`);

    const page = await this.context!.newPage();
    
    try {
      // Add random delay to be polite
      const delay = this.randomDelay();
      await page.waitForTimeout(delay);

      // Navigate to the page
      await page.goto(url, {
        waitUntil: 'networkidle',
        timeout: this.options.timeout,
      });

      // Extract images from the page
      const images = await this.extractImages(page);
      images.forEach(img => this.imageUrls.add(img));
      this.stats.imagesFound += images.length;
      
      if (images.length > 0) {
        this.logger.success(`🖼️ Found ${images.length} images on ${chalk.gray(url)}`);
      }

      // Extract links for further crawling
      if (depth < this.options.depth) {
        const links = await this.extractLinks(page);
        const crawlPromises = links.map(link => 
          this.limit(() => this.crawlPage(link, depth + 1))
        );
        await Promise.all(crawlPromises);
      }

    } catch (error) {
      this.logger.error(`Failed to crawl ${url}: ${error}`);
    } finally {
      await page.close();
    }
  }

  private async extractImages(page: Page): Promise<string[]> {
    const images = await page.evaluate(() => {
      const imageUrls = new Set<string>();
      const baseUrl = window.location.origin;

      // Helper function to resolve relative URLs
      const resolveUrl = (url: string): string => {
        if (!url) return '';
        try {
          return new URL(url, baseUrl).href;
        } catch {
          return '';
        }
      };

      // 1. Extract from <img> tags
      document.querySelectorAll('img').forEach(img => {
        if (img.src) imageUrls.add(resolveUrl(img.src));
        
        // Parse srcset
        if (img.srcset) {
          img.srcset.split(',').forEach(src => {
            const url = src.trim().split(' ')[0];
            if (url) imageUrls.add(resolveUrl(url));
          });
        }
      });

      // 2. Extract from <picture> and <source> elements
      document.querySelectorAll('picture source').forEach(source => {
        if (source.srcset) {
          source.srcset.split(',').forEach(src => {
            const url = src.trim().split(' ')[0];
            if (url) imageUrls.add(resolveUrl(url));
          });
        }
      });

      // 3. Extract from background-image in inline styles
      document.querySelectorAll('[style*="background-image"]').forEach(element => {
        const style = element.getAttribute('style') || '';
        const matches = style.match(/url\(['"]?([^'")]+)['"]?\)/g);
        if (matches) {
          matches.forEach(match => {
            const url = match.replace(/url\(['"]?([^'")]+)['"]?\)/, '$1');
            if (url && !url.startsWith('data:')) {
              imageUrls.add(resolveUrl(url));
            }
          });
        }
      });

      // 4. Extract from computed styles
      document.querySelectorAll('*').forEach(element => {
        const computedStyle = window.getComputedStyle(element);
        const bgImage = computedStyle.backgroundImage;
        if (bgImage && bgImage !== 'none') {
          const matches = bgImage.match(/url\(['"]?([^'")]+)['"]?\)/g);
          if (matches) {
            matches.forEach(match => {
              const url = match.replace(/url\(['"]?([^'")]+)['"]?\)/, '$1');
              if (url && !url.startsWith('data:')) {
                imageUrls.add(resolveUrl(url));
              }
            });
          }
        }
      });

      // 5. Extract from link preload/prefetch
      document.querySelectorAll('link[rel="preload"][as="image"], link[rel="prefetch"][as="image"]').forEach(link => {
        const href = link.getAttribute('href');
        if (href) imageUrls.add(resolveUrl(href));
      });

      return Array.from(imageUrls).filter(url => url && url.startsWith('http'));
    });

    return images;
  }

  private async extractLinks(page: Page): Promise<string[]> {
    const links = await page.evaluate(() => {
      const baseUrl = window.location.origin;
      const linkSet = new Set<string>();

      document.querySelectorAll('a[href]').forEach(anchor => {
        const href = anchor.getAttribute('href');
        if (href && !href.startsWith('#') && !href.startsWith('javascript:')) {
          try {
            const url = new URL(href, baseUrl).href;
            linkSet.add(url);
          } catch {
            // Ignore invalid URLs
          }
        }
      });

      return Array.from(linkSet);
    });

    return links;
  }

  private async downloadAllImages(): Promise<void> {
    const spinner = ora('Downloading images...').start();
    const totalImages = this.imageUrls.size;
    let current = 0;

    const downloadPromises = Array.from(this.imageUrls).map(imageUrl => 
      this.limit(async () => {
        current++;
        spinner.text = `Downloading images... [${current}/${totalImages}]`;
        
        const result = await this.imageDownloader!.download(imageUrl);
        
        if (result.success) {
          this.downloadedImages.add(imageUrl);
          this.stats.imagesDownloaded++;
          this.stats.bytesDownloaded += result.size || 0;
        } else {
          this.stats.imagesFailed++;
        }
      })
    );

    await Promise.all(downloadPromises);
    spinner.succeed(`Downloaded ${this.stats.imagesDownloaded} images`);
  }

  private randomDelay(): number {
    const [min, max] = this.options.delay;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private printStatistics(duration: string): void {
    console.log('\n' + chalk.bold.green('📊 Scraping Statistics:'));
    console.log(chalk.gray('─'.repeat(50)));
    console.log(`⏱️  Duration: ${chalk.yellow(duration + 's')}`);
    console.log(`📄 Pages visited: ${chalk.cyan(this.stats.pagesVisited)}`);
    console.log(`🖼️  Images found: ${chalk.cyan(this.stats.imagesFound)}`);
    console.log(`✅ Images downloaded: ${chalk.green(this.stats.imagesDownloaded)}`);
    console.log(`❌ Images failed: ${chalk.red(this.stats.imagesFailed)}`);
    console.log(`💾 Total size: ${chalk.yellow(this.formatBytes(this.stats.bytesDownloaded))}`);
    console.log(`📁 Output directory: ${chalk.cyan(path.resolve(this.options.out))}`);
    console.log(chalk.gray('─'.repeat(50)));
  }

  private formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  private async cleanup(): Promise<void> {
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
    this.logger.info('🧹 Cleanup completed');
  }
}

// CLI Setup
const program = new Command();

program
  .name('image-scraper')
  .description('Professional image scraper using Playwright')
  .version('1.0.0')
  .requiredOption('--url <url>', 'Starting URL to scrape')
  .option('--same-origin', 'Only crawl pages from the same origin', true)
  .option('--no-same-origin', 'Allow crawling to different origins')
  .option('--depth <number>', 'Maximum crawl depth', '2')
  .option('--concurrency <number>', 'Number of concurrent downloads', '6')
  .option('--out <path>', 'Output directory', './public')
  .option('--ignore-robots', 'Ignore robots.txt', false)
  .option('--user-agent <string>', 'Custom user agent')
  .option('--timeout <number>', 'Page load timeout in ms', '30000')
  .option('--delay <min-max>', 'Random delay between requests (ms)', '250-600')
  .option('--verbose', 'Enable verbose logging', false);

program.parse();

const options = program.opts();

// Parse delay option
const delayRange = options.delay.split('-').map(Number) as [number, number];

const scraperOptions: ScraperOptions = {
  url: options.url,
  sameOrigin: options.sameOrigin,
  depth: parseInt(options.depth),
  concurrency: parseInt(options.concurrency),
  out: options.out,
  ignoreRobots: options.ignoreRobots,
  userAgent: options.userAgent,
  timeout: parseInt(options.timeout),
  delay: delayRange,
  verbose: options.verbose,
};

// Run scraper
const scraper = new ImageScraper(scraperOptions);
scraper.scrape().catch(error => {
  console.error(chalk.red('Fatal error:'), error);
  process.exit(1);
});