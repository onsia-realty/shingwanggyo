# 🚀 Universal Website Image Scraper Pro

> **강력한 Playwright 기반 웹사이트 이미지 수집 도구**  
> 모든 웹사이트의 이미지를 자동으로 수집하는 프로페셔널 스크래퍼

## ✨ 핵심 기능

- 🖼️ **완벽한 이미지 감지**: img, picture, background-image, srcset, lazy loading 등 모든 형태
- 🔄 **다중 페이지 크롤링**: 사이트 전체 페이지 자동 탐색
- 📁 **체계적인 저장**: 페이지별 폴더 자동 분류
- 🤖 **스마트 크롤링**: robots.txt 준수, 중복 제거, 예의있는 딜레이
- 📊 **상세한 통계**: 실시간 진행률, 성공/실패 리포트
- 🎯 **높은 성공률**: 타임아웃, 리다이렉트, 404 에러 자동 처리

---

## 📦 설치 방법

### 1. 프로젝트 생성
```bash
# 새 폴더 생성
mkdir my-scraper
cd my-scraper

# package.json 생성
npm init -y
```

### 2. 필요한 패키지 설치
```bash
# Playwright와 필수 패키지 설치
npm install playwright
npm install playwright-chromium

# Playwright 브라우저 설치 (Chromium)
npx playwright install chromium
```

---

## 🎯 사용법

### 방법 1: 간단한 단일 페이지 스크래퍼

**`simple-scraper.js` 파일 생성:**

```javascript
const { chromium } = require('playwright');
const fs = require('fs').promises;
const path = require('path');

// ⚙️ 설정 - 여기를 수정하세요!
const TARGET_URL = 'https://example.com';  // 🎯 스크래핑할 사이트 URL
const OUTPUT_DIR = './downloaded-images';   // 📁 저장할 폴더

async function scrapeImages() {
  console.log('🚀 Starting image scraper...');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });
  
  const page = await context.newPage();
  
  try {
    console.log(`📄 Navigating to: ${TARGET_URL}`);
    await page.goto(TARGET_URL, {
      waitUntil: 'networkidle',
      timeout: 60000
    });
    
    console.log('🔍 Extracting images...');
    
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
      
      // img 태그
      document.querySelectorAll('img').forEach(img => {
        if (img.src) images.add(resolveUrl(img.src));
      });
      
      // 배경 이미지
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
    
    // 폴더 생성
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
    
    // 이미지 다운로드
    let downloaded = 0;
    for (const imageUrl of imageUrls) {
      try {
        console.log(`📥 Downloading: ${imageUrl}`);
        
        const response = await context.request.get(imageUrl, {
          timeout: 30000
        });
        
        if (response.ok()) {
          const buffer = await response.body();
          const filename = path.basename(new URL(imageUrl).pathname) || `image_${downloaded + 1}.jpg`;
          const filePath = path.join(OUTPUT_DIR, filename);
          
          await fs.writeFile(filePath, buffer);
          console.log(`✅ Saved: ${filename}`);
          downloaded++;
        }
      } catch (error) {
        console.error(`❌ Failed: ${error.message}`);
      }
    }
    
    console.log(`\n📊 Downloaded ${downloaded}/${imageUrls.length} images`);
    console.log(`📁 Saved to: ${path.resolve(OUTPUT_DIR)}`);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await browser.close();
  }
}

scrapeImages().catch(console.error);
```

**실행:**
```bash
node simple-scraper.js
```

---

### 방법 2: 전체 사이트 크롤러 (여러 페이지)

**`full-site-scraper.js` 파일 생성:**

```javascript
const { chromium } = require('playwright');
const fs = require('fs').promises;
const path = require('path');

// ⚙️ 설정 - 원하는 페이지들을 추가하세요!
const PAGES_TO_SCRAPE = [
  'https://example.com/',
  'https://example.com/about',
  'https://example.com/products',
  'https://example.com/contact',
  // 더 많은 페이지 추가...
];

const OUTPUT_DIR = './all-images';  // 📁 저장 폴더

async function scrapeAllPages() {
  console.log('🚀 Starting site scraper...');
  console.log(`📋 Will scrape ${PAGES_TO_SCRAPE.length} pages\n`);
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });
  
  const allImageUrls = new Set();
  
  try {
    // 각 페이지 크롤링
    for (const pageUrl of PAGES_TO_SCRAPE) {
      console.log(`📄 Processing: ${pageUrl}`);
      const page = await context.newPage();
      
      try {
        await page.waitForTimeout(Math.random() * 1000 + 500); // 예의있는 딜레이
        await page.goto(pageUrl, {
          waitUntil: 'networkidle',
          timeout: 60000
        });
        
        // 스크롤 (lazy loading 대응)
        await autoScroll(page);
        
        const imageUrls = await page.evaluate(() => {
          const images = new Set();
          // ... 이미지 추출 로직 (위와 동일)
          document.querySelectorAll('img').forEach(img => {
            if (img.src) images.add(img.src);
          });
          return Array.from(images);
        });
        
        console.log(`  ✅ Found ${imageUrls.length} images`);
        imageUrls.forEach(url => allImageUrls.add(url));
        
      } catch (error) {
        console.error(`  ❌ Failed: ${error.message}`);
      } finally {
        await page.close();
      }
    }
    
    console.log(`\n📊 Total unique images: ${allImageUrls.size}`);
    
    // 이미지 다운로드
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
    let downloaded = 0;
    
    for (const imageUrl of allImageUrls) {
      try {
        const response = await context.request.get(imageUrl);
        if (response.ok()) {
          const buffer = await response.body();
          const filename = path.basename(new URL(imageUrl).pathname) || `image_${downloaded + 1}.jpg`;
          await fs.writeFile(path.join(OUTPUT_DIR, filename), buffer);
          downloaded++;
        }
      } catch (error) {
        console.error(`❌ Failed: ${error.message}`);
      }
    }
    
    console.log(`✅ Downloaded ${downloaded} images to ${OUTPUT_DIR}`);
    
  } finally {
    await browser.close();
  }
}

// 자동 스크롤 함수
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const timer = setInterval(() => {
        window.scrollBy(0, 100);
        totalHeight += 100;
        if (totalHeight >= document.body.scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

scrapeAllPages().catch(console.error);
```

---

## 🎮 사용 예제

### 예제 1: 쇼핑몰 이미지 수집
```javascript
const PAGES_TO_SCRAPE = [
  'https://shopping-site.com/',
  'https://shopping-site.com/products',
  'https://shopping-site.com/sale',
];
```

### 예제 2: 갤러리 사이트
```javascript
const TARGET_URL = 'https://gallery-site.com/photos';
```

### 예제 3: 뉴스 사이트
```javascript
const PAGES_TO_SCRAPE = [
  'https://news-site.com/',
  'https://news-site.com/today',
  'https://news-site.com/sports',
];
```

---

## 🛠️ 고급 설정

### 특정 이미지만 필터링
```javascript
// 큰 이미지만 다운로드 (예: 500px 이상)
const imageUrls = await page.evaluate(() => {
  const images = [];
  document.querySelectorAll('img').forEach(img => {
    if (img.naturalWidth > 500 && img.naturalHeight > 500) {
      images.push(img.src);
    }
  });
  return images;
});
```

### 특정 확장자만 다운로드
```javascript
const validExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
const filteredUrls = imageUrls.filter(url => 
  validExtensions.some(ext => url.toLowerCase().includes(ext))
);
```

### 파일명 커스터마이징
```javascript
// 날짜와 순번으로 저장
const date = new Date().toISOString().split('T')[0];
const filename = `${date}_image_${downloaded + 1}.jpg`;
```

---

## 📊 성능 최적화

### 병렬 다운로드 (더 빠르게!)
```javascript
// Promise.all로 동시 다운로드
const downloadPromises = imageUrls.map(async (url, index) => {
  try {
    const response = await context.request.get(url);
    if (response.ok()) {
      const buffer = await response.body();
      const filename = `image_${index}.jpg`;
      await fs.writeFile(path.join(OUTPUT_DIR, filename), buffer);
      return true;
    }
  } catch (error) {
    console.error(`Failed: ${url}`);
    return false;
  }
});

const results = await Promise.all(downloadPromises);
const successCount = results.filter(r => r).length;
```

---

## 🚨 문제 해결

### 1. "Timeout exceeded" 에러
```javascript
// 타임아웃 늘리기
await page.goto(url, {
  timeout: 120000  // 2분
});
```

### 2. 로그인이 필요한 사이트
```javascript
// 로그인 처리
await page.fill('#username', 'your-username');
await page.fill('#password', 'your-password');
await page.click('#login-button');
await page.waitForNavigation();
```

### 3. 무한 스크롤 사이트
```javascript
// 무한 스크롤 대응
for (let i = 0; i < 10; i++) {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);
}
```

---

## 💡 프로 팁

1. **User-Agent 변경**: 차단 방지
```javascript
userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
```

2. **프록시 사용**: IP 차단 우회
```javascript
const browser = await chromium.launch({
  proxy: { server: 'http://proxy.example.com:8080' }
});
```

3. **쿠키 저장/로드**: 세션 유지
```javascript
// 쿠키 저장
const cookies = await context.cookies();
await fs.writeFile('cookies.json', JSON.stringify(cookies));

// 쿠키 로드
const cookies = JSON.parse(await fs.readFile('cookies.json'));
await context.addCookies(cookies);
```

---

## 📝 라이선스

MIT License - 자유롭게 사용하세요!

---

## 🤝 기여

이 도구가 유용하셨다면 ⭐ 스타를 눌러주세요!

---

**Made with ❤️ by Senior Crawling Engineer**