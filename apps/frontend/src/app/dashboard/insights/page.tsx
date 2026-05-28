"use client";

import React from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { Sparkles, TrendingUp, Target, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AIInsightsPage() {
  const { profile } = useAuthStore();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-[#FF385C]" />
          AI Admission Insights
        </h1>
        <p className="text-gray-500 font-medium mt-2 text-lg">
          Personalized predictions based on {profile?.first_name}&apos;s academic profile.
        </p>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-[#FF385C] to-[#E31C5F] rounded-3xl p-6 text-white shadow-lg shadow-[#FF385C]/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <TrendingUp className="w-24 h-24" />
          </div>
          <h3 className="text-white/80 font-bold text-sm uppercase tracking-wider mb-2 relative z-10">Overall Match Score</h3>
          <div className="text-5xl font-black mb-2 relative z-10">84%</div>
          <p className="text-white/90 text-sm font-medium relative z-10">High probability for Tier-2 B.Tech programs.</p>
        </div>
        
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative overflow-hidden group hover:border-[#FF385C]/30 transition-colors">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-gray-500 font-bold text-sm uppercase tracking-wider mb-1">Strongest Metric</h3>
          <div className="text-2xl font-black text-gray-900">Extracurriculars</div>
          <p className="text-gray-500 text-sm mt-2 font-medium">Your leadership roles give you a 15% edge over peers.</p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative overflow-hidden group hover:border-[#FF385C]/30 transition-colors">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-gray-500 font-bold text-sm uppercase tracking-wider mb-1">Area for Improvement</h3>
          <div className="text-2xl font-black text-gray-900">Entrance Scores</div>
          <p className="text-gray-500 text-sm mt-2 font-medium">Target +20 marks in JEE Mains for Tier-1 eligibility.</p>
        </div>
      </div>

      {/* College Match Predictions */}
      <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Target className="w-5 h-5 text-[#FF385C]" />
            Target College Probabilities
          </h2>
        </div>
        
        <div className="divide-y divide-gray-100">
          {[
            { name: "VIT Vellore", program: "B.Tech Computer Science", prob: 92, status: 'Safe' },
            { name: "SRM University, Chennai", program: "B.Tech Information Tech", prob: 88, status: 'Safe' },
            { name: "Manipal Institute of Technology", program: "B.Tech CSE", prob: 65, status: 'Target' },
            { name: "BITS Pilani", program: "B.E. Computer Science", prob: 24, status: 'Reach' },
          ].map((college, i) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
            >
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{college.name}</h3>
                <p className="text-gray-500 font-medium text-sm">{college.program}</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-end">
                  <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md mb-1 ${
                    college.status === 'Safe' ? 'bg-green-100 text-green-700' :
                    college.status === 'Target' ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {college.status}
                  </span>
                  <div className="flex items-center gap-3 w-48">
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          college.prob > 80 ? 'bg-green-500' : 
                          college.prob > 50 ? 'bg-amber-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${college.prob}%` }}
                      />
                    </div>
                    <span className="font-bold text-gray-700 w-10 text-right">{college.prob}%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
