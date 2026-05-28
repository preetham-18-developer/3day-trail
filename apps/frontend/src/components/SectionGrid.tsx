import React from 'react';

interface SectionGridProps {
  title: string;
  children: React.ReactNode;
}

export default function SectionGrid({ title, children }: SectionGridProps) {
  return (
    <section className="mb-12">
      <div className="flex items-center space-x-4 mb-6">
        <h2 className="text-2xl font-semibold text-gray-dark">{title}</h2>
        <button className="flex items-center justify-center w-8 h-8 rounded-full bg-white border border-gray-border shadow-sm hover:shadow-md transition-shadow">
          <svg className="w-4 h-4 text-gray-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="relative">
        <div className="flex overflow-x-auto gap-6 pb-6 snap-x hide-scrollbar">
          {children}
        </div>
        
        {/* Navigation Buttons */}
        <button className="hidden sm:flex absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 items-center justify-center rounded-full bg-white border border-gray-border shadow-md hover:scale-105 transition-transform z-10">
          <svg className="w-4 h-4 text-gray-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button className="hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 items-center justify-center rounded-full bg-white border border-gray-border shadow-md hover:scale-105 transition-transform z-10">
          <svg className="w-4 h-4 text-gray-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
