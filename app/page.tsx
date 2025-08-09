'use client';

import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // AOS 애니메이션 초기화
    const initAOS = async () => {
      const AOS = (await import('aos')).default;
      await import('aos/dist/aos.css');
      AOS.init({
        duration: 1000,
        once: true,
      });
    };
    initAOS();
  }, []);

  return (
    <div className="gradient-bg min-h-screen">
      <Header />
      <main>
        {/* 메인 비주얼 섹션 */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/all-images/main/main_visual_bg.jpg"
              alt="신광교 클라우드 시티 메인 비주얼"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />
          </div>
          
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-6" data-aos="fade-up">
              모든 것이 연결된<br/>
              가장 미래적 워크스페이스
            </h1>
            <p className="text-2xl md:text-4xl font-bold mb-8" data-aos="fade-up" data-aos-delay="200">
              신광교 클라우드 시티
            </p>
            <p className="text-5xl md:text-7xl font-black tracking-wider" data-aos="fade-up" data-aos-delay="400">
              <span className="text-blue-400">CLOUD</span> <span className="text-white">CITY</span>
            </p>
          </div>
          
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
            <svg className="w-6 h-10" viewBox="0 0 30 45" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15,1.118c12.352,0,13.967,12.88,13.967,12.88v18.76c0,0-1.514,11.204-13.967,11.204S0.931,32.966,0.931,32.966V14.05C0.931,14.05,2.648,1.118,15,1.118z"/>
            </svg>
          </div>
        </section>

        {/* HIGH-END WORK EDITION 섹션 */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16" data-aos="fade-up">
              <h2 className="text-4xl md:text-6xl font-black mb-4">
                <span className="text-blue-600">HIGH-END</span><br/>
                <span className="text-gray-800">WORK</span><br/>
                <span className="text-gray-800">EDITION</span>
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div data-aos="fade-right">
                <h3 className="text-2xl md:text-3xl font-bold mb-6">
                  현대엔지니어링이 완성하는<br/>
                  <span className="text-blue-600">하이엔드 워크 에디션</span>
                </h3>
                <p className="text-gray-600 leading-relaxed mb-8">
                  CLOUD는 CompLex Of Unlimited Dreams의 줄임말로<br/>
                  [무한한 꿈을 위한 비즈니스 복합공간]이라는 의미를 갖고 있으며<br/>
                  언제 어디서든 자유롭게 접속할 수 있는 클라우드 서버처럼<br/>
                  다양한 Work Activity가 유기적으로 연결되는<br/>
                  비즈니스 허브가 되겠다는 의지를 담고 있습니다.
                </p>
                <Image
                  src="/all-images/main/logo_s.png"
                  alt="신광교 클라우드 시티 로고"
                  width={200}
                  height={60}
                />
              </div>
              
              <div data-aos="fade-left">
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <div key={num} className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
                      <Image
                        src={`/all-images/main/stairs_${num}_.png`}
                        alt={`계단 이미지 ${num}`}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5가지 특징 섹션 */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16" data-aos="fade-up">
              <p className="text-xl md:text-2xl mb-4">
                스케일에서 밸류, 인프라,<br/>
                커뮤니티, 컨시어지까지 완벽하게 연결된<br/>
                하이엔드 워크스페이스의 새로운 경험
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4" data-aos="fade-up" data-aos-delay="200">
              {['SCALE', 'VALUE', 'INFRA', 'COMMUNITY', 'CONCIERGE'].map((feature, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/20 transition-colors cursor-pointer">
                  <h3 className="text-lg font-bold">{feature}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LOCATION SUMMARY 섹션 */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16" data-aos="fade-up">
              <h2 className="text-4xl md:text-6xl font-bold mb-4">
                LOCATION<br/>SUMMARY
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div data-aos="fade-right">
                <p className="text-xl mb-4">
                  초고도 성장세 빅테크 인더스트리의
                </p>
                <h3 className="text-3xl md:text-4xl font-bold mb-8">
                  절정을 누리게 될<br/>삼성삼거리 바로 앞
                </h3>
                <Link href="/pages/environment" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  MORE VIEW
                </Link>
              </div>
              
              <div data-aos="fade-left">
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Image
                    src="/all-images/main/map.png"
                    alt="위치 지도"
                    width={600}
                    height={600}
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 플로어 가이드 섹션 */}
        <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <div data-aos="fade-up">
              <p className="text-xl md:text-2xl mb-4">
                압도적 스케일에서 독보적 스타일까지
              </p>
              <h2 className="text-3xl md:text-5xl font-bold mb-12">
                전에 없던 랜드마크의 탄생
              </h2>
            </div>
            
            <div className="mb-12" data-aos="fade-up" data-aos-delay="200">
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Image
                  src="/all-images/main/model_img.png"
                  alt="건물 외관"
                  width={800}
                  height={600}
                  className="rounded-lg shadow-2xl"
                />
              </div>
            </div>
            
            <Link href="/pages/floor" className="inline-block bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-900 transition-colors">
              MORE VIEW
            </Link>
          </div>
        </section>

        {/* 프리미엄 커뮤니티 섹션 */}
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16" data-aos="fade-up">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                PREMIUM<br/>
                COMMUNITY<br/>
                & CONCIERGE
              </h2>
              <p className="text-xl text-gray-600 mt-6">
                하이엔드 워크 에디션을 완성하는<br/>
                다채로운 커뮤니티와 컨시어지 서비스
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" data-aos="fade-up" data-aos-delay="200">
              {[
                'FITNESS CLUB', 'SEMINAR ROOM', 'MEETING ROOM', 'HEALING SPOT',
                'CREATIVE STUDIO', 'GAME ROOM', 'RECEPTION LOUNGE', 'OFFICE ASSISTANT',
                'HEALTH CARE', 'G.X CLASS', 'LUNCH DELIVERY', 'MEETING ROOM RESERVATION',
                'TAX CONSULTING', 'VOUCHER', 'DELIVERY RESERVATION', 'OFFICE CLEANING'
              ].map((service, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow cursor-pointer">
                  <h4 className="text-sm font-semibold text-center">{service}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      
      {/* 모바일 퀵링크 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden z-40">
        <div className="flex justify-around py-2">
          <a href="tel:1668-5257" className="flex flex-col items-center p-2">
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            <span className="text-xs">전화상담</span>
          </a>
          <a href="/pages/registration" className="flex flex-col items-center p-2">
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            <span className="text-xs">관심등록</span>
          </a>
        </div>
      </div>
    </div>
  );
}