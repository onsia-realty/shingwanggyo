'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuItems = [
    {
      title: '사업개요',
      items: ['사업개요', '브랜드'],
    },
    {
      title: '프리미엄',
      items: ['프리미엄'],
    },
    {
      title: '입지환경',
      items: ['입지환경'],
    },
    {
      title: '상품안내',
      items: ['단지정보', '부대시설&컨시어지', '금융 및 세제혜택', '층별안내'],
    },
    {
      title: '홍보센터',
      items: ['홍보영상', '언론보도', '모델하우스 사진'],
    },
    {
      title: '방문예약',
      items: [],
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-white/90 backdrop-blur-md'}`}>
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between h-20">
            {/* 로고 */}
            <Link href="/" className="flex items-center">
              <Image src="/all-images/main/top_logo.png" alt="신광교 클라우드시티" width={200} height={60} className="h-12 w-auto" />
            </Link>

            {/* 데스크톱 메뉴 */}
            <nav className="hidden md:flex items-center space-x-8">
              {menuItems.map((menu) => (
                <div key={menu.title}>
                  {menu.items.length > 0 ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                        {menu.title}
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {menu.items.map((item) => {
                          const getItemLink = (itemName: string) => {
                            switch (itemName) {
                              case '사업개요': return '/pages/business';
                              case '브랜드': return '/pages/brand';
                              case '프리미엄': return '/pages/premium';
                              case '입지환경': return '/pages/environment';
                              case '단지정보': return '/pages/complex-info';
                              case '부대시설&컨시어지': return '/pages/facilities';
                              case '금융 및 세제혜택': return '/pages/finance';
                              case '층별안내': return '/pages/floor';
                              case '홍보영상': return '/pages/video';
                              case '언론보도': return '/pages/media';
                              case '모델하우스 사진': return '/pages/gallery';
                              default: return '#';
                            }
                          };
                          
                          return (
                            <DropdownMenuItem key={item}>
                              <Link href={getItemLink(item)} className="w-full">
                                {item}
                              </Link>
                            </DropdownMenuItem>
                          );
                        })}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link 
                      href="/pages/registration"
                      className="text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {menu.title}
                    </Link>
                  )}
                </div>
              ))}
              <a href="tel:1668-5257" className="text-blue-600 font-bold text-lg">
                <Image src="/all-images/main/icon_header_phone.png" alt="전화" width={20} height={20} className="inline-block mr-2" />
                1668-5257
              </a>
            </nav>

            {/* 모바일 메뉴 버튼 */}
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* 모바일 메뉴 */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <nav className="fixed right-0 top-0 h-full w-64 bg-white p-6 shadow-xl">
            <button
              className="absolute top-4 right-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={24} />
            </button>
            <div className="mt-12 space-y-4">
              {menuItems.map((menu) => (
                <div key={menu.title}>
                  <h3 className="font-bold text-gray-900 mb-2">{menu.title}</h3>
                  {menu.items.length > 0 && (
                    <ul className="space-y-2 ml-4">
                      {menu.items.map((item) => {
                        const getItemLink = (itemName: string) => {
                          switch (itemName) {
                            case '사업개요': return '/pages/business';
                            case '브랜드': return '/pages/brand';
                            case '프리미엄': return '/pages/premium';
                            case '입지환경': return '/pages/environment';
                            case '단지정보': return '/pages/complex-info';
                            case '부대시설&컨시어지': return '/pages/facilities';
                            case '금융 및 세제혜택': return '/pages/finance';
                            case '층별안내': return '/pages/floor';
                            case '홍보영상': return '/pages/video';
                            case '언론보도': return '/pages/media';
                            case '모델하우스 사진': return '/pages/gallery';
                            default: return '#';
                          }
                        };
                        
                        return (
                          <li key={item}>
                            <Link href={getItemLink(item)} className="text-gray-600 hover:text-blue-600">
                              {item}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  {menu.items.length === 0 && (
                    <Link 
                      href="/pages/registration"
                      className="inline-block text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors ml-4"
                    >
                      바로가기
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t">
                <a href="tel:1668-5257" className="text-blue-600 font-bold text-lg">
                  <Image src="/all-images/main/icon_header_phone.png" alt="전화" width={20} height={20} className="inline-block mr-2" />
                  1668-5257
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}

      <style jsx>{`
        header {
          transition: all 0.3s ease;
        }
      `}</style>
    </>
  );
}