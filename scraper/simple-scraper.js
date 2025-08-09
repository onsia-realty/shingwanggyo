const { chromium } = require('playwright');
const fs = require('fs').promises;
const path = require('path');

async function scrapeImages() {
  console.log('🚀 Starting image scraper...');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });
  
  const page = await context.newPage();
  
  try {
    console.log('📄 Navigating to: https://xn--hy1bu3cwyp7ydd9oftd.com');
    await page.goto('https://xn--hy1bu3cwyp7ydd9oftd.com', {
      waitUntil: 'networkidle',
      timeout: 60000
    });
    
    console.log('🔍 Extracting images...');
    
    // Extract all image URLs
    const imageUrls = await page.evaluate(() => {
      const images = new Set();
      const baseUrl = window.location.origin;
      
      // Helper to resolve URLs
      function resolveUrl(url) {
        if (!url) return null;
        try {
          return new URL(url, baseUrl).href;
        } catch {
          return null;
        }
      }
      
      // Get from img tags
      document.querySelectorAll('img').forEach(img => {
        if (img.src) {
          const resolved = resolveUrl(img.src);
          if (resolved) images.add(resolved);
        }
      });
      
      // Get from background images
      document.querySelectorAll('*').forEach(el => {
        const style = window.getComputedStyle(el);
        const bg = style.backgroundImage;
        if (bg && bg !== 'none') {
          const matches = bg.match(/url\(["']?([^"')]+)["']?\)/);
          if (matches && matches[1]) {
            const resolved = resolveUrl(matches[1]);
            if (resolved && !resolved.startsWith('data:')) {
              images.add(resolved);
            }
          }
        }
      });
      
      return Array.from(images);
    });
    
    console.log(`✅ Found ${imageUrls.length} images`);
    
    // Create output directory
    const outputDir = path.join(__dirname, '..', 'public', 'scraped-images');
    await fs.mkdir(outputDir, { recursive: true });
    
    // Download images
    let downloaded = 0;
    for (const imageUrl of imageUrls) {
      try {
        console.log(`📥 Downloading: ${imageUrl}`);
        
        const response = await context.request.get(imageUrl, {
          timeout: 30000
        });
        
        if (response.ok()) {
          const buffer = await response.body();
          
          // Generate filename from URL
          const urlPath = new URL(imageUrl).pathname;
          let filename = path.basename(urlPath);
          
          // If no filename, generate one
          if (!filename || filename === '/') {
            filename = `image_${downloaded + 1}.jpg`;
          }
          
          // Save file
          const filePath = path.join(outputDir, filename);
          await fs.writeFile(filePath, buffer);
          
          console.log(`✅ Saved: ${filename}`);
          downloaded++;
        }
      } catch (error) {
        console.error(`❌ Failed to download ${imageUrl}:`, error.message);
      }
    }
    
    console.log(`\n📊 Summary: Downloaded ${downloaded}/${imageUrls.length} images`);
    console.log(`📁 Saved to: ${outputDir}`);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await browser.close();
    console.log('🧹 Browser closed');
  }
}

// Run the scraper
scrapeImages().catch(console.error);