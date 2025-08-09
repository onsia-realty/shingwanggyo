'use client';

import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function Premium() {
  const communityItems = [
    { title: 'FITNESS CLUB', description: '최신 운동기구를 갖춘 피트니스 클럽', icon: '💪' },
    { title: 'SEMINAR ROOM', description: '대규모 세미나 및 교육 공간', icon: '🎓' },
    { title: 'MEETING ROOM', description: '다양한 규모의 회의실', icon: '💼' },
    { title: 'HEALING SPOT', description: '휴식과 명상을 위한 힐링 공간', icon: '🧘' },
    { title: 'CREATIVE STUDIO', description: '창의적 작업을 위한 스튜디오', icon: '🎨' },
    { title: 'GAME ROOM', description: '업무 후 휴식을 위한 게임룸', icon: '🎮' },
    { title: 'RECEPTION LOUNGE', description: '고급스러운 리셉션 라운지', icon: '🛋️' },
  ];

  const conciergeServices = [
    { title: 'OFFICE ASSISTANT', description: '업무 지원 서비스', icon: '👔' },
    { title: 'HEALTH CARE', description: '건강 관리 서비스', icon: '🏥' },
    { title: 'G.X CLASS', description: '그룹 운동 프로그램', icon: '🤸' },
    { title: 'LUNCH DELIVERY', description: '점심 배달 서비스', icon: '🍱' },
    { title: 'MEETING ROOM RESERVATION', description: '회의실 예약 서비스', icon: '📅' },
    { title: 'TAX CONSULTING', description: '세무 상담 서비스', icon: '📊' },
    { title: 'VOUCHER', description: '각종 할인 바우처', icon: '🎟️' },
    { title: 'DELIVERY RESERVATION', description: '택배 예약 서비스', icon: '📦' },
    { title: 'COMPANY CAR MGMT', description: '법인차량 관리', icon: '🚗' },
    { title: 'CAR SHARING', description: '차량 공유 서비스', icon: '🚙' },
    { title: 'OFFICE CLEANING', description: '사무실 청소 서비스', icon: '🧹' },
  ];

  return (
    <div className="gradient-bg min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-24 max-w-6xl">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            PREMIUM<br/>
            COMMUNITY & CONCIERGE
          </h1>
          <p className="text-xl text-gray-600">
            하이엔드 워크 에디션을 완성하는<br/>
            다채로운 커뮤니티와 컨시어지 서비스
          </p>
        </section>

        {/* 커뮤니티 시설 섹션 */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">COMMUNITY</h2>
            <p className="text-lg text-gray-600">
              업무 효율과 삶의 질을 높이는 프리미엄 커뮤니티 시설
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityItems.map((item, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow hover:scale-105 transform duration-300"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-blue-600">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 특별 시설 이미지 갤러리 */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">시설 갤러리</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/images/facility1.jpg"
                alt="피트니스 클럽"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-white text-2xl font-bold">FITNESS CLUB</h3>
              </div>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/images/facility2.jpg"
                alt="세미나룸"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-white text-2xl font-bold">SEMINAR ROOM</h3>
              </div>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/images/facility3.jpg"
                alt="라운지"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-white text-2xl font-bold">RECEPTION LOUNGE</h3>
              </div>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/images/facility4.jpg"
                alt="힐링 스팟"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-white text-2xl font-bold">HEALING SPOT</h3>
              </div>
            </div>
          </div>
        </section>

        {/* 컨시어지 서비스 섹션 */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">CONCIERGE SERVICE</h2>
            <p className="text-lg text-gray-600">
              비즈니스를 위한 맞춤형 컨시어지 서비스
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {conciergeServices.map((service, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="text-3xl mb-2">{service.icon}</div>
                  <h4 className="text-sm font-bold text-gray-800 mb-1">{service.title}</h4>
                  <p className="text-xs text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 특별 혜택 섹션 */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-8 text-center">입주 기업 특별 혜택</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl mb-4">🎁</div>
                <h3 className="text-xl font-bold mb-2">입주 혜택</h3>
                <p>첫 3개월 임대료 할인<br/>인테리어 지원금 제공</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">🤝</div>
                <h3 className="text-xl font-bold mb-2">네트워킹</h3>
                <p>정기 네트워킹 행사<br/>비즈니스 매칭 서비스</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">📈</div>
                <h3 className="text-xl font-bold mb-2">성장 지원</h3>
                <p>컨설팅 서비스 제공<br/>투자 연계 프로그램</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}