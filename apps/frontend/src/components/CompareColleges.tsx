"use client";

import React, { useState } from 'react';
import { Plus, X, Search, CheckCircle2, ChevronRight, Star } from 'lucide-react';

import collegesData from '../data/colleges.json';

interface College {
  id: string;
  name: string;
  location: string;
  rating: number;
  fee: string;
  placement: string;
  avgPackage: string;
  highestPackage: string;
  category: string;
  tags: string[];
}

export default function CompareColleges() {
  const [selectedColleges, setSelectedColleges] = useState<College[]>([collegesData[0], collegesData[1]]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const filteredColleges = collegesData.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
    !selectedColleges.find(sc => sc.id === c.id)
  );

  const addCollege = (college: College) => {
    if (selectedColleges.length < 4) {
      setSelectedColleges([...selectedColleges, college]);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const removeCollege = (id: string) => {
    setSelectedColleges(selectedColleges.filter(c => c.id !== id));
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 pb-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl mb-3">Compare Colleges Side-by-Side</h1>
          <p className="text-lg text-gray-600">Select up to 4 colleges to compare their fees, placements, acceptance rates, and more.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr>
                  <th className="w-1/5 p-6 bg-gray-50 border-b border-r border-gray-200 align-top">
                    <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Colleges ({selectedColleges.length}/4)</div>
                    <p className="text-xs text-gray-400">Add colleges to see comparison</p>
                  </th>
                  
                  {selectedColleges.map((college) => (
                    <th key={college.id} className="w-1/5 p-6 bg-white border-b border-r border-gray-200 align-top relative group">
                      <button 
                        onClick={() => removeCollege(college.id)}
                        className="absolute top-4 right-4 p-1.5 bg-gray-100 hover:bg-red-100 hover:text-red-600 text-gray-500 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="h-16 w-16 bg-gray-100 rounded-xl mb-4 flex items-center justify-center text-xl font-bold text-[#FF385C]">
                        {college.name.substring(0, 1)}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{college.name}</h3>
                      <p className="text-sm text-gray-500">{college.location}</p>
                    </th>
                  ))}

                  {selectedColleges.length < 4 && (
                    <th className="w-1/5 p-6 bg-gray-50/50 border-b border-gray-200 align-top relative">
                      {!isSearchOpen ? (
                        <button 
                          onClick={() => setIsSearchOpen(true)}
                          className="w-full h-full min-h-[160px] flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl hover:border-[#FF385C] hover:bg-[#FF385C]/5 transition-colors group cursor-pointer"
                        >
                          <div className="bg-white p-3 rounded-full shadow-sm mb-3 group-hover:text-[#FF385C] group-hover:scale-110 transition-transform">
                            <Plus className="w-6 h-6 text-gray-400 group-hover:text-[#FF385C]" />
                          </div>
                          <span className="text-sm font-medium text-gray-500 group-hover:text-[#FF385C]">Add College</span>
                        </button>
                      ) : (
                        <div className="w-full">
                          <div className="relative mb-3">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input 
                              type="text" 
                              autoFocus
                              placeholder="Search colleges..." 
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full pl-9 pr-8 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-transparent"
                            />
                            <button onClick={() => setIsSearchOpen(false)} className="absolute right-3 top-1/2 -translate-y-1/2">
                               <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                            </button>
                          </div>
                          <div className="bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto absolute z-10 w-[calc(100%-3rem)]">
                            {filteredColleges.length > 0 ? (
                              filteredColleges.map(c => (
                                <button 
                                  key={c.id}
                                  onClick={() => addCollege(c)}
                                  className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors"
                                >
                                  <div className="font-medium text-sm text-gray-900">{c.name}</div>
                                  <div className="text-xs text-gray-500">{c.location}</div>
                                </button>
                              ))
                            ) : (
                              <div className="p-4 text-sm text-gray-500 text-center">No colleges found</div>
                            )}
                          </div>
                        </div>
                      )}
                    </th>
                  )}
                  {/* Fill empty columns if less than 3 total selected to maintain grid */}
                  {Array.from({ length: Math.max(0, 3 - selectedColleges.length) }).map((_, i) => (
                    <th key={`empty-${i}`} className="w-1/5 p-6 bg-gray-50/20 border-b border-gray-200"></th>
                  ))}
                </tr>
              </thead>
              
              <tbody className="divide-y divide-gray-200">
                {/* Rating Row */}
                <tr>
                  <td className="p-6 bg-gray-50 border-r border-gray-200 font-medium text-gray-900">Rating</td>
                  {selectedColleges.map(college => (
                    <td key={college.id} className="p-6 border-r border-gray-200">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        <span className="font-bold text-gray-900">{college.rating}</span>
                        <span className="text-sm text-gray-500">/ 5</span>
                      </div>
                    </td>
                  ))}
                  {Array.from({ length: 4 - selectedColleges.length }).map((_, i) => (
                    <td key={`empty-rating-${i}`} className="p-6 bg-gray-50/20"></td>
                  ))}
                </tr>
                
                {/* Fees Row */}
                <tr>
                  <td className="p-6 bg-gray-50 border-r border-gray-200 font-medium text-gray-900">Total Fees</td>
                  {selectedColleges.map(college => (
                    <td key={college.id} className="p-6 border-r border-gray-200">
                      <span className="font-medium text-gray-900">{college.fee}</span>
                    </td>
                  ))}
                  {Array.from({ length: 4 - selectedColleges.length }).map((_, i) => (
                    <td key={`empty-fees-${i}`} className="p-6 bg-gray-50/20"></td>
                  ))}
                </tr>

                {/* Avg Package Row */}
                <tr>
                  <td className="p-6 bg-gray-50 border-r border-gray-200 font-medium text-gray-900">Average Package</td>
                  {selectedColleges.map(college => (
                    <td key={college.id} className="p-6 border-r border-gray-200">
                      <div className="font-bold text-green-600">{college.avgPackage}</div>
                    </td>
                  ))}
                  {Array.from({ length: 4 - selectedColleges.length }).map((_, i) => (
                    <td key={`empty-avg-${i}`} className="p-6 bg-gray-50/20"></td>
                  ))}
                </tr>

                {/* Highest Package Row */}
                <tr>
                  <td className="p-6 bg-gray-50 border-r border-gray-200 font-medium text-gray-900">Highest Package</td>
                  {selectedColleges.map(college => (
                    <td key={college.id} className="p-6 border-r border-gray-200">
                      <span className="font-medium text-gray-900">{college.highestPackage}</span>
                    </td>
                  ))}
                  {Array.from({ length: 4 - selectedColleges.length }).map((_, i) => (
                    <td key={`empty-highest-${i}`} className="p-6 bg-gray-50/20"></td>
                  ))}
                </tr>

                {/* Placement Rate Row */}
                <tr>
                  <td className="p-6 bg-gray-50 border-r border-gray-200 font-medium text-gray-900">Placement Rate</td>
                  {selectedColleges.map(college => (
                    <td key={college.id} className="p-6 border-r border-gray-200">
                      <span className="font-medium text-gray-900">{college.placement}</span>
                    </td>
                  ))}
                  {Array.from({ length: 4 - selectedColleges.length }).map((_, i) => (
                    <td key={`empty-placement-${i}`} className="p-6 bg-gray-50/20"></td>
                  ))}
                </tr>

                {/* Tags Row */}
                <tr>
                  <td className="p-6 bg-gray-50 border-r border-gray-200 font-medium text-gray-900 align-top">Highlights</td>
                  {selectedColleges.map(college => (
                    <td key={college.id} className="p-6 border-r border-gray-200 align-top">
                      <ul className="space-y-2">
                        {college.tags.map((tag, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                            <span>{tag}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                  {Array.from({ length: 4 - selectedColleges.length }).map((_, i) => (
                    <td key={`empty-courses-${i}`} className="p-6 bg-gray-50/20"></td>
                  ))}
                </tr>

                {/* Action Row */}
                <tr>
                  <td className="p-6 bg-gray-50 border-r border-gray-200"></td>
                  {selectedColleges.map(college => (
                    <td key={college.id} className="p-6 border-r border-gray-200">
                      <button className="w-full bg-white border border-gray-300 hover:border-[#FF385C] hover:text-[#FF385C] text-gray-700 font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2">
                        View Profile <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  ))}
                  {Array.from({ length: 4 - selectedColleges.length }).map((_, i) => (
                    <td key={`empty-action-${i}`} className="p-6 bg-gray-50/20"></td>
                  ))}
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
