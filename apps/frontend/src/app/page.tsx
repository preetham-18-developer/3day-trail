"use client";

import React, { useState } from 'react';
import { Search, Bot, Settings, Stethoscope, BarChart2, Scale, PenTool, Briefcase, Microscope, MoreHorizontal, ArrowRight, ChevronLeft, ChevronRight, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CollegeCard from '@/components/CollegeCard';
import SectionGrid from '@/components/SectionGrid';
import collegesData from '@/data/colleges.json';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push('/search');
    }
  };

  return (
    <main className="min-h-screen bg-[#F9FAFB] font-sans pb-20">
      
      {/* 1. Premium Light Theme Hero Section */}
      <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FFF5F6] via-white to-white overflow-hidden">
        
        {/* Subtle Background Pattern (Static for performance) */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNGRjM4NUMiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="max-w-[1400px] mx-auto w-full relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
            
            {/* Left Content */}
            <div className="w-full lg:w-3/5 relative z-20">


              <h1 
                className="text-5xl md:text-[72px] font-extrabold text-gray-900 leading-[1.08] mb-6 tracking-tight animate-fade-in"
              >
                Discover your <br/>
                <span className="text-[#FF385C]">
                  perfect college.
                </span>
              </h1>
              
              <p 
                className="text-gray-600 text-xl mb-10 font-medium max-w-2xl leading-relaxed animate-fade-in"
              >
                The intelligent platform to explore top universities, compare real placement data, and predict your admission chances.
              </p>

              {/* Premium Search Bar */}
              <div 
                className="bg-white rounded-3xl p-2 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 max-w-2xl animate-fade-in"
              >
                <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center gap-2">
                  <div className="flex-1 flex items-center gap-3 px-4 py-3 w-full rounded-2xl bg-gray-50 border border-transparent focus-within:border-[#FF385C]/30 focus-within:bg-white transition-all">
                    <Search className="w-5 h-5 text-gray-400" />
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search colleges, courses, or exams..." 
                      className="w-full bg-transparent border-none outline-none text-gray-900 placeholder:text-gray-500 font-medium text-[15px]"
                    />
                  </div>
                  
                  <button type="submit" className="w-full md:w-auto bg-[#FF385C] text-white px-8 py-4 rounded-2xl font-extrabold hover:bg-[#E50027] transition-colors shadow-md shadow-[#FF385C]/20 flex items-center justify-center gap-2 shrink-0">
                    Explore Now <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
              
              {/* Stat Counters */}
              <div 
                className="flex items-center gap-8 md:gap-16 mt-12 pt-8 border-t border-gray-100 animate-fade-in"
              >
                <div>
                  <div className="text-3xl font-extrabold text-gray-900 mb-1">10k+</div>
                  <div className="text-sm text-gray-500 font-bold uppercase tracking-wider">Colleges</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-gray-900 mb-1">2M+</div>
                  <div className="text-sm text-gray-500 font-bold uppercase tracking-wider">Students</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-[#FF385C] mb-1">98%</div>
                  <div className="text-sm text-gray-500 font-bold uppercase tracking-wider">Accuracy</div>
                </div>
              </div>
            </div>

            {/* Right Side Cards (Static positioning to prevent overlapping) */}
            <div className="w-full lg:w-2/5 flex flex-col gap-6 relative z-10 mt-10 lg:mt-0">
              
              {/* Main AI Card */}
              <div 
                className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden animate-fade-in"
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FFF0F2] rounded-full blur-3xl opacity-60"></div>
                
                <div className="w-14 h-14 bg-[#FFF0F2] rounded-2xl mb-6 flex items-center justify-center border border-red-100 relative z-10">
                  <Bot className="w-7 h-7 text-[#FF385C]" />
                </div>
                <h3 className="text-2xl font-extrabold text-gray-900 mb-3 leading-tight relative z-10">
                  AI Prediction Engine
                </h3>
                <p className="text-gray-500 text-[15px] mb-6 leading-relaxed font-medium relative z-10">
                  Input your scores and let our neural network predict your admission probabilities with high accuracy.
                </p>
                <Link href="/predictor" className="w-full bg-[#FF385C] text-white py-3.5 rounded-xl font-bold hover:bg-[#E50027] transition-colors text-sm flex items-center justify-center shadow-lg shadow-red-500/20 relative z-10">
                  Try Predictor
                </Link>
              </div>



            </div>
            
          </div>
        </div>
      </section>

      {/* 2. Browse by Category */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto text-center">
        <h4 className="text-[#FF385C] text-sm font-bold tracking-[0.2em] mb-4 uppercase">Explore</h4>
        <h2 className="text-[36px] font-extrabold text-gray-900 mb-4 tracking-tight">Browse by Category</h2>
        <p className="text-gray-500 text-lg mb-14 font-medium">Find the information you need from trusted sources</p>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-5">
          {[
            { icon: Settings, label: "Engineering\nColleges", color: "text-purple-500 bg-purple-50", link: "/engineering" },
            { icon: Stethoscope, label: "Medical\nColleges", color: "text-blue-500 bg-blue-50", link: "/medical" },
            { icon: BarChart2, label: "Management\nColleges", color: "text-green-600 bg-green-50", link: "/commerce" },
            { icon: Scale, label: "Law\nColleges", color: "text-yellow-600 bg-yellow-50", link: "/law" },
            { icon: PenTool, label: "Design\nColleges", color: "text-orange-500 bg-orange-50", link: "/design" },
            { icon: Briefcase, label: "Commerce\nColleges", color: "text-blue-600 bg-blue-50", link: "/commerce" },
            { icon: Microscope, label: "Science\nColleges", color: "text-indigo-500 bg-indigo-50", link: "/science" },
            { icon: MoreHorizontal, label: "More\nCategories", color: "text-gray-500 bg-gray-100", link: "/courses" }
          ].map((cat, i) => (
            <Link href={cat.link} key={i} className="bg-white p-6 rounded-[24px] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgb(0,0,0,0.08)] transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-center group min-h-[160px]">
              <div className={`w-14 h-14 rounded-[16px] mb-4 flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform duration-300`}>
                <cat.icon className="w-7 h-7" />
              </div>
              <span className="font-extrabold text-gray-800 text-[13px] leading-[1.3] whitespace-pre-line tracking-tight">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 2.5 Featured Colleges */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <SectionGrid title="Top Recommended Colleges">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {collegesData.filter(c => c.isTopRated).slice(0, 6).map((college: any) => (
            <CollegeCard 
              key={college.id}
              image={college.image}
              title={college.name}
              location={college.location}
              fee={college.fee + " (Total Fees)"}
              rating={college.rating}
              isTopRated={college.isTopRated}
            />
          ))}
        </SectionGrid>
      </section>

      {/* 3. MBA Information Cards */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "MBA EXAMS", desc: "50 + MBA exams. Do you know enough about them?\n\nKnow important dates, preparation tips, syllabus and more", icon: "📝", link: "/exams" },
            { title: "MBA RANKINGS", desc: "Curious to know the top MBA colleges?\n\nCheck out latest college rankings from trusted sources", icon: "⭐", link: "/commerce" },
            { title: "IIM CALL PREDICTOR", desc: "IIMs consider a lot more than just the CAT score\n\nFind your eligibility and chances of getting an IIM call", icon: "🎯", link: "/predictor" },
            { title: "FIND MBA COLLEGES", desc: "Want to find the right MBA college for you?\n\nFind colleges based on location, fees, specialization and more", icon: "🏢", link: "/commerce" },
            { title: "ASK CURRENT STUDENT", desc: "Have college specific questions?\n\nGet answers from our AI Chatbot trained on student data.", icon: "💬", link: "/services" },
            { title: "ROI CALCULATOR", desc: "Wondering about your career journey post-MBA?\n\nCheck out our ROI calculator and predict your earnings", icon: "💰", link: "/roi-calculator" },
            { title: "COMPARE COLLEGES", desc: "You always have options. Did you choose the right one?\n\nCompare colleges based on salary, rank, fees, infrastructure and more", icon: "⚖️", link: "/compare" }
          ].map((card, i) => (
            <Link href={card.link} key={i} className="bg-white p-8 rounded-[32px] shadow-[0_4px_20px_rgb(0,0,0,0.02)] border border-gray-100 hover:border-red-200 transition-colors group cursor-pointer relative min-h-[300px] flex flex-col">
              <div className="w-12 h-12 bg-[#FFF0F2] rounded-full flex items-center justify-center text-[#FF385C] mb-6 text-2xl border border-red-100">
                {card.icon}
              </div>
              <h3 className="font-extrabold text-[14px] text-gray-900 mb-4 tracking-wide">{card.title}</h3>
              <p className="text-gray-500 text-[14.5px] leading-[1.6] flex-1 whitespace-pre-line font-medium">{card.desc}</p>
              <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-[#FF385C] group-hover:border-[#FF385C] group-hover:bg-[#FF385C] group-hover:text-white transition-all duration-300">
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Rankings Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto bg-gray-50 mt-12 mb-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <div className="text-3xl mb-3">🏆</div>
            <h2 className="text-[32px] font-extrabold text-gray-900 mb-2 tracking-tight">Rankings</h2>
            <p className="text-gray-500 text-[15px] font-medium leading-relaxed">1500 Colleges Ranked based on transparent,<br/>accurate, government-approved, student-friendly data</p>
          </div>
          <div className="flex gap-3">
            <button className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-400 shadow-sm transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-800 shadow-sm transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          {[
            { img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80", title: "Top Engineering", icon: Settings, color: "text-purple-600", link: "/engineering" },
            { img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80", title: "Top MBA", icon: Briefcase, color: "text-red-600", link: "/commerce" },
            { img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80", title: "Top Medical", icon: Stethoscope, color: "text-blue-600", link: "/medical" },
            { img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&q=80", title: "Top Law", icon: Scale, color: "text-yellow-600", link: "/law" },
            { img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80", title: "Top Universities", icon: GraduationCap, color: "text-indigo-600", link: "/science" }
          ].map((item, i) => (
            <Link href={item.link} key={i} className="min-w-[280px] w-[280px] cursor-pointer group">
              <div className="relative h-[170px] rounded-2xl overflow-hidden mb-4 shadow-sm">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300" />
                <div className={`absolute bottom-3 left-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md ${item.color}`}>
                  <item.icon className="w-4 h-4" />
                </div>
              </div>
              <h3 className="font-extrabold text-[15px] text-gray-900">{item.title}</h3>
              <p className="text-[13px] text-gray-500 mt-1 mb-2 font-medium">Colleges in India</p>
              <ArrowRight className="w-4 h-4 text-[#FF385C] group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Top Exams Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-[32px] font-extrabold text-gray-900 tracking-tight">Top Exams</h2>
          <div className="flex gap-3">
            <button className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-400 shadow-sm transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="w-11 h-11 rounded-full bg-white border border-[#FF385C] flex items-center justify-center hover:bg-red-50 text-[#FF385C] shadow-sm transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          {[
            { img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80", title: "JEE Main", tag: "Online Exam", color: "text-[#FF385C]" },
            { img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80", title: "JEE Advanced", tag: "Online Exam", color: "text-[#FF385C]" },
            { img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80", title: "CUET", tag: "Offline Exam", color: "text-green-700" },
            { img: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&q=80", title: "TS EAMCET", tag: "Online Exam", color: "text-[#FF385C]" },
            { img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80", title: "NEET", tag: "Offline Exam", color: "text-green-700" }
          ].map((exam, i) => (
            <Link href="/exams" key={i} className="min-w-[280px] w-[280px] bg-white border border-gray-100 rounded-[24px] overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] cursor-pointer group hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
              <div className="relative h-[170px] overflow-hidden bg-gray-100">
                <img src={exam.img} alt={exam.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-[11px] font-extrabold tracking-wide uppercase shadow-sm">
                  <span className={exam.color}>{exam.tag}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-extrabold text-[17px] text-gray-900 group-hover:text-[#FF385C] transition-colors">{exam.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}
