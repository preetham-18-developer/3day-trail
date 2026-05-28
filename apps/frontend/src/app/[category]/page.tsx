"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Star, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import collegesData from '@/data/colleges.json';

export default function CategoryPage({ params }: { params: { category: string } }) {
  const categoryName = params.category.toLowerCase();
  
  // Filter colleges from the generated JSON based on the dynamic category
  const collegesList = collegesData.filter(c => c.category === categoryName);
  
  // If we couldn't find any for this category (e.g., custom URL), just show 10 random ones
  const finalCollegesList = collegesList.length > 0 
    ? collegesList 
    : collegesData.slice(0, 10);

  const formattedTitle = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-20">
      
      {/* Search Header */}
      <div className="bg-white border-b border-gray-100 py-8">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <Link href="/" className="hover:text-[#FF385C]">Home</Link>
                <span>/</span>
                <span className="text-gray-900 font-medium capitalize">{categoryName} Colleges</span>
              </div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Top {formattedTitle} Colleges in India
              </h1>
              <p className="text-gray-500 mt-1">Found {finalCollegesList.length} verified institutions</p>
            </div>
            
            <div className="w-full md:w-96">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder={`Search ${formattedTitle} colleges...`}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF385C]/20 focus:border-[#FF385C] transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 flex gap-8">
        
        {/* Filters Sidebar */}
        <div className="hidden lg:block w-72 shrink-0">
          <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 p-6 sticky top-40">
            <h3 className="font-bold text-gray-900 mb-6">Filters</h3>
            
            <div className="mb-8">
              <h4 className="font-semibold text-sm text-gray-700 mb-3">Location</h4>
              <div className="space-y-3">
                {['Delhi NCR', 'Mumbai', 'Bangalore', 'Chennai', 'Pune'].map(city => (
                  <label key={city} className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-4 h-4 rounded border border-gray-300 group-hover:border-[#FF385C] flex items-center justify-center"></div>
                    <span className="text-sm text-gray-600 group-hover:text-gray-900">{city}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h4 className="font-semibold text-sm text-gray-700 mb-3">Total Fees</h4>
              <div className="space-y-3">
                {['< 1 Lakh', '1 - 2 Lakhs', '2 - 5 Lakhs', '> 5 Lakhs'].map(fee => (
                  <label key={fee} className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-4 h-4 rounded-full border border-gray-300 group-hover:border-[#FF385C]"></div>
                    <span className="text-sm text-gray-600 group-hover:text-gray-900">{fee}</span>
                  </label>
                ))}
              </div>
            </div>

            <button className="w-full py-3 bg-[#FF385C]/10 text-[#FF385C] font-bold rounded-xl hover:bg-[#FF385C] hover:text-white transition-colors">
              Apply Filters
            </button>
          </div>
        </div>

        {/* Colleges List */}
        <div className="flex-1">
          <div className="flex flex-col gap-6">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {finalCollegesList.map((college: any, idx: number) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={college.id} 
                className="bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 overflow-hidden flex flex-col sm:flex-row group hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300"
              >
                {/* College Image */}
                <div className="w-full sm:w-64 h-48 sm:h-auto relative overflow-hidden shrink-0">
                  <img src={college.image} alt={college.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-bold text-gray-800 shadow-sm flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" /> {college.rating}
                  </div>
                </div>

                {/* College Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-xl font-extrabold text-gray-900 group-hover:text-[#FF385C] transition-colors">{college.name}</h2>
                      <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#FF385C] hover:border-[#FF385C] transition-colors cursor-pointer">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                      <MapPin className="w-4 h-4" /> {college.location}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {college.tags.map((tag: string) => (
                        <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-semibold">
                          {tag}
                        </span>
                      ))}
                      <span className="px-3 py-1 bg-green-50 text-green-600 rounded-md text-xs font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> UGC Approved
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
                    <div>
                      <div className="text-xs text-gray-500 font-medium mb-1">Average Fees</div>
                      <div className="font-extrabold text-gray-900">{college.fee}</div>
                    </div>
                    <div className="flex gap-3 w-full sm:w-auto">
                      <button className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl border border-[#FF385C] text-[#FF385C] font-bold text-sm hover:bg-red-50 transition-colors">
                        Brochure
                      </button>
                      <button className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-[#FF385C] text-white font-bold text-sm hover:bg-[#E50027] transition-colors flex items-center justify-center gap-2 shadow-md shadow-red-500/20">
                        Apply Now <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
