'use client';

import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function Business() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-24 max-w-6xl">
        {/* 페이지 타이틀 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">사업개요</h1>
        </div>

        {/* 메인 이미지 섹션 */}
        <div className="mb-16">
          <div className="relative">
            <Image
              src="/overview_011735197451.jpg"
              alt="신광교 클라우드 시티 사업개요"
              width={1200}
              height={800}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>

        {/* 사업 정보 테이블 */}
        <div className="bg-gray-50 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">사업 개요</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody>
                <tr className="border-b">
                  <td className="py-4 px-4 bg-gray-100 font-semibold w-1/4">사업명</td>
                  <td className="py-4 px-4">신광교 클라우드 시티</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4 bg-gray-100 font-semibold">위치</td>
                  <td className="py-4 px-4">경기도 수원시 장안구 조원동 893번지</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4 bg-gray-100 font-semibold">대지면적</td>
                  <td className="py-4 px-4">14,541.00㎡</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4 bg-gray-100 font-semibold">연면적</td>
                  <td className="py-4 px-4">183,597.71㎡</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4 bg-gray-100 font-semibold">건축규모</td>
                  <td className="py-4 px-4">지하 6층 ~ 지상 33층</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4 bg-gray-100 font-semibold">용도</td>
                  <td className="py-4 px-4">업무시설(오피스텔), 근린생활시설</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4 bg-gray-100 font-semibold">세대수</td>
                  <td className="py-4 px-4">오피스텔 1,738세대</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4 bg-gray-100 font-semibold">주차대수</td>
                  <td className="py-4 px-4">총 1,867대</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4 bg-gray-100 font-semibold">시공사</td>
                  <td className="py-4 px-4">현대엔지니어링</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 bg-gray-100 font-semibold">입주예정</td>
                  <td className="py-4 px-4">2027년 12월 예정</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 프로젝트 특징 섹션 */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl mb-4">🏢</div>
            <h3 className="text-xl font-bold mb-2">압도적 스케일</h3>
            <p className="text-gray-600">
              지상 33층, 1,738세대<br/>
              경기 남부 최대 규모
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl mb-4">🚇</div>
            <h3 className="text-xl font-bold mb-2">탁월한 입지</h3>
            <p className="text-gray-600">
              신분당선 광교중앙역<br/>
              삼성역 15분 직통
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl mb-4">🌟</div>
            <h3 className="text-xl font-bold mb-2">프리미엄 시설</h3>
            <p className="text-gray-600">
              최고급 커뮤니티 시설<br/>
              스마트 오피스 시스템
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}