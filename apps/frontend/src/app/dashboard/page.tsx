"use client";

import React from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { 
  TrendingUp, 
  Bookmark, 
  Eye, 
  Target,
  ArrowRight,
  Briefcase,
  Award,
  GitCompare
} from 'lucide-react';
import Link from 'next/link';
import collegesData from '@/data/colleges.json';
import { motion } from 'framer-motion';

export default function DashboardOverview() {
  const { profile } = useAuthStore();

  const savedCount = profile?.saved_colleges?.length || 0;
  const targetDegree = profile?.target_degree || 'B.Tech';

  const stats = [
    { label: 'Saved Colleges', value: savedCount, icon: Bookmark, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Compared', value: 3, icon: GitCompare, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Recently Viewed', value: 12, icon: Eye, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Admit Probability', value: 'High', icon: TrendingUp, color: 'text-[#FF385C]', bg: 'bg-[#FFF0F2]' },
  ];

  const recentColleges = collegesData.slice(0, 3);
  const recommendedColleges = collegesData.slice(3, 5); // Just mockup

  return (
    <div className="space-y-8 pb-12">
      
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Welcome back, {profile?.first_name || 'Student'}!
          </h1>
          <p className="text-gray-500 font-medium mt-2 text-lg">
            Here is your personalized {targetDegree} admission hub.
          </p>
        </div>
        <Link href="/dashboard/settings" className="shrink-0 bg-white border border-gray-200 text-gray-700 hover:text-gray-900 hover:border-gray-300 font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm">
          Edit Profile
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={idx} 
            className="bg-white p-5 rounded-3xl border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow group"
          >
            <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className="text-3xl font-black text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm font-bold text-gray-500">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Main Activity */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Personalized Recommendations */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-xl font-extrabold text-gray-900">Personalized Suggestions</h2>
              <Link href="/dashboard/insights" className="text-sm font-bold text-[#FF385C] hover:text-[#E50027] flex items-center gap-1">
                View All Matches <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            {/* Recommendation Highlight */}
            <div className="p-6 sm:p-8">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 sm:p-8 border border-indigo-100/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <Target className="w-32 h-32 text-indigo-600" />
                </div>
                <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-start">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0 text-3xl">
                    🤖
                  </div>
                  <div>
                    <h3 className="font-black text-indigo-900 text-xl mb-2">AI Match Found!</h3>
                    <p className="text-indigo-800/80 text-sm sm:text-base leading-relaxed mb-6 max-w-lg font-medium">
                      Based on your {profile?.skills?.length ? `skills in ${profile.skills[0]}` : `interest in ${targetDegree}`} and academic profile, we found <strong>3 new colleges</strong> with an 85%+ admission probability.
                    </p>
                    <Link href="/dashboard/insights" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-600/20 active:scale-95">
                      Review Your Matches
                    </Link>
                  </div>
                </div>
              </div>

              {/* Recommended Colleges List */}
              <div className="mt-8 space-y-4">
                <h3 className="font-bold text-gray-400 uppercase tracking-wider text-xs">Top Picks For You</h3>
                {recommendedColleges.map((college) => (
                  <Link key={college.id} href={`/compare?college=${college.id}`} className="group flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:border-[#FF385C]/30 hover:shadow-md transition-all bg-white">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                        <img src={college.image} alt={college.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{college.name}</h4>
                        <p className="text-xs text-gray-500 font-medium">{college.location}</p>
                      </div>
                    </div>
                    <div className="text-right hidden sm:block">
                      <div className="text-sm font-black text-green-600">89% Match</div>
                      <div className="text-xs text-gray-400 font-medium">Safe Zone</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Jump Back In (Recently Viewed & Saved) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)] p-6 sm:p-8">
              <h2 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
                <Eye className="w-5 h-5 text-purple-500" /> Recently Viewed
              </h2>
              <div className="space-y-4">
                {recentColleges.slice(0, 2).map((college) => (
                  <Link key={college.id} href={`/compare?college=${college.id}`} className="group flex items-center gap-4 hover:bg-gray-50 p-2 rounded-xl transition-colors -mx-2">
                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
                      <img src={college.image} alt={college.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="overflow-hidden">
                      <h3 className="font-bold text-gray-900 truncate">{college.name}</h3>
                      <p className="text-xs text-gray-500 truncate mt-0.5">{college.location}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)] p-6 sm:p-8">
              <h2 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-blue-500" /> Quick Access
              </h2>
              <div className="space-y-4">
                <Link href="/dashboard/saved" className="flex items-center justify-between p-4 bg-blue-50/50 hover:bg-blue-50 rounded-2xl border border-blue-100 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                      <Bookmark className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-gray-900">Saved Colleges</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-blue-400 group-hover:text-blue-600 transition-colors" />
                </Link>
                <Link href="/compare" className="flex items-center justify-between p-4 bg-orange-50/50 hover:bg-orange-50 rounded-2xl border border-orange-100 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-orange-600 shadow-sm">
                      <GitCompare className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-gray-900">Comparison Tool</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-orange-400 group-hover:text-orange-600 transition-colors" />
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column - Sidebar Widgets */}
        <div className="space-y-8">
          
          {/* Profile & Skill Progress */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-[0_2px_15px_rgba(0,0,0,0.02)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -z-10"></div>
            <h3 className="font-extrabold text-gray-900 mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-green-500" /> Skill Progress
            </h3>
            
            <div className="mb-2 flex justify-between text-sm font-bold">
              <span className="text-gray-700">Profile Strength</span>
              <span className="text-green-600">85%</span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-8 shadow-inner">
              <div className="w-[85%] h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"></div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Career Interests</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-bold rounded-lg border border-gray-200">
                  {targetDegree}
                </span>
                {profile?.specialization && (
                  <span className="px-3 py-1.5 bg-[#FFF0F2] text-[#FF385C] text-xs font-bold rounded-lg border border-[#FF385C]/20">
                    {profile.specialization}
                  </span>
                )}
                {profile?.skills?.slice(0, 3).map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-gray-50 text-gray-600 text-xs font-bold rounded-lg border border-gray-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <Link href="/dashboard/settings" className="mt-8 block text-center w-full py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-bold rounded-xl transition-colors text-sm">
              Update Skills
            </Link>
          </div>

          {/* Application Tracking */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
            <h3 className="font-extrabold text-gray-900 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-orange-500" /> Track
              </div>
              <span className="bg-orange-50 text-orange-600 text-xs font-bold px-2.5 py-1 rounded-md border border-orange-100">
                1 Active
              </span>
            </h3>

            <div className="relative pl-4 border-l-2 border-gray-100 space-y-6">
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white"></div>
                <h4 className="font-bold text-gray-900 text-sm">Application Started</h4>
                <p className="text-xs text-gray-500 font-medium mt-1">VIT Vellore • 2 days ago</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-orange-500 border-2 border-white ring-4 ring-orange-50"></div>
                <h4 className="font-bold text-gray-900 text-sm">Document Upload</h4>
                <p className="text-xs text-orange-600 font-bold mt-1">Pending • Due Tomorrow</p>
              </div>
              <div className="relative opacity-50">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-gray-300 border-2 border-white"></div>
                <h4 className="font-bold text-gray-900 text-sm">Fee Payment</h4>
                <p className="text-xs text-gray-500 font-medium mt-1">Step 3</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Minimal missing icon wrapper to avoid huge import lists
function ChevronRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
  );
}
