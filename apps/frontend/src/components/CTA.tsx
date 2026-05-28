"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <motion.div 
          className="relative isolate overflow-hidden bg-brand px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute -top-24 -left-24 -z-10 transform-gpu blur-3xl" aria-hidden="true">
            <div className="aspect-[1024/1024] w-[64rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-40"></div>
          </div>
          
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to find your dream college?
              <br />
              Start your journey today.
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/90">
              Join thousands of students who have successfully navigated their college admissions with CollegeHunt. Create a free account now.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start pb-16 lg:pb-0">
              <a
                href="#"
                className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-brand shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors flex items-center gap-2"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#" className="text-sm font-semibold leading-6 text-white hover:text-white/80 transition-colors">
                Speak to a Counselor <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div className="relative mt-16 h-80 lg:mt-8">
            <img
              className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
              alt="App screenshot"
              width={1824}
              height={1080}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
