"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search as SearchIcon, MapPin, Star } from 'lucide-react';
import Link from 'next/link';
import collegesData from '@/data/colleges.json';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const results = query 
    ? collegesData.filter(c => 
        c.name.toLowerCase().includes(query.toLowerCase()) || 
        c.location.toLowerCase().includes(query.toLowerCase()) ||
        c.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-20">
      <div className="bg-white border-b border-gray-100 py-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Search Results for &quot;{query}&quot;
          </h1>
          <p className="text-xl text-gray-500 font-medium">
            Found {results.length} colleges matching your search
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {results.map((college: any) => (
              <div key={college.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="h-48 overflow-hidden relative">
                  <img src={college.image} alt={college.name} className="w-full h-full object-cover" />
                  {college.isTopRated && (
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-extrabold tracking-wide uppercase text-green-600 shadow-sm">
                      Top Rated
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-extrabold text-lg text-gray-900 mb-2 line-clamp-1">{college.name}</h3>
                  <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-4">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span className="truncate">{college.location}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded text-yellow-700 font-bold text-sm">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      {college.rating}
                    </div>
                    <span className="text-gray-400 text-sm">{college.reviews} reviews</span>
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-0.5">Total Fees</div>
                      <div className="font-extrabold text-gray-900">{college.fee}</div>
                    </div>
                    <Link href={`/compare?college=${college.id}`} className="px-4 py-2 bg-[#FF385C] text-white text-sm font-bold rounded-lg hover:bg-[#E50027] transition-colors">
                      Compare
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No colleges found</h2>
            <p className="text-gray-500">Try searching with different keywords like &quot;Engineering&quot; or &quot;Mumbai&quot;.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-500 font-bold text-xl">Loading search results...</div>}>
      <SearchResults />
    </Suspense>
  );
}
