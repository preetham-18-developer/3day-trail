"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    body: "CollegeHunt made finding the right engineering college so easy. The comparative data helped me make an informed decision without the usual stress.",
    author: {
      name: "Rahul Verma",
      role: "B.Tech Student",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    body: "The 1-on-1 counseling was a game-changer. My counselor helped me discover a niche course that perfectly aligned with my career goals.",
    author: {
      name: "Priya Sharma",
      role: "Design Student",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    body: "I was confused between three top universities. The clear fee structure and placement records on this platform helped me choose the best ROI.",
    author: {
      name: "Amit Patel",
      role: "MBA Candidate",
      imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
  },
];

export default function Testimonials() {
  return (
    <div className="bg-gray-light py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-brand">Testimonials</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-dark sm:text-4xl text-balance">
            Hear from our successful students
          </p>
        </div>
        
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={testimonial.author.name}
                className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-border/50 flex flex-col justify-between hover:shadow-md transition-shadow"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
              >
                <div>
                  <div className="flex gap-1 mb-4">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <Star key={rating} className="h-5 w-5 fill-brand text-brand" />
                    ))}
                  </div>
                  <blockquote className="text-gray-text leading-relaxed">
                    &quot;{testimonial.body}&quot;
                  </blockquote>
                </div>
                
                <div className="mt-6 flex items-center gap-x-4 border-t border-gray-light pt-6">
                  <img
                    className="h-12 w-12 rounded-full bg-gray-50 object-cover"
                    src={testimonial.author.imageUrl}
                    alt=""
                  />
                  <div>
                    <div className="font-semibold text-gray-dark">{testimonial.author.name}</div>
                    <div className="text-sm text-gray-text">{testimonial.author.role}</div>
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
