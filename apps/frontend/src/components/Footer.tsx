import React from 'react';
import { GraduationCap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-dark py-12 text-center text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-gray-700 pb-8 mb-8">
          <div className="flex items-center gap-2.5">
            <div className="bg-gradient-to-br from-[#FF385C] to-[#E50027] rounded-xl p-2 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-black text-[26px] text-white tracking-tighter">
              College<span className="text-[#FF385C] font-extrabold">Hunt</span>
            </span>
          </div>
          
          <nav className="flex gap-6 text-sm font-medium text-gray-300">
            <a href="#" className="hover:text-white transition-colors">About</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </nav>
        </div>
        <p>&copy; {new Date().getFullYear()} CollegeHunt. All rights reserved.</p>
      </div>
    </footer>
  );
}
