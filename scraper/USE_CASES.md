# 📚 이미지 스크래퍼 실전 사용 사례집

> 다양한 웹사이트에서 이미지를 수집하는 실전 예제 모음

## 🛒 1. 이커머스/쇼핑몰

### 쿠팡 상품 이미지 수집
```javascript
const PAGES_TO_SCRAPE = [
  'https://www.coupang.com/vp/products/1234567890',  // 상품 상세
  'https://www.coupang.com/np/categories/194276',    // 카테고리
];

// 상품 이미지만 필터링
const imageUrls = await page.evaluate(() => {
  const images = [];
  // 메인 상품 이미지
  document.querySelectorAll('.prod-image__item img').forEach(img => {
    images.push(img.src);
  });
  // 상세 설명 이미지
  document.querySelectorAll('.product-detail img').forEach(img => {
    images.push(img.src);
  });
  return images;
});
```

### 네이버 쇼핑 검색 결과
```javascript
const searchKeyword = '노트북';
const TARGET_URL = `https://search.shopping.naver.com/search/all?query=${encodeURIComponent(searchKeyword)}`;

// 스크롤로 더 많은 상품 로드
for (let i = 0; i < 5; i++) {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);
}
```

---

## 🏘️ 2. 부동산 사이트

### 직방/다방 매물 이미지
```javascript
const PAGES_TO_SCRAPE = [
  'https://www.zigbang.com/home/oneroom/items/12345',
  'https://www.dabangapp.com/room/12345'
];

// 매물 사진만 추출
const propertyImages = await page.evaluate(() => {
  const images = [];
  // 갤러리 이미지
  document.querySelectorAll('[class*="gallery"] img').forEach(img => {
    if (img.src && !img.src.includes('icon')) {
      images.push(img.src.replace('thumbnail', 'original')); // 원본 크기로
    }
  });
  return images;
});
```

### 네이버 부동산
```javascript
// 단지 정보 이미지
const complexId = '12345';
const PAGES = [
  `https://land.naver.com/complex/info/${complexId}`,
  `https://land.naver.com/complex/photo/${complexId}`
];
```

---

## 📰 3. 뉴스/미디어 사이트

### 네이버 뉴스 기사 이미지
```javascript
const newsUrl = 'https://n.news.naver.com/article/001/0012345678';

// 기사 본문 이미지만
const articleImages = await page.evaluate(() => {
  const images = [];
  document.querySelectorAll('#articleBodyContents img').forEach(img => {
    if (img.src && !img.src.includes('ad')) {  // 광고 제외
      images.push(img.src);
    }
  });
  return images;
});
```

### 유튜브 썸네일
```javascript
const channelUrl = 'https://www.youtube.com/@channelname/videos';

// 썸네일 고화질 버전 추출
const thumbnails = await page.evaluate(() => {
  const images = [];
  document.querySelectorAll('ytd-thumbnail img').forEach(img => {
    if (img.src) {
      // 고화질 버전으로 변환
      const highQuality = img.src.replace('hqdefault', 'maxresdefault');
      images.push(highQuality);
    }
  });
  return images;
});
```

---

## 🎨 4. 갤러리/포트폴리오

### Pinterest 보드 이미지
```javascript
const boardUrl = 'https://www.pinterest.com/username/board-name/';

// 무한 스크롤 대응
async function scrollToBottom(page, maxScrolls = 10) {
  let previousHeight = 0;
  for (let i = 0; i < maxScrolls; i++) {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(3000);
    
    const currentHeight = await page.evaluate(() => document.body.scrollHeight);
    if (currentHeight === previousHeight) break;
    previousHeight = currentHeight;
  }
}

await scrollToBottom(page);
```

### Behance 프로젝트
```javascript
const projectUrl = 'https://www.behance.net/gallery/12345/Project-Name';

// 고해상도 이미지 추출
const hdImages = await page.evaluate(() => {
  const images = [];
  document.querySelectorAll('[data-hd-src]').forEach(el => {
    images.push(el.getAttribute('data-hd-src'));
  });
  return images;
});
```

---

## 🏢 5. 기업/브랜드 사이트

### 제품 카탈로그
```javascript
// 삼성 제품 이미지
const SAMSUNG_PAGES = [
  'https://www.samsung.com/kr/smartphones/',
  'https://www.samsung.com/kr/tvs/',
  'https://www.samsung.com/kr/refrigerators/'
];

// 제품 이미지만 필터링
const productImages = await page.evaluate(() => {
  const images = [];
  document.querySelectorAll('.product-card img, .product-image img').forEach(img => {
    if (img.src && img.src.includes('product')) {
      images.push(img.src);
    }
  });
  return images;
});
```

---

## 📱 6. SNS 플랫폼

### 인스타그램 (로그인 필요)
```javascript
// 먼저 로그인
await page.goto('https://www.instagram.com/accounts/login/');
await page.fill('input[name="username"]', 'your_username');
await page.fill('input[name="password"]', 'your_password');
await page.click('button[type="submit"]');
await page.waitForNavigation();

// 프로필 페이지 이미지
await page.goto('https://www.instagram.com/target_username/');

// 포스트 이미지 추출
const postImages = await page.evaluate(() => {
  const images = [];
  document.querySelectorAll('article img').forEach(img => {
    if (img.src && !img.src.includes('profile')) {
      images.push(img.src);
    }
  });
  return images;
});
```

---

## 🎯 7. 특수 케이스

### Lazy Loading 이미지
```javascript
// Intersection Observer를 사용하는 사이트
await page.evaluate(() => {
  const images = document.querySelectorAll('img[data-src]');
  images.forEach(img => {
    img.src = img.dataset.src;  // data-src를 src로 복사
  });
});
await page.waitForTimeout(3000);  // 로딩 대기
```

### WebP 이미지를 JPG로 변환
```javascript
// WebP URL을 JPG로 변환 요청
const convertedUrls = imageUrls.map(url => {
  if (url.includes('.webp')) {
    return url.replace('.webp', '.jpg');
  }
  return url;
});
```

### 워터마크 제거 (원본 찾기)
```javascript
// 워터마크가 없는 원본 URL 패턴 찾기
const originalUrls = imageUrls.map(url => {
  // 예: thumbnail_watermark.jpg -> original.jpg
  return url.replace('thumbnail_watermark', 'original')
           .replace('_watermark', '')
           .replace('/thumb/', '/original/');
});
```

---

## 💡 고급 팁

### 1. 브라우저 캐시 활용
```javascript
const context = await browser.newContext({
  userDataDir: './browser-cache'  // 캐시 저장
});
```

### 2. 동시 다운로드 제한
```javascript
// 동시에 5개씩만 다운로드
const chunkSize = 5;
for (let i = 0; i < imageUrls.length; i += chunkSize) {
  const chunk = imageUrls.slice(i, i + chunkSize);
  await Promise.all(chunk.map(url => downloadImage(url)));
}
```

### 3. 실패한 다운로드 재시도
```javascript
async function downloadWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return await response.buffer();
    } catch (error) {
      console.log(`Retry ${i + 1}/${maxRetries} for ${url}`);
    }
  }
  throw new Error(`Failed after ${maxRetries} retries`);
}
```

### 4. 메타데이터 저장
```javascript
// 이미지 정보를 JSON으로 저장
const metadata = imageUrls.map((url, index) => ({
  index,
  url,
  filename: `image_${index}.jpg`,
  source: page.url(),
  timestamp: new Date().toISOString()
}));

await fs.writeFile('metadata.json', JSON.stringify(metadata, null, 2));
```

---

## 📊 통계 및 리포팅

```javascript
// 다운로드 통계 생성
const stats = {
  total: imageUrls.length,
  downloaded: successCount,
  failed: failedCount,
  totalSize: totalBytes,
  averageSize: totalBytes / successCount,
  duration: (Date.now() - startTime) / 1000,
  pagesScraped: PAGES_TO_SCRAPE.length
};

console.table(stats);

// CSV 리포트 생성
const csv = [
  'URL,Filename,Size,Status',
  ...results.map(r => `${r.url},${r.filename},${r.size},${r.status}`)
].join('\n');

await fs.writeFile('report.csv', csv);
```

---

## 🚫 주의사항

1. **저작권**: 이미지 사용 권한 확인 필수
2. **Rate Limiting**: 너무 빠른 요청은 IP 차단 위험
3. **Robots.txt**: 사이트의 크롤링 정책 준수
4. **개인정보**: 개인 사진이나 민감한 정보 주의
5. **상업적 사용**: 라이선스 확인 필수

---

## 📞 문의

더 많은 예제가 필요하시면 이슈를 등록해주세요!

**Happy Scraping! 🚀**