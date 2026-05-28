"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Compass, Users } from 'lucide-react';

const features = [
  {
    name: 'Verified Institutions',
    description: 'Every college on our platform goes through a rigorous verification process to ensure authenticity.',
    icon: Award,
  },
  {
    name: 'Expert Counseling',
    description: 'Get 1-on-1 guidance from admission experts to help you make the right career choice.',
    icon: Users,
  },
  {
    name: 'Comprehensive Data',
    description: 'Compare fees, placement records, and campus facilities with our detailed analytics.',
    icon: GraduationCap,
  },
  {
    name: 'Career Mapping',
    description: 'Discover the right course based on your skills, interests, and future career goals.',
    icon: Compass,
  },
];

export default function Features() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-brand">Why CollegeHunt?</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-dark sm:text-4xl text-balance">
            Everything you need to make the right choice
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-text text-balance">
            We simplify the complex college admission process by providing transparent data and expert guidance at your fingertips.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div 
                key={feature.name} 
                className="flex flex-col items-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="rounded-xl bg-brand/10 p-3 ring-1 ring-brand/20 mb-6">
                  <feature.icon className="h-6 w-6 text-brand" aria-hidden="true" />
                </div>
                <dt className="text-xl font-bold leading-7 text-gray-dark mb-2">
                  {feature.name}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-text">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
