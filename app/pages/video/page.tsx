'use client';

import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useState } from 'react';
import { Play } from 'lucide-react';

export default function Video() {
  const [selectedVideo, setSelectedVideo] = useState(0);

  const videos = [
    {
      id: 1,
      title: '신광교 클라우드 시티 브랜드 필름',
      thumbnail: '/images/video-thumb1.jpg',
      url: 'https://www.youtube.com/embed/jKptbfrHO9E',
      duration: '2:30',
    },
    {
      id: 2,
      title: '입지환경 소개',
      thumbnail: '/images/video-thumb2.jpg',
      url: 'https://www.youtube.com/embed/jKptbfrHO9E',
      duration: '3:15',
    },
    {
      id: 3,
      title: '커뮤니티 시설 투어',
      thumbnail: '/images/video-thumb3.jpg',
      url: 'https://www.youtube.com/embed/jKptbfrHO9E',
      duration: '4:20',
    },
    {
      id: 4,
      title: '현대엔지니어링 기술력',
      thumbnail: '/images/video-thumb4.jpg',
      url: 'https://www.youtube.com/embed/jKptbfrHO9E',
      duration: '2:50',
    },
  ];

  return (
    <div className="gradient-bg min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-24 max-w-6xl">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            홍보센터
          </h1>
          <p className="text-xl text-gray-600">
            신광교 클라우드 시티의 비전을 영상으로 만나보세요
          </p>
        </section>

        {/* 메인 비디오 플레이어 */}
        <section className="mb-16">
          <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative aspect-video">
              <iframe
                src={videos[selectedVideo].url}
                title={videos[selectedVideo].title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
          <div className="mt-6 text-center">
            <h2 className="text-2xl font-bold mb-2">{videos[selectedVideo].title}</h2>
            <p className="text-gray-600">재생시간: {videos[selectedVideo].duration}</p>
          </div>
        </section>

        {/* 비디오 리스트 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">홍보 영상</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.map((video, index) => (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(index)}
                className={`cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all transform hover:scale-105 ${
                  selectedVideo === index ? 'ring-4 ring-blue-600' : ''
                }`}
              >
                <div className="relative aspect-video bg-gray-200">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-white/90 rounded-full p-3">
                      <Play className="w-6 h-6 text-blue-600" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-semibold text-sm">{video.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* VR 투어 섹션 */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">360° VR 투어</h2>
            <p className="text-lg mb-8">
              가상현실로 미리 경험하는 신광교 클라우드 시티
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              VR 투어 시작하기
            </button>
          </div>
        </section>

        {/* 거주자 인터뷰 섹션 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">거주자 인터뷰</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h3 className="font-bold">김○○ 대표</h3>
                  <p className="text-sm text-gray-600">IT 스타트업</p>
                </div>
              </div>
              <p className="text-gray-700">
                "교통이 정말 편리해요. 강남까지 30분이면 충분하고, 
                커뮤니티 시설도 잘 되어 있어서 업무 효율이 높아졌습니다."
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h3 className="font-bold">이○○ 이사</h3>
                  <p className="text-sm text-gray-600">금융 컨설팅</p>
                </div>
              </div>
              <p className="text-gray-700">
                "프리미엄 시설과 서비스가 정말 만족스럽습니다. 
                특히 컨시어지 서비스는 업무에 큰 도움이 됩니다."
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h3 className="font-bold">박○○ 팀장</h3>
                  <p className="text-sm text-gray-600">디자인 에이전시</p>
                </div>
              </div>
              <p className="text-gray-700">
                "창의적인 공간 설계가 인상적이에요. 
                크리에이티브 스튜디오에서 영감을 많이 받고 있습니다."
              </p>
            </div>
          </div>
        </section>

        {/* 다운로드 섹션 */}
        <section className="mb-16">
          <div className="bg-gray-100 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">자료 다운로드</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <button className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-2">📄</div>
                <p className="font-semibold">브로슈어</p>
                <p className="text-sm text-gray-600">PDF (15MB)</p>
              </button>
              <button className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-2">📊</div>
                <p className="font-semibold">평면도</p>
                <p className="text-sm text-gray-600">PDF (8MB)</p>
              </button>
              <button className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-2">📋</div>
                <p className="font-semibold">입주안내서</p>
                <p className="text-sm text-gray-600">PDF (5MB)</p>
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}