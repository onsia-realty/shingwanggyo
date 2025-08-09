'use client';

import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function Environment() {
  return (
    <div className="gradient-bg min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-24 max-w-6xl">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            입지환경
          </h1>
          <p className="text-xl text-gray-600">
            초고도 성장세 빅테크 인더스트리의 절정을 누리게 될<br/>
            삼성삼거리 바로 앞
          </p>
        </section>

        {/* 위치 정보 섹션 */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">위치 안내</h2>
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Image
                src="/all-images/main/map.png"
                alt="위치 지도"
                width={1200}
                height={800}
                className="rounded-lg"
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-blue-600">📍 주소</h3>
              <p className="text-gray-600">
                경기도 용인시 수지구 신봉동 일원<br/>
                (정확한 주소는 분양 시 공개)
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-blue-600">🚇 지하철</h3>
              <p className="text-gray-600">
                신분당선 신광교역 도보 10분<br/>
                GTX-A 용인역(예정) 인접
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-blue-600">🚗 자동차</h3>
              <p className="text-gray-600">
                경부고속도로 5분<br/>
                용인서울고속도로 3분
              </p>
            </div>
          </div>
        </section>

        {/* 교통 정보 섹션 */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">교통 환경</h2>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">빠르게 연결하는 교통의 허브</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>신분당선 신광교역 도보 10분</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>GTX-A 용인역(예정) 인접</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>경부고속도로 수원IC 5분</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>용인서울고속도로 광교IC 3분</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>강남까지 30분대 접근</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">주요 지역 소요시간</h3>
                <div className="space-y-2">
                  <div className="flex justify-between p-3 bg-white rounded">
                    <span>강남역</span>
                    <span className="font-bold text-blue-600">약 30분</span>
                  </div>
                  <div className="flex justify-between p-3 bg-white rounded">
                    <span>판교역</span>
                    <span className="font-bold text-blue-600">약 20분</span>
                  </div>
                  <div className="flex justify-between p-3 bg-white rounded">
                    <span>수원역</span>
                    <span className="font-bold text-blue-600">약 15분</span>
                  </div>
                  <div className="flex justify-between p-3 bg-white rounded">
                    <span>용인시청</span>
                    <span className="font-bold text-blue-600">약 10분</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 프리미엄 환경 섹션 */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">프리미엄 생활환경</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🏬</div>
              <h3 className="text-xl font-bold mb-2">편리한 쇼핑</h3>
              <p className="text-gray-600">
                갤러리아 광교, 앨리웨이 광교<br/>
                롯데아울렛 광교점 등 대형 쇼핑시설 인접
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🌳</div>
              <h3 className="text-xl font-bold mb-2">쾌적한 자연</h3>
              <p className="text-gray-600">
                광교호수공원, 광교산 등<br/>
                풍부한 녹지공간과 산책로
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="text-xl font-bold mb-2">의료시설</h3>
              <p className="text-gray-600">
                아주대학교병원, 분당서울대병원<br/>
                대형 종합병원 이용 가능
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold mb-2">교육환경</h3>
              <p className="text-gray-600">
                경기대, 아주대, 단국대 등<br/>
                우수한 대학 인프라
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-xl font-bold mb-2">비즈니스</h3>
              <p className="text-gray-600">
                광교테크노밸리, 판교테크노밸리<br/>
                IT 기업 밀집 지역
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🏛️</div>
              <h3 className="text-xl font-bold mb-2">행정업무</h3>
              <p className="text-gray-600">
                용인시청, 수원시청<br/>
                주요 관공서 인접
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}