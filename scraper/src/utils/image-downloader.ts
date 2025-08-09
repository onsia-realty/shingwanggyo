import { BrowserContext } from 'playwright';
import fs from 'fs/promises';
import path from 'path';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import mime from 'mime-types';
import { Logger } from './logger.js';

interface DownloadResult {
  success: boolean;
  path?: string;
  size?: number;
  error?: string;
}

export class ImageDownloader {
  private downloadedUrls = new Set<string>();
  private downloadedPaths = new Set<string>();

  constructor(
    private context: BrowserContext,
    private outputDir: string,
    private logger: Logger
  ) {}

  async download(imageUrl: string): Promise<DownloadResult> {
    // Skip if already downloaded
    if (this.downloadedUrls.has(imageUrl)) {
      this.logger.debug(`⏭️ Already downloaded: ${imageUrl}`);
      return { success: false, error: 'Already downloaded' };
    }

    try {
      // Parse URL
      const url = new URL(imageUrl);
      
      // Generate local path
      const localPath = await this.generateLocalPath(url);
      
      // Check if file already exists
      if (this.downloadedPaths.has(localPath)) {
        this.logger.debug(`📁 File already exists: ${localPath}`);
        this.downloadedUrls.add(imageUrl);
        return { success: false, error: 'File exists' };
      }

      // Check if file exists on disk
      try {
        const stats = await fs.stat(localPath);
        if (stats.isFile()) {
          this.logger.debug(`📁 File already exists on disk: ${localPath}`);
          this.downloadedUrls.add(imageUrl);
          this.downloadedPaths.add(localPath);
          return { success: false, error: 'File exists on disk' };
        }
      } catch {
        // File doesn't exist, continue with download
      }

      // Create directory if needed
      const dir = path.dirname(localPath);
      await fs.mkdir(dir, { recursive: true });

      // Download image using Playwright's request API
      const response = await this.context.request.get(imageUrl, {
        timeout: 30000,
        maxRedirects: 5,
      });

      // Check response status
      if (!response.ok()) {
        throw new Error(`HTTP ${response.status()} ${response.statusText()}`);
      }

      // Get the response body
      const buffer = await response.body();
      
      // Write to file
      await fs.writeFile(localPath, buffer);
      
      // Get file size
      const stats = await fs.stat(localPath);
      
      // Mark as downloaded
      this.downloadedUrls.add(imageUrl);
      this.downloadedPaths.add(localPath);
      
      this.logger.success(`✅ Downloaded: ${path.basename(localPath)} (${this.formatBytes(stats.size)})`);
      
      return {
        success: true,
        path: localPath,
        size: stats.size,
      };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.logger.error(`❌ Failed to download ${imageUrl}: ${errorMessage}`);
      
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  private async generateLocalPath(url: URL): Promise<string> {
    // Remove query parameters
    let pathname = url.pathname;
    
    // Handle root path
    if (pathname === '/' || pathname === '') {
      pathname = '/index';
    }

    // Remove leading slash
    if (pathname.startsWith('/')) {
      pathname = pathname.substring(1);
    }

    // Decode URL-encoded characters
    pathname = decodeURIComponent(pathname);

    // Replace invalid filename characters
    pathname = pathname.replace(/[<>:"|?*]/g, '_');

    // Ensure proper extension
    let localPath = path.join(this.outputDir, pathname);
    
    // Check if path has an extension
    const ext = path.extname(localPath);
    if (!ext || ext === '.') {
      // Try to determine extension from URL
      const urlExt = this.getExtensionFromUrl(url.href);
      if (urlExt) {
        localPath += urlExt;
      } else {
        // Default to .jpg for images without extension
        localPath += '.jpg';
      }
    }

    // Handle special characters in filename
    const dir = path.dirname(localPath);
    const filename = path.basename(localPath);
    const sanitizedFilename = filename.replace(/[^\w\-. ]/g, '_');
    
    return path.join(dir, sanitizedFilename);
  }

  private getExtensionFromUrl(url: string): string | null {
    // Common image extensions
    const imageExtensions = [
      '.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', 
      '.bmp', '.ico', '.tiff', '.avif'
    ];

    const lowercaseUrl = url.toLowerCase();
    
    for (const ext of imageExtensions) {
      if (lowercaseUrl.includes(ext)) {
        return ext;
      }
    }

    return null;
  }

  private formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  async getStatistics(): Promise<{
    totalDownloaded: number;
    uniquePaths: number;
  }> {
    return {
      totalDownloaded: this.downloadedUrls.size,
      uniquePaths: this.downloadedPaths.size,
    };
  }
}