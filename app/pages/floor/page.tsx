'use client';

import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useState } from 'react';

export default function Floor() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, label: 'B6~B1', image: '/floor_1_.jpg' },
    { id: 1, label: '1~8F', image: '/floor_2_.jpg' },
    { id: 2, label: '9~17F', image: '/floor_3.jpg' },
    { id: 3, label: '18~33F', image: '/floor_4.jpg' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-24 max-w-6xl">
        {/* 페이지 타이틀 - CloudCity 스타일 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">층별안내</h1>
        </div>

        {/* 탭 콘텐츠 영역 */}
        <div className="bg-white">
          {/* 탭 버튼들 - CloudCity 스타일 */}
          <div className="flex border-b border-gray-300 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 px-4 text-center font-medium text-lg transition-all relative ${
                  activeTab === tab.id
                    ? 'text-blue-600 bg-white'
                    : 'text-gray-600 bg-gray-50 hover:bg-gray-100'
                }`}
                style={{
                  borderBottom: activeTab === tab.id ? '3px solid #2563eb' : 'none'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 층별 이미지 표시 영역 */}
          <div className="bg-white p-4">
            <div className="relative" style={{ minHeight: '600px' }}>
              {/* 실제 CloudCity 사이트처럼 간단한 이미지 표시 */}
              <div className="flex justify-center">
                <Image
                  src={tabs[activeTab].image}
                  alt={`${tabs[activeTab].label} 층 평면도`}
                  width={1200}
                  height={800}
                  className="max-w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}