import React from 'react';

export default function SearchBar() {
  return (
    <div className="flex justify-center mt-8 relative z-40 mb-12 px-4">
      <div className="bg-white rounded-full shadow-lg border border-gray-border/50 flex flex-col sm:flex-row items-center p-2 w-full max-w-4xl divide-y sm:divide-y-0 sm:divide-x divide-gray-border">
        
        {/* Location Search */}
        <div className="flex-1 px-6 py-2 hover:bg-gray-light rounded-full cursor-pointer transition-colors w-full text-left">
          <div className="text-xs font-bold text-gray-dark">Location</div>
          <div className="text-sm text-gray-text truncate">Search destinations</div>
        </div>

        {/* Course Search */}
        <div className="flex-1 px-6 py-2 hover:bg-gray-light rounded-full cursor-pointer transition-colors w-full text-left">
          <div className="text-xs font-bold text-gray-dark">Course</div>
          <div className="text-sm text-gray-text truncate">Add details</div>
        </div>

        {/* Eligibility Search */}
        <div className="flex-1 px-6 py-2 hover:bg-gray-light rounded-full cursor-pointer transition-colors flex items-center justify-between w-full">
          <div className="text-left">
            <div className="text-xs font-bold text-gray-dark">Eligibility</div>
            <div className="text-sm text-gray-text truncate">Add marks/rank</div>
          </div>
          
          <button className="bg-brand hover:bg-brand-dark text-white rounded-full p-4 ml-2 transition-colors flex items-center justify-center shadow-md shadow-brand/30">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
}
