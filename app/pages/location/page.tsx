'use client';

import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MapPin, Phone, Clock, Car, Train, Bus } from 'lucide-react';

export default function Location() {
  return (
    <div className="gradient-bg min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-24 max-w-6xl">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            오시는 길
          </h1>
          <p className="text-xl text-gray-600">
            신광교 클라우드 시티 홍보관 방문 안내
          </p>
        </section>

        {/* 지도 섹션 */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="relative aspect-video">
              <Image
                src="/images/background/map.png"
                alt="홍보관 위치 지도"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* 홍보관 정보 */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-8 text-center">홍보관 정보</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-start mb-6">
                  <MapPin className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">주소</h3>
                    <p className="text-gray-600">
                      경기도 용인시 수지구 신봉동 123-45<br/>
                      신광교 클라우드 시티 홍보관
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start mb-6">
                  <Phone className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">대표전화</h3>
                    <p className="text-gray-600">
                      1668-0668 / 1668-3773<br/>
                      <span className="text-sm">(평일 09:00 ~ 18:00)</span>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">운영시간</h3>
                    <p className="text-gray-600">
                      평일: 10:00 ~ 18:00<br/>
                      주말: 10:00 ~ 17:00<br/>
                      <span className="text-sm text-red-600">※ 점심시간 12:00 ~ 13:00</span>
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-4">관람 안내</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    사전 예약 후 방문 권장
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    무료 주차 가능 (2시간)
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    VR 체험관 운영 중
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    전문 상담사 상주
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    코로나19 방역 수칙 준수
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 교통 안내 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">교통 안내</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Train className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold">지하철</h3>
              </div>
              <div className="space-y-3 text-gray-600">
                <div>
                  <p className="font-semibold">신분당선</p>
                  <p className="text-sm">신광교역 2번 출구 도보 10분</p>
                </div>
                <div>
                  <p className="font-semibold">수인분당선</p>
                  <p className="text-sm">상현역 1번 출구 버스 환승</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Bus className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold">버스</h3>
              </div>
              <div className="space-y-3 text-gray-600">
                <div>
                  <p className="font-semibold">간선버스</p>
                  <p className="text-sm">700-2, 720-1, 730</p>
                </div>
                <div>
                  <p className="font-semibold">마을버스</p>
                  <p className="text-sm">7, 7-1, 15-1</p>
                </div>
                <div>
                  <p className="font-semibold">정류장</p>
                  <p className="text-sm">신광교 클라우드시티 앞</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Car className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold">자가용</h3>
              </div>
              <div className="space-y-3 text-gray-600">
                <div>
                  <p className="font-semibold">경부고속도로</p>
                  <p className="text-sm">수원IC → 광교 방면 10분</p>
                </div>
                <div>
                  <p className="font-semibold">용인서울고속도로</p>
                  <p className="text-sm">광교IC → 신봉동 방면 5분</p>
                </div>
                <div>
                  <p className="font-semibold">네비게이션</p>
                  <p className="text-sm">"신광교 클라우드시티 홍보관"</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 주변 랜드마크 */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">주변 랜드마크</h2>
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div className="bg-white rounded-lg p-4">
                <p className="font-semibold">갤러리아 광교</p>
                <p className="text-sm text-gray-600">차량 5분</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="font-semibold">광교호수공원</p>
                <p className="text-sm text-gray-600">차량 7분</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="font-semibold">경기대학교</p>
                <p className="text-sm text-gray-600">차량 10분</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="font-semibold">수원컨벤션센터</p>
                <p className="text-sm text-gray-600">차량 15분</p>
              </div>
            </div>
          </div>
        </section>

        {/* 방문 예약 CTA */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">홍보관 방문 예약</h2>
            <p className="text-lg mb-8">
              전문 상담사와 함께 신광교 클라우드 시티를 경험해보세요
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a
                href="tel:1668-0668"
                className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                <Phone className="w-5 h-5 mr-2" />
                전화 예약
              </a>
              <a
                href="https://www.hillstate-hec.co.kr/sale/complex/intrst/singyanggyo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-colors"
              >
                온라인 예약
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}