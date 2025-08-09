'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function Registration() {
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 여기에 실제 API 호출 로직을 추가할 수 있습니다
      await new Promise(resolve => setTimeout(resolve, 1000)); // 임시 딜레이
      
      setShowSuccess(true);
      setFormData({ name: '', phone: '' });
    } catch (error) {
      console.error('등록 실패:', error);
      alert('등록 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', phone: '' });
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-24 max-w-2xl">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">등록이 완료되었습니다!</h2>
              <p className="text-gray-600">
                관심고객 등록이 성공적으로 처리되었습니다.<br/>
                빠른 시일 내에 연락드리겠습니다.
              </p>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h3 className="font-bold text-blue-900 mb-2">📞 즉시 상담 가능</h3>
              <a href="tel:1668-5257" className="text-xl font-bold text-blue-600">
                1668-5257
              </a>
            </div>
            
            <button
              onClick={() => setShowSuccess(false)}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              추가 등록하기
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-24 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">관심고객 등록</h1>
            <p className="text-gray-600">
              신광교 클라우드 시티에 관심을 가져주셔서 감사합니다.<br/>
              정보를 입력해주시면 빠른 상담을 도와드리겠습니다.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                고객명 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="성함을 입력해주세요"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                핸드폰 번호 <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="휴대폰 번호를 입력해주세요 (예: 010-1234-5678)"
                required
              />
            </div>

            {/* 개인정보 수집·이용 동의 */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-2">개인정보 수집·이용 안내</h3>
              <div className="text-sm text-gray-600 space-y-2">
                <div>
                  <strong>수집목적:</strong> 관심고객 상담 및 분양정보 제공
                </div>
                <div>
                  <strong>수집항목:</strong> 성명, 연락처
                </div>
                <div>
                  <strong>보유기간:</strong> 수집목적 달성 시까지
                </div>
                <div className="text-xs text-gray-500 mt-3">
                  ※ 등록하기 버튼 클릭 시 개인정보 수집·이용에 동의하는 것으로 간주됩니다.
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? '등록 중...' : '등록하기'}
              </button>
            </div>
          </form>

          {/* 즉시 상담 가능 안내 */}
          <div className="mt-8 p-6 bg-blue-50 rounded-lg text-center">
            <h3 className="font-bold text-blue-900 mb-2">📞 즉시 상담 가능</h3>
            <a 
              href="tel:1668-5257"
              className="inline-block text-2xl font-bold text-blue-600 hover:text-blue-800 transition-colors"
            >
              1668-5257
            </a>
            <div className="mt-4 flex justify-center gap-4">
              <a 
                href="tel:1668-5257"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                📞 전화상담
              </a>
              <a 
                href="http://pf.kakao.com/_xjxaKxj"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-300 transition-colors"
              >
                💬 카카오톡
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}