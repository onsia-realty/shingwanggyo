import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '신광교 클라우드 시티',
  description: '현대엔지니어링이 완성하는 하이엔드 워크 에디션 신광교 클라우드 시티',
  keywords: '신광교클라우드시티, 현대엔지니어링, 지식산업센터, 용인지식산업센터, 비즈니스',
  openGraph: {
    title: '신광교 클라우드 시티',
    description: '현대엔지니어링이 완성하는 하이엔드 워크 에디션 신광교 클라우드 시티',
    images: ['/images/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}