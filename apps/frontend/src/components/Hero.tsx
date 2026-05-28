"use client";

import React from 'react';
import { motion } from 'framer-motion';
import SearchBar from './SearchBar';

export default function Hero() {
  return (
    <div className="relative w-full overflow-hidden bg-gray-light pb-24 pt-16 md:pt-24 lg:pt-32">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand/20 via-background to-background"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-brand/10 text-brand font-semibold text-sm mb-6 border border-brand/20 shadow-sm">
            #1 College Discovery Platform
          </span>
        </motion.div>
        
        <motion.h1 
          className="text-5xl md:text-7xl font-extrabold text-gray-dark tracking-tight mb-6 text-balance mx-auto max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Discover your perfect <span className="text-brand">college</span> match
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-gray-text mb-12 max-w-2xl mx-auto text-balance"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Explore thousands of top-rated institutions, compare fees, and find the ideal course to kickstart your career.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <SearchBar />
        </motion.div>
        
        {/* Decorative Stats */}
        <motion.div 
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto border-t border-gray-border/50 pt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-gray-dark">10k+</span>
            <span className="text-sm text-gray-text font-medium mt-1">Colleges</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-gray-dark">50k+</span>
            <span className="text-sm text-gray-text font-medium mt-1">Courses</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-gray-dark">2M+</span>
            <span className="text-sm text-gray-text font-medium mt-1">Students</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-gray-dark">4.9/5</span>
            <span className="text-sm text-gray-text font-medium mt-1">Average Rating</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
