"use client";

import React from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { Bookmark, MapPin, ArrowRight, Star, Trash2 } from 'lucide-react';
import Link from 'next/link';
import collegesData from '@/data/colleges.json';
import { motion } from 'framer-motion';

export default function SavedCollegesPage() {
  const { profile } = useAuthStore();

  // For demonstration, we'll slice the first 4 colleges as "saved" if the user has none in their profile
  const savedColleges = profile?.saved_colleges?.length 
    ? collegesData.filter(c => profile.saved_colleges?.includes(c.id))
    : collegesData.slice(0, 4);

  return (
    <div className="max-w-6xl space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            <Bookmark className="w-8 h-8 text-blue-600" />
            Saved Colleges
          </h1>
          <p className="text-gray-500 font-medium mt-2 text-lg">
            Review and manage the colleges you have shortlisted for your application.
          </p>
        </div>
        <Link href="/compare" className="shrink-0 bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-100 font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-2">
          Compare Saved <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {savedColleges.map((college, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            key={college.id}
            className="group bg-white rounded-3xl border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)] hover:shadow-lg transition-all overflow-hidden flex flex-col"
          >
            <div className="relative h-48 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent z-10"></div>
              <img 
                src={college.image} 
                alt={college.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute top-4 right-4 z-20 flex gap-2">
                <button className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-red-500 hover:border-white transition-all shadow-sm">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <div className="absolute bottom-4 left-4 z-20">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white text-xs font-bold flex items-center gap-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" /> {college.rating}
                  </span>
                  <span className="px-2.5 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white text-xs font-bold shadow-sm">
                    {college.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white line-clamp-1">{college.name}</h3>
              </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mb-4">
                <MapPin className="w-4 h-4 shrink-0" />
                <span className="truncate">{college.location}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Average Fee</div>
                  <div className="text-sm font-black text-gray-900">{college.fee}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Highest Package</div>
                  <div className="text-sm font-black text-green-600">{college.highestPackage}</div>
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-50 flex gap-3">
                <Link href={`/compare?college=${college.id}`} className="flex-1 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold text-sm rounded-xl text-center hover:bg-gray-50 transition-colors shadow-sm">
                  Compare
                </Link>
                <button className="flex-1 py-2.5 bg-[#FF385C] text-white font-bold text-sm rounded-xl hover:bg-[#E31C5F] transition-colors shadow-md shadow-[#FF385C]/20 active:scale-95">
                  Apply Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {savedColleges.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">No colleges saved yet</h2>
          <p className="text-gray-500 font-medium mb-6">Explore colleges and bookmark them to compare later.</p>
          <Link href="/search" className="inline-flex items-center gap-2 bg-[#FF385C] text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-[#E31C5F] transition-all active:scale-95 shadow-md shadow-[#FF385C]/20">
            Explore Colleges
          </Link>
        </div>
      )}
    </div>
  );
}
