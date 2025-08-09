'use client';

import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function Brand() {
  return (
    <div className="gradient-bg min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-24 max-w-6xl">
        {/* 헤더 섹션 */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            브랜드
          </h1>
          <p className="text-xl text-gray-600">
            현대엔지니어링이 완성하는<br/>
            하이엔드 워크 에디션
          </p>
        </section>

        {/* 브랜드 스토리 섹션 */}
        <section className="mb-20">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  <span className="text-blue-600">CLOUD CITY</span><br/>
                  브랜드 스토리
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  CLOUD는 CompLex Of Unlimited Dreams의 줄임말로<br/>
                  <strong>[무한한 꿈을 위한 비즈니스 복합공간]</strong>이라는 의미를 갖고 있으며<br/>
                  언제 어디서든 자유롭게 접속할 수 있는 클라우드 서버처럼<br/>
                  다양한 Work Activity가 유기적으로 연결되는<br/>
                  비즈니스 허브가 되겠다는 의지를 담고 있습니다.
                </p>
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="font-bold text-blue-900 mb-3">브랜드 컨셉</h3>
                  <ul className="space-y-2 text-blue-800">
                    <li>✓ 무한한 가능성의 비즈니스 공간</li>
                    <li>✓ 유기적으로 연결된 워크 생태계</li>
                    <li>✓ 미래지향적 스마트 오피스</li>
                    <li>✓ 하이엔드 워크 에디션</li>
                  </ul>
                </div>
              </div>
              
              <div className="text-center">
                <Image
                  src="/all-images/main/logo_s.png"
                  alt="신광교 클라우드 시티 로고"
                  width={400}
                  height={120}
                  className="mx-auto mb-8"
                />
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-lg">
                  <h3 className="text-2xl font-bold mb-4">CLOUD CITY</h3>
                  <p className="text-lg opacity-90">
                    Complex Of Unlimited Dreams
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 시공사 정보 섹션 */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">시공사 소개</h2>
            <p className="text-xl text-gray-600">
              대한민국 최고의 건설사 현대엔지니어링
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Image
                  src="/all-images/main/footer_logo_03.png"
                  alt="현대엔지니어링 로고"
                  width={300}
                  height={80}
                  className="mb-6"
                />
                <h3 className="text-2xl font-bold mb-4">현대엔지니어링</h3>
                <p className="text-gray-600 leading-relaxed">
                  1975년 설립 이래 50년간 축적된 건설 노하우와<br/>
                  끊임없는 기술 혁신으로 대한민국 건설업계를<br/>
                  선도해온 종합건설회사입니다.<br/><br/>
                  
                  주거용 건물부터 상업시설, 오피스텔까지<br/>
                  다양한 건축물 시공 경험을 바탕으로<br/>
                  최고 품질의 건축물을 완성합니다.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">🏗️ 주요 실적</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 힐스테이트 시리즈 (주거)</li>
                    <li>• 디큐브시티 (상업복합)</li>
                    <li>• 현대백화점 (상업시설)</li>
                    <li>• 다양한 오피스텔 프로젝트</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">🔧 기술력</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 첨단 건설 기술 보유</li>
                    <li>• 친환경 건축 기법 적용</li>
                    <li>• 스마트 빌딩 시스템 구축</li>
                    <li>• 품질관리 시스템 완비</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">🏆 수상내역</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 건설업 신용평가 AAA 등급</li>
                    <li>• 다수의 건축상 수상</li>
                    <li>• ISO 품질경영시스템 인증</li>
                    <li>• 녹색건축 인증 다수 보유</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 브랜드 가치 섹션 */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">브랜드 가치</h2>
            <p className="text-xl text-gray-600">
              신광교 클라우드 시티만의 특별한 가치
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-xl font-bold mb-3">PREMIUM</h3>
              <p className="text-gray-600">
                최고급 마감재와 설비를<br/>
                적용한 프리미엄 오피스
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-bold mb-3">CONNECTED</h3>
              <p className="text-gray-600">
                모든 것이 연결된<br/>
                스마트 비즈니스 환경
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-3">INNOVATIVE</h3>
              <p className="text-gray-600">
                혁신적인 기술과 시설로<br/>
                완성된 미래형 오피스
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}