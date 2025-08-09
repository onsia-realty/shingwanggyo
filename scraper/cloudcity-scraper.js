const { chromium } = require('playwright');
const fs = require('fs').promises;
const path = require('path');

// 크롤링할 클라우드시티 사이트 페이지 URL 목록
const PAGES_TO_SCRAPE = [
  'http://www.cloudcity.taeboksolution.com/page/page55',  // 메인
  'http://www.cloudcity.taeboksolution.com/page/page01',  // 사업개요
  'http://www.cloudcity.taeboksolution.com/page/page02',  // 브랜드
  'http://www.cloudcity.taeboksolution.com/page/page03',  // 프리미엄
  'http://www.cloudcity.taeboksolution.com/page/page04',  // 입지환경
  'http://www.cloudcity.taeboksolution.com/page/page05',  // 단지정보
  'http://www.cloudcity.taeboksolution.com/page/page06',  // 부대시설&컨시어지
  'http://www.cloudcity.taeboksolution.com/page/page07',  // 금융 및 세제혜택
  'http://www.cloudcity.taeboksolution.com/page/page08',  // 층별안내
  'http://www.cloudcity.taeboksolution.com/page/page09',  // 홍보영상
  'http://www.cloudcity.taeboksolution.com/page/page10',  // 언론보도
  'http://www.cloudcity.taeboksolution.com/page/page11',  // 모델하우스 사진
];

async function scrapeCloudCityPages() {
  console.log('🚀 Starting CloudCity site scraper...');
  console.log(`📋 Will scrape ${PAGES_TO_SCRAPE.length} pages\n`);
  
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--disable-blink-features=AutomationControlled']
  });
  
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1920, height: 1080 },
    locale: 'ko-KR'
  });
  
  const allImageUrls = new Set();
  const pageImageMap = new Map();
  
  try {
    // 각 페이지 크롤링
    for (const pageUrl of PAGES_TO_SCRAPE) {
      console.log(`\n📄 Processing: ${pageUrl}`);
      const page = await context.newPage();
      
      try {
        // 랜덤 딜레이 (예의있게)
        await page.waitForTimeout(Math.random() * 1000 + 500);
        
        await page.goto(pageUrl, {
          waitUntil: 'networkidle',
          timeout: 60000
        });
        
        // 스크롤하여 lazy loading 이미지 로드
        await autoScroll(page);
        
        // 이미지 URL 추출
        const imageUrls = await page.evaluate(() => {
          const images = new Set();
          const baseUrl = window.location.origin;
          
          function resolveUrl(url) {
            if (!url) return null;
            try {
              return new URL(url, baseUrl).href;
            } catch {
              return null;
            }
          }
          
          // 1. img 태그
          document.querySelectorAll('img').forEach(img => {
            if (img.src) {
              const resolved = resolveUrl(img.src);
              if (resolved) images.add(resolved);
            }
            // srcset 처리
            if (img.srcset) {
              img.srcset.split(',').forEach(src => {
                const url = src.trim().split(' ')[0];
                if (url) {
                  const resolved = resolveUrl(url);
                  if (resolved) images.add(resolved);
                }
              });
            }
          });
          
          // 2. picture source 태그
          document.querySelectorAll('picture source').forEach(source => {
            if (source.srcset) {
              source.srcset.split(',').forEach(src => {
                const url = src.trim().split(' ')[0];
                if (url) {
                  const resolved = resolveUrl(url);
                  if (resolved) images.add(resolved);
                }
              });
            }
          });
          
          // 3. 배경 이미지 (인라인 스타일)
          document.querySelectorAll('[style*="background-image"]').forEach(el => {
            const style = el.getAttribute('style');
            const matches = style.match(/url\(['"]?([^'")]+)['"]?\)/g);
            if (matches) {
              matches.forEach(match => {
                const url = match.replace(/url\(['"]?([^'")]+)['"]?\)/, '$1');
                if (url && !url.startsWith('data:')) {
                  const resolved = resolveUrl(url);
                  if (resolved) images.add(resolved);
                }
              });
            }
          });
          
          // 4. 계산된 스타일의 배경 이미지
          document.querySelectorAll('*').forEach(el => {
            const style = window.getComputedStyle(el);
            const bg = style.backgroundImage;
            if (bg && bg !== 'none') {
              const matches = bg.match(/url\(['"]?([^'")]+)['"]?\)/g);
              if (matches) {
                matches.forEach(match => {
                  const url = match.replace(/url\(['"]?([^'")]+)['"]?\)/, '$1');
                  if (url && !url.startsWith('data:')) {
                    const resolved = resolveUrl(url);
                    if (resolved) images.add(resolved);
                  }
                });
              }
            }
          });
          
          return Array.from(images);
        });
        
        console.log(`  ✅ Found ${imageUrls.length} images`);
        
        // 페이지별 이미지 저장
        pageImageMap.set(pageUrl, imageUrls);
        imageUrls.forEach(url => allImageUrls.add(url));
        
      } catch (error) {
        console.error(`  ❌ Failed to process ${pageUrl}:`, error.message);
      } finally {
        await page.close();
      }
    }
    
    console.log(`\n📊 Total unique images found: ${allImageUrls.size}`);
    
    // 출력 디렉토리 생성
    const outputDir = path.join(__dirname, '..', 'public', 'cloudcity-images');
    await fs.mkdir(outputDir, { recursive: true });
    
    // 페이지별 폴더 생성
    const pageFolders = {
      'page55': 'main',
      'page01': 'business',
      'page02': 'brand', 
      'page03': 'premium',
      'page04': 'environment',
      'page05': 'complex-info',
      'page06': 'facilities',
      'page07': 'finance',
      'page08': 'floor-plan',
      'page09': 'video',
      'page10': 'media',
      'page11': 'gallery'
    };
    
    // 이미지 다운로드
    console.log('\n📥 Starting image downloads...\n');
    let downloaded = 0;
    let failed = 0;
    const downloadedFiles = new Map();
    
    for (const imageUrl of allImageUrls) {
      try {
        // 이미 다운로드한 파일인지 확인
        if (downloadedFiles.has(imageUrl)) {
          console.log(`  ⏭️ Already downloaded: ${imageUrl}`);
          continue;
        }
        
        console.log(`  📥 Downloading: ${imageUrl}`);
        
        const response = await context.request.get(imageUrl, {
          timeout: 30000,
          maxRedirects: 5
        });
        
        if (response.ok()) {
          const buffer = await response.body();
          
          // URL에서 파일명 생성
          const urlObj = new URL(imageUrl);
          let filename = path.basename(urlObj.pathname);
          
          // 파일명이 없거나 루트인 경우
          if (!filename || filename === '/' || filename === '') {
            filename = `image_${downloaded + 1}.jpg`;
          }
          
          // URL 파라미터 제거
          filename = filename.split('?')[0];
          
          // 파일명 안전하게 처리
          filename = filename.replace(/[<>:"|?*]/g, '_');
          
          // 어느 페이지에서 찾았는지 확인하여 적절한 폴더에 저장
          let targetFolder = outputDir;
          for (const [pageUrl, images] of pageImageMap) {
            if (images.includes(imageUrl)) {
              const pageName = Object.keys(pageFolders).find(key => pageUrl.includes(key));
              if (pageName && pageFolders[pageName]) {
                targetFolder = path.join(outputDir, pageFolders[pageName]);
                await fs.mkdir(targetFolder, { recursive: true });
                break;
              }
            }
          }
          
          const filePath = path.join(targetFolder, filename);
          
          // 동일 파일명이 있는 경우 처리
          let finalPath = filePath;
          let counter = 1;
          while (downloadedFiles.has(finalPath)) {
            const ext = path.extname(filename);
            const nameWithoutExt = path.basename(filename, ext);
            finalPath = path.join(targetFolder, `${nameWithoutExt}_${counter}${ext}`);
            counter++;
          }
          
          await fs.writeFile(finalPath, buffer);
          
          console.log(`    ✅ Saved: ${path.relative(outputDir, finalPath)}`);
          downloadedFiles.set(imageUrl, finalPath);
          downloaded++;
        } else {
          console.log(`    ❌ HTTP ${response.status()} for ${imageUrl}`);
          failed++;
        }
      } catch (error) {
        console.error(`    ❌ Failed: ${error.message}`);
        failed++;
      }
    }
    
    // 통계 출력
    console.log('\n' + '='.repeat(60));
    console.log('📊 FINAL STATISTICS - CLOUDCITY SCRAPER');
    console.log('='.repeat(60));
    console.log(`📄 Pages crawled: ${PAGES_TO_SCRAPE.length}`);
    console.log(`🖼️ Total unique images found: ${allImageUrls.size}`);
    console.log(`✅ Successfully downloaded: ${downloaded}`);
    console.log(`❌ Failed downloads: ${failed}`);
    console.log(`📁 Output directory: ${outputDir}`);
    console.log('='.repeat(60));
    
    // 페이지별 통계
    console.log('\n📈 Images per page:');
    for (const [pageUrl, images] of pageImageMap) {
      const pageName = path.basename(pageUrl);
      console.log(`  ${pageName}: ${images.length} images`);
    }
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
  } finally {
    await browser.close();
    console.log('\n🧹 Browser closed');
  }
}

// 자동 스크롤 함수 (lazy loading 대응)
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
  
  // 스크롤 후 이미지 로딩 대기
  await page.waitForTimeout(2000);
}

// 실행
scrapeCloudCityPages().catch(console.error);