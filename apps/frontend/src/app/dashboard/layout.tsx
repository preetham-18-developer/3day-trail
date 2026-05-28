"use client";

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { 
  LayoutDashboard, 
  Bookmark, 
  Settings, 
  LogOut, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { profile, isLoading, signOut } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If not loading and no profile, redirect to home
    if (!isLoading && !profile) {
      router.push('/');
    }
  }, [isLoading, profile, router]);

  if (isLoading || !profile) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-[#FF385C] rounded-full animate-spin"></div>
          <p className="text-gray-500 font-bold">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Saved Colleges', href: '/dashboard/saved', icon: Bookmark },
    { name: 'AI Insights', href: '/dashboard/insights', icon: Sparkles },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col md:flex-row pb-20 md:pb-0">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-100 flex-shrink-0 md:h-screen sticky top-0 z-10 flex flex-col">
        <div className="p-6 border-b border-gray-100 hidden md:block">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Workspace</h2>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF385C] to-orange-400 flex items-center justify-center text-white font-bold text-lg shadow-md overflow-hidden">
              {profile.avatar_url ? (
                <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                profile.first_name?.charAt(0).toUpperCase() || 'U'
              )}
            </div>
            <div className="overflow-hidden">
              <div className="font-extrabold text-gray-900 truncate">{profile.first_name} {profile.last_name}</div>
              <div className="text-xs text-gray-500 font-medium truncate capitalize">{profile.role || 'Student'} Account</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 flex md:flex-col gap-2 overflow-x-auto md:overflow-x-hidden">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all whitespace-nowrap ${
                  isActive 
                    ? 'bg-[#FFF0F2] text-[#FF385C] font-bold' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-[#FF385C]' : 'text-gray-400'}`} />
                {item.name}
                {isActive && <ChevronRight className="w-4 h-4 ml-auto hidden md:block" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100 hidden md:block">
          <button 
            onClick={() => {
              signOut();
              router.push('/');
            }}
            className="flex items-center gap-3 w-full px-3 py-2.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all font-bold text-sm"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </div>
      </main>

    </div>
  );
}
