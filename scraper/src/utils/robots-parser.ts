import robotsParser from 'robots-parser';
import { Logger } from './logger.js';

export class RobotsChecker {
  private robots?: ReturnType<typeof robotsParser>;
  private userAgent: string = '*';
  
  constructor(
    private baseUrl: string,
    private logger: Logger
  ) {}

  async initialize(): Promise<void> {
    try {
      const robotsUrl = new URL('/robots.txt', this.baseUrl).href;
      this.logger.debug(`Fetching robots.txt from: ${robotsUrl}`);
      
      const response = await fetch(robotsUrl);
      
      if (response.ok) {
        const robotsTxt = await response.text();
        this.robots = robotsParser(robotsUrl, robotsTxt);
        this.logger.success('✅ Robots.txt loaded successfully');
      } else {
        this.logger.warn(`⚠️ No robots.txt found at ${robotsUrl} (${response.status})`);
      }
    } catch (error) {
      this.logger.warn(`⚠️ Failed to fetch robots.txt: ${error}`);
    }
  }

  async isAllowed(url: string): Promise<boolean> {
    if (!this.robots) {
      // If no robots.txt, allow all
      return true;
    }

    const allowed = this.robots.isAllowed(url, this.userAgent) ?? true;
    
    if (!allowed) {
      this.logger.debug(`🚫 URL blocked by robots.txt: ${url}`);
    }
    
    return allowed;
  }

  getCrawlDelay(): number {
    if (!this.robots) {
      return 0;
    }
    
    return this.robots.getCrawlDelay(this.userAgent) ?? 0;
  }

  getSitemaps(): string[] {
    if (!this.robots) {
      return [];
    }
    
    return this.robots.getSitemaps();
  }
}