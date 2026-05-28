import React from 'react';

export interface CollegeCardProps {
  image: string;
  title: string;
  location: string;
  fee: string;
  rating: number;
  isTopRated?: boolean;
}

export default function CollegeCard({ image, title, location, fee, rating, isTopRated }: CollegeCardProps) {
  return (
    <div className="group cursor-pointer flex flex-col gap-3 min-w-[280px] w-[280px] sm:w-[300px] snap-start">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-light">
        {/* Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundImage: `url('${image}')` }}
        />
        
        {/* Top Rated Pill */}
        {isTopRated && (
          <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-xs font-bold shadow-sm z-10">
            Top Rated
          </div>
        )}

        {/* Favorite Icon */}
        <button className="absolute top-3 right-3 text-white hover:scale-110 transition-transform z-10">
          <svg className="w-7 h-7 drop-shadow-md" fill="rgba(0,0,0,0.3)" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-dark line-clamp-1">{title}</h3>
          <p className="text-gray-text text-sm">{location}</p>
          <p className="text-gray-dark text-sm mt-1 font-medium">{fee}</p>
        </div>
        
        {/* Rating */}
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4 text-gray-dark" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-sm text-gray-dark">{rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
}
