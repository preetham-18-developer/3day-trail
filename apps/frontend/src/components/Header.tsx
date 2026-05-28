"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, User, ChevronDown, GraduationCap } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import LoginModal from './LoginModal';

export default function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { profile: userProfile, signOut } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  const isActive = (path: string) => {
    if (path === '/' && pathname !== '/') return false;
    return pathname?.startsWith(path);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const getLinkClasses = (path: string, isTopNav: boolean = true) => {
    const baseClasses = isTopNav 
      ? "transition-colors h-20 flex items-center" 
      : "transition-colors h-full flex items-center whitespace-nowrap pt-[3px]";
    
    if (isActive(path)) {
      return isTopNav 
        ? `${baseClasses} text-[#FF385C] border-b-[3px] border-[#FF385C]` 
        : `${baseClasses} text-[#FF385C] border-b-[3px] border-[#FF385C]`;
    }
    
    return isTopNav 
      ? `${baseClasses} hover:text-[#FF385C] text-gray-600` 
      : `${baseClasses} hover:text-gray-900`;
  };

  return (
    <header className={`bg-white sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-md border-b-transparent' : 'shadow-sm border-b border-gray-100'}`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Row */}
        <div className="flex items-center justify-between h-20 border-b border-gray-100">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="bg-gradient-to-br from-[#FF385C] to-[#E50027] rounded-xl p-2 flex items-center justify-center shadow-md shadow-[#FF385C]/20 group-hover:scale-105 transition-transform duration-300">
                <GraduationCap className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-black text-[26px] text-gray-900 tracking-tighter">
                College<span className="text-[#FF385C] font-extrabold">Hunt</span>
              </span>
            </Link>
          </div>

          {/* Center Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-12">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for colleges, exams, courses and more..." 
                className="w-full bg-gray-50/80 border border-gray-100 rounded-full py-2.5 pl-11 pr-4 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-200 focus:bg-white transition-all placeholder:text-gray-400 font-medium"
              />
            </form>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center gap-6 xl:gap-8">
            <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-[15px] font-semibold text-gray-600">
              <Link href="/compare" className={getLinkClasses('/compare')}>
                Compare
              </Link>
              <Link href="/predictor" className={getLinkClasses('/predictor')}>
                Prediction
              </Link>
              <Link href="/" className={getLinkClasses('/')}>
                Home
              </Link>
              <Link href="/engineering" className={getLinkClasses('/engineering')}>
                Engineering
              </Link>
              <Link href="/courses" className={getLinkClasses('/courses')}>
                More
              </Link>
            </nav>
            {userProfile ? (
              <div className="relative group cursor-pointer">
                <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-100 pl-2.5 pr-4 py-1.5 rounded-full hover:bg-gray-100 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-[#FF385C] flex items-center justify-center text-white font-bold text-sm shadow-sm overflow-hidden">
                    {userProfile.avatar_url ? (
                      <img src={userProfile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      userProfile.first_name?.charAt(0).toUpperCase() || 'U'
                    )}
                  </div>
                  <span className="text-sm font-bold text-gray-700">{userProfile.first_name}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                </div>
                
                {/* Dropdown */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                  <div className="p-3 border-b border-gray-50">
                    <div className="text-sm font-bold text-gray-900 truncate">{userProfile.first_name} {userProfile.last_name}</div>
                    <div className="text-xs text-gray-500 truncate mt-0.5">{userProfile.email}</div>
                  </div>
                  <div className="p-1.5">
                    <Link href="/dashboard" className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors">
                      Dashboard
                    </Link>
                    <Link href="/dashboard/settings" className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors">
                      My Profile
                    </Link>
                    <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors mt-1">
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full hover:shadow-md transition-all active:scale-95 text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:ring-offset-2"
              >
                <User className="w-4 h-4" />
                Login
              </button>
            )}
          </div>
        </div>

        {/* Secondary Header Row */}
        <div className={`flex items-center overflow-x-auto overflow-y-hidden hide-scrollbar gap-8 text-[14px] font-semibold text-gray-500 transition-all duration-300 origin-top ${isScrolled ? 'h-0 opacity-0 scale-y-0' : 'h-14 opacity-100 scale-y-100'}`}>
           <Link href="/" className={getLinkClasses('/', false)}>
             Home
           </Link>
           <Link href="/engineering" className={getLinkClasses('/engineering', false)}>
             Engineering
           </Link>
           <Link href="/medical" className={getLinkClasses('/medical', false)}>
             Medical
           </Link>
           <Link href="/design" className={getLinkClasses('/design', false)}>
             Design
           </Link>
           <Link href="/science" className={getLinkClasses('/science', false)}>
             Science
           </Link>
           <Link href="/law" className={getLinkClasses('/law', false)}>
             Law
           </Link>
           <Link href="/commerce" className={getLinkClasses('/commerce', false)}>
             Commerce
           </Link>
           <Link href="/roi-calculator" className={getLinkClasses('/roi-calculator', false)}>
             ROI Calculator <span className="ml-1.5 px-1.5 py-0.5 bg-[#FF385C]/10 text-[#FF385C] rounded text-[10px] font-extrabold uppercase tracking-wide">New</span>
           </Link>
           <Link href="/courses" className={getLinkClasses('/courses', false)}>
             Others <ChevronDown className="w-3.5 h-3.5 ml-1" />
           </Link>
        </div>
      </div>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </header>
  );
}
