'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, MessageCircle } from 'lucide-react';

export function Footer() {
  const handleSmsClick = () => {
    // SMS 문의 기능 - API 연동
    window.open('/inquiry', '_blank');
  };

  const handleKakaoClick = () => {
    // 카카오톡 상담 - 플러스친구 링크
    window.open('http://pf.kakao.com/_xjxaKxj', '_blank');
  };

  return (
    <>
      {/* CTA 섹션 */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            신광교 클라우드 시티
          </h2>
          <p className="text-xl text-white/90 mb-8">
            지금 바로 상담받으세요!
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="tel:1668-5257"
              className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              1668-5257
            </a>
            <button
              onClick={handleKakaoClick}
              className="inline-flex items-center justify-center bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-colors"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              카카오톡 상담
            </button>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* 시행사 정보 */}
            <div>
              <h3 className="text-white font-bold mb-4">시행</h3>
              <p className="text-sm">주식회사 하나자산신탁</p>
              <p className="text-sm">사업자번호: 214-86-34082</p>
              <p className="text-sm">대표자: 민관식</p>
              <p className="text-sm">서울특별시 강남구 테헤란로127, 15층</p>
            </div>

            {/* 시공사 정보 */}
            <div>
              <h3 className="text-white font-bold mb-4">시공</h3>
              <Image 
                src="/all-images/main/footer_logo_03.png" 
                alt="현대엔지니어링" 
                width={150} 
                height={40}
                className="mb-2"
              />
              <p className="text-sm">현대엔지니어링</p>
            </div>

            {/* 업무대행 정보 */}
            <div>
              <h3 className="text-white font-bold mb-4">업무대행</h3>
              <p className="text-sm">㈜제이아이티피엠씨</p>
              <p className="text-sm">대표자: 전우석</p>
              <p className="text-sm">사업자등록번호: 215-81-38446</p>
              <p className="text-sm">서울특별시 강남구 테헤란로64길 13, 제오302호</p>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm mb-4 md:mb-0">
                © 2024 신광교 클라우드 시티. All rights reserved.
              </p>
              <div className="flex gap-4">
                <Link href="/privacy" className="text-sm hover:text-white transition-colors">
                  개인정보처리방침
                </Link>
                <Link href="/terms" className="text-sm hover:text-white transition-colors">
                  이용약관
                </Link>
              </div>
            </div>
          </div>

          {/* 온라인대행 */}
          <div className="mt-8 pt-8 border-t border-gray-800">
            <p className="text-xs text-gray-500">
              <span className="font-bold">온라인대행:</span> ㈜넥스미디어 | 
              <span className="ml-2">대표자: 이봉우</span> | 
              <span className="ml-2">사업자등록번호: 462-81-00186</span> | 
              <span className="ml-2">경기도 성남시 분당구 미금일로90번길 32 웰파크 3층</span>
            </p>
          </div>

          {/* 고지사항 */}
          <div className="mt-8 p-4 bg-gray-800 rounded-lg">
            <p className="text-xs text-gray-400 leading-relaxed">
              ※ 본 홈페이지의 CG 이미지는 소비자의 이해를 돕기 위해 제작된 것으로 실제와 다를 수 있으며, 인·허가 과정 시 변경될 수 있습니다.
              <br />
              ※ 상기 사항은 입주자모집공고 시 확정 안내 예정이오니 자세한 사항은 견본주택으로 문의 바랍니다.
            </p>
          </div>
        </div>
      </footer>

      {/* 플로팅 버튼 - 데스크톱 */}
      <div className="hidden md:block fixed bottom-8 right-8 z-40">
        <div className="flex flex-col gap-3">
          <button
            onClick={handleKakaoClick}
            className="bg-yellow-400 text-gray-900 p-4 rounded-full shadow-lg hover:bg-yellow-300 transition-colors"
            title="카카오톡 상담"
          >
            <MessageCircle size={24} />
          </button>
          <a
            href="tel:1668-5257"
            className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            title="전화 상담"
          >
            <Phone size={24} />
          </a>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-gray-800 text-white p-4 rounded-full shadow-lg hover:bg-gray-700 transition-colors"
            title="맨 위로"
          >
            ↑
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
          }
        }
        
        .animate-pulse-ring {
          animation: pulse 2s infinite;
        }
      `}</style>
    </>
  );
}