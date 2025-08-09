# 🚀 부동산 사이트 새 프로젝트 설정 가이드

## 📁 1단계: 새 프로젝트 폴더 생성

```bash
# 새 폴더 만들기 (예: gangnam-palace)
mkdir 프로젝트명
cd 프로젝트명
```

## 🛠️ 2단계: Next.js 프로젝트 초기화

```bash
# Next.js 프로젝트 생성 (모든 옵션 Yes 선택)
npx create-next-app@latest . --typescript --tailwind --app

# 프로젝트 생성 시 선택 옵션:
# ✅ TypeScript: Yes
# ✅ ESLint: Yes
# ✅ Tailwind CSS: Yes
# ✅ src/ directory: No
# ✅ App Router: Yes
# ✅ Import alias: Yes (@/*)
```

## 📦 3단계: 필수 패키지 설치

```bash
# pnpm 사용 (npm이나 yarn도 가능)
pnpm add @radix-ui/react-dialog @radix-ui/react-dropdown-menu
pnpm add @radix-ui/react-slot class-variance-authority
pnpm add clsx tailwind-merge lucide-react
pnpm add solapi
```

## 🔐 4단계: 환경 변수 설정

1. 기존 프로젝트의 `.env.local` 파일을 새 프로젝트로 복사
2. 또는 `ENV_TEMPLATE.txt` 내용으로 새로 생성

```bash
# .env.local 파일 생성
touch .env.local
```

## 📂 5단계: 폴더 구조 준비

```
프로젝트명/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   └── ui/         (shadcn 컴포넌트용)
├── public/         (이미지 파일 저장)
├── lib/           (유틸리티 함수)
└── .env.local     (환경 변수)
```

## 🎨 6단계: 필수 파일 설정

### tailwind.config.ts 수정
```typescript
// content 배열에 추가
content: [
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
]
```

### lib/utils.ts 생성
```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## 🚀 7단계: Claude에게 요청

1. `PROJECT_TEMPLATE.txt` 파일 열기
2. [ ] 부분을 실제 정보로 채우기:
   - 타겟 사이트 URL
   - 회사명
   - 전화번호
   - 주소
3. 전체 내용 복사해서 Claude에게 전달

## 📸 8단계: 이미지 준비

- 타겟 사이트의 이미지 다운로드
- `/public` 폴더에 저장
- 파일명은 영문으로 변경 권장

## ✅ 9단계: 테스트 실행

```bash
# 개발 서버 실행
pnpm dev

# http://localhost:3000 접속해서 확인
```

## 🚢 10단계: 배포 (Vercel)

```bash
# Git 저장소 초기화
git init
git add .
git commit -m "Initial commit"

# GitHub에 푸시 후 Vercel에서 Import
```

## 📝 주의사항

- **기존 프로젝트는 절대 수정하지 않음**
- **새 폴더에서 작업 필수**
- **.env.local 파일은 Git에 올리지 않음**
- **이미지는 최적화해서 사용 (WebP 권장)**

## 🔧 문제 해결

### 패키지 설치 오류 시
```bash
# 캐시 삭제 후 재설치
pnpm store prune
pnpm install
```

### TypeScript 오류 시
```bash
# TypeScript 재설치
pnpm add -D typescript @types/react @types/node
```

### 스타일 적용 안 될 때
```bash
# Tailwind CSS 재빌드
pnpm dev
```