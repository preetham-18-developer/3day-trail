"use client";

import React from 'react';
import { Users, FileCheck, PhoneCall, GraduationCap } from 'lucide-react';

const services = [
  {
    title: '1-on-1 Expert Counseling',
    description: 'Get personalized guidance from our experienced counselors to choose the right college and course based on your profile.',
    icon: Users,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    title: 'Application Assistance',
    description: 'End-to-end support for your college applications, ensuring error-free submissions and higher acceptance rates.',
    icon: FileCheck,
    color: 'bg-green-100 text-green-600'
  },
  {
    title: 'Mock Interviews',
    description: 'Prepare for college admissions and scholarship interviews with our expert panelists.',
    icon: PhoneCall,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    title: 'Scholarship Guidance',
    description: 'Discover and apply for scholarships you are eligible for to fund your higher education.',
    icon: GraduationCap,
    color: 'bg-[#FF385C]/10 text-[#FF385C]'
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-dark mb-6 animate-fade-in">
          Premium <span className="text-[#FF385C]">Services</span>
        </h1>
        <p className="text-lg text-gray-text animate-fade-in">
          We offer a comprehensive suite of services designed to make your college admission journey smooth, stress-free, and successful.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {services.map((service) => (
          <div
            key={service.title}
            className="flex flex-col sm:flex-row gap-6 p-8 rounded-3xl bg-white border border-gray-border shadow-sm hover:shadow-xl transition-all group animate-fade-in"
          >
            <div className={`shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center ${service.color} group-hover:scale-110 transition-transform`}>
              <service.icon className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-dark mb-3">{service.title}</h3>
              <p className="text-gray-text leading-relaxed">{service.description}</p>
              <a href="mailto:support@collegehunt.com" className="mt-4 text-[#FF385C] font-semibold flex items-center gap-2 hover:gap-3 transition-all cursor-pointer">
                Learn more <span>&rarr;</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      <div 
        className="mt-24 bg-[#FF385C] rounded-3xl p-10 md:p-16 text-center text-white animate-fade-in shadow-xl shadow-[#FF385C]/20"
      >
        <h2 className="text-3xl font-bold mb-4">Need help deciding?</h2>
        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
          Book a free 15-minute discovery call with our education experts to understand which services are right for you.
        </p>
        <a href="mailto:support@collegehunt.com?subject=Free Consultation" className="inline-block bg-white text-[#FF385C] px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all">
          Book Free Consultation
        </a>
      </div>
    </div>
  );
}
