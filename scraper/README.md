# 🖼️ Professional Image Scraper with Playwright

A high-performance, production-ready image scraper built with Playwright and TypeScript. This tool efficiently crawls websites and downloads all images while respecting robots.txt and maintaining politeness.

## ✨ Features

- 🚀 **High Performance**: Concurrent downloads with configurable parallelism
- 🎯 **Smart Image Detection**: Extracts images from multiple sources:
  - `<img>` tags (src, srcset)
  - `<picture>` and `<source>` elements
  - CSS background-image (inline and computed styles)
  - Link preload/prefetch for images
- 🔍 **Deep Crawling**: Configurable depth-based link following
- 🤖 **Robots.txt Compliance**: Respects website crawling rules
- 🌐 **Same-Origin Policy**: Optional restriction to same domain
- 📊 **Detailed Statistics**: Progress tracking and performance metrics
- 🎨 **Beautiful CLI**: Colored output with progress indicators
- 🛡️ **Error Handling**: Robust error recovery and timeout management
- ⚡ **Intelligent Caching**: Avoids duplicate downloads

## 📋 Prerequisites

- Node.js 18+ 
- npm or pnpm or yarn

## 🚀 Installation

```bash
# Clone or navigate to the scraper directory
cd scraper

# Install dependencies
pnpm install
# or
npm install
```

## 📖 Usage

### Basic Usage

```bash
# Scrape images from a website
npm run scrape -- --url "https://example.com"

# With custom output directory
npm run scrape -- --url "https://example.com" --out ./downloaded-images

# Scrape with depth limit
npm run scrape -- --url "https://example.com" --depth 3
```

### Advanced Options

```bash
npm run scrape -- \
  --url "https://example.com" \
  --depth 2 \
  --concurrency 10 \
  --out ./public/images \
  --same-origin \
  --delay 500-1000 \
  --verbose
```

### Pre-configured Scripts

```bash
# Scrape 신광교 클라우드 시티 website
npm run scrape:cloud

# Scrape example.com (for testing)
npm run scrape:example
```

## ⚙️ Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--url` | string | *required* | Starting URL to scrape |
| `--depth` | number | `2` | Maximum crawl depth |
| `--concurrency` | number | `6` | Number of concurrent downloads |
| `--out` | string | `./public` | Output directory for images |
| `--same-origin` | boolean | `true` | Only crawl same origin URLs |
| `--no-same-origin` | flag | - | Allow cross-origin crawling |
| `--ignore-robots` | flag | `false` | Ignore robots.txt rules |
| `--user-agent` | string | Chrome UA | Custom user agent string |
| `--timeout` | number | `30000` | Page load timeout (ms) |
| `--delay` | string | `250-600` | Random delay range between requests (ms) |
| `--verbose` | flag | `false` | Enable verbose logging |

## 📁 Directory Structure

Downloaded images are saved maintaining the original URL structure:

```
public/
├── images/
│   ├── main/
│   │   ├── hero.jpg
│   │   └── banner.png
│   ├── products/
│   │   ├── product1.jpg
│   │   └── product2.webp
│   └── backgrounds/
│       └── pattern.svg
```

## 🔧 Development

### Build the project

```bash
npm run build
```

### Run in development mode

```bash
npm run dev -- --url "https://example.com"
```

### Clean output directories

```bash
npm run clean
```

## 📊 Output Example

```
🚀 Initializing scraper...
✅ Scraper initialized successfully
🎯 Starting scrape from: https://example.com
📊 Configuration: depth=2, concurrency=6, same-origin=true
✅ Robots.txt loaded successfully
📄 Visiting [0/2]: https://example.com
🖼️ Found 45 images on https://example.com
📄 Visiting [1/2]: https://example.com/about
🖼️ Found 12 images on https://example.com/about
Downloading images... [57/57]
✅ Downloaded 57 images

📊 Scraping Statistics:
──────────────────────────────────────────────────
⏱️  Duration: 23.5s
📄 Pages visited: 8
🖼️  Images found: 57
✅ Images downloaded: 54
❌ Images failed: 3
💾 Total size: 12.4 MB
📁 Output directory: /path/to/public
──────────────────────────────────────────────────
```

## 🎯 Use Cases

- **Website Migration**: Download all images when migrating websites
- **Backup**: Create image backups of websites
- **Development**: Get assets for local development
- **Testing**: Download test images for development environments
- **Analysis**: Analyze image usage patterns on websites

## ⚠️ Important Notes

1. **Respect Copyright**: Only scrape images you have permission to use
2. **Rate Limiting**: The tool includes polite delays to avoid overwhelming servers
3. **Robots.txt**: Respects robots.txt by default (use `--ignore-robots` to override)
4. **Large Sites**: Be cautious with depth settings on large websites
5. **Storage**: Ensure sufficient disk space for image downloads

## 🐛 Troubleshooting

### Common Issues

1. **Permission Denied**
   ```bash
   # Run with appropriate permissions
   sudo npm run scrape -- --url "https://example.com"
   ```

2. **Timeout Errors**
   ```bash
   # Increase timeout
   npm run scrape -- --url "https://example.com" --timeout 60000
   ```

3. **Too Many Requests**
   ```bash
   # Reduce concurrency and increase delay
   npm run scrape -- --url "https://example.com" --concurrency 2 --delay 1000-2000
   ```

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🔍 Technical Details

### Image Detection Algorithm

The scraper uses multiple strategies to detect images:

1. **DOM Parsing**: Directly extracts from img, picture, source elements
2. **Style Analysis**: Parses both inline and computed CSS styles
3. **Responsive Images**: Handles srcset and multiple image sources
4. **Lazy Loading**: Captures dynamically loaded images
5. **Background Images**: Extracts from CSS background properties

### Performance Optimizations

- **Connection Pooling**: Reuses browser context for efficiency
- **Parallel Processing**: Concurrent page visits and downloads
- **Smart Caching**: Avoids re-downloading existing images
- **Memory Management**: Streams large images instead of loading into memory

### Security Features

- **URL Validation**: Sanitizes and validates all URLs
- **Path Traversal Prevention**: Ensures safe file paths
- **Content Type Validation**: Verifies image MIME types
- **Size Limits**: Configurable max file size limits

## 📞 Support

For issues or questions, please open an issue on the project repository.