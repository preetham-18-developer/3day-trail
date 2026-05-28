"use client";

import React, { useState } from 'react';

import { BookOpen, Clock, Calendar, ArrowRight, X } from 'lucide-react';

// Detailed Exam Data
const EXAMS_DATA = [
  {
    id: 'jee-main',
    title: 'JEE Main',
    tag: 'Engineering',
    mode: 'Online',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
    description: 'Joint Entrance Examination – Main (JEE Main) is an Indian standardized computer-based test for admission to various technical undergraduate programs in engineering, architecture, and planning across India.',
    eligibility: '10+2 with Physics, Chemistry, Mathematics',
    targetedCourses: ['B.Tech Computer Science', 'B.Tech Mechanical', 'B.Arch', 'B.E. Electronics'],
    topColleges: ['NIT Trichy', 'NIT Surathkal', 'DTU Delhi', 'IIIT Hyderabad']
  },
  {
    id: 'neet',
    title: 'NEET UG',
    tag: 'Medical',
    mode: 'Offline',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    description: 'The National Eligibility cum Entrance Test (Undergraduate) or NEET (UG) is an all India pre-medical entrance test for students who wish to pursue undergraduate medical (MBBS), dental (BDS) and AYUSH (BAMS, BUMS, BHMS, etc.) courses.',
    eligibility: '10+2 with Physics, Chemistry, Biology/Biotechnology',
    targetedCourses: ['MBBS', 'BDS', 'BAMS', 'BHMS', 'B.Sc Nursing'],
    topColleges: ['AIIMS New Delhi', 'CMC Vellore', 'AFMC Pune', 'JIPMER Pondicherry']
  },
  {
    id: 'cat',
    title: 'CAT',
    tag: 'Management',
    mode: 'Online',
    color: 'text-[#FF385C]',
    bgColor: 'bg-red-50',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    description: 'The Common Admission Test (CAT) is a computer-based test for admission in a graduate management program. The test consists of three sections: Verbal Ability and Reading Comprehension, Data Interpretation and Logical Reasoning and Quantitative Ability.',
    eligibility: 'Bachelor\'s Degree with at least 50% marks',
    targetedCourses: ['MBA', 'PGDM', 'Executive MBA'],
    topColleges: ['IIM Ahmedabad', 'IIM Bangalore', 'IIM Calcutta', 'FMS Delhi']
  },
  {
    id: 'clat',
    title: 'CLAT',
    tag: 'Law',
    mode: 'Offline',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&q=80',
    description: 'Common Law Admission Test (CLAT) is a centralized national level entrance test for admissions to twenty two National Law Universities (NLU) in India.',
    eligibility: '10+2 or equivalent examination',
    targetedCourses: ['BA LLB', 'BBA LLB', 'B.Com LLB', 'B.Sc LLB'],
    topColleges: ['NLSIU Bangalore', 'NLU Delhi', 'NALSAR Hyderabad', 'WBNUJS Kolkata']
  },
  {
    id: 'cuet',
    title: 'CUET',
    tag: 'University',
    mode: 'Online',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80',
    description: 'Common University Entrance Test (CUET) is an all-India test being organized by National Testing Agency for admission to various Undergraduate, Integrated, Postgraduate, Diploma, Certification courses and Research Programmes in 45 Central Universities of India.',
    eligibility: '10+2 from a recognized board',
    targetedCourses: ['BA Hons', 'B.Sc Hons', 'B.Com Hons', 'BBA'],
    topColleges: ['Delhi University', 'Banaras Hindu University', 'JNU', 'Jamia Millia Islamia']
  }
];

export default function ExamsPage() {
  const [selectedExam, setSelectedExam] = useState<typeof EXAMS_DATA[0] | null>(null);

  // Prevent background scrolling when modal is open
  React.useEffect(() => {
    if (selectedExam) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedExam]);

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-20 pt-10">
      
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Top Competitive Exams</h1>
        <p className="text-xl text-gray-500 max-w-2xl">Find detailed information about syllabus, eligibility, and the courses you can unlock.</p>
      </div>

      {/* Grid */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXAMS_DATA.map((exam) => (
            <div 
              key={exam.id} 
              onClick={() => setSelectedExam(exam)}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="h-48 overflow-hidden relative">
                <img src={exam.image} alt={exam.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-extrabold tracking-wide uppercase">
                  <span className={exam.color}>{exam.tag}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-2xl font-extrabold text-gray-900">{exam.title}</h3>
                  <span className="text-sm font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">{exam.mode}</span>
                </div>
                <p className="text-gray-500 text-sm line-clamp-2 mt-2">{exam.description}</p>
                
                <div className="mt-6 flex items-center text-[#FF385C] font-bold text-sm">
                  View full details <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal overlay */}
      {selectedExam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div 
            onClick={() => setSelectedExam(null)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
          />
          
          <div 
            className="bg-white rounded-[32px] w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl animate-fade-in"
          >
              {/* Close button */}
              <button 
                onClick={() => setSelectedExam(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center z-20 backdrop-blur-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Banner */}
              <div className="h-64 sm:h-80 relative overflow-hidden">
                <img src={selectedExam.image} alt={selectedExam.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10">
                  <div className={`inline-block px-3 py-1 bg-white rounded-full text-xs font-extrabold uppercase tracking-wide mb-3 ${selectedExam.color}`}>
                    {selectedExam.tag}
                  </div>
                  <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">{selectedExam.title}</h2>
                </div>
              </div>

              {/* Modal Content Grid */}
              <div className="p-6 sm:p-10 flex flex-col md:flex-row gap-10">
                
                {/* Left Col */}
                <div className="flex-1 space-y-8">
                  <div>
                    <h3 className="text-xl font-extrabold text-gray-900 mb-3">About the Exam</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedExam.description}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-extrabold text-gray-900 mb-3 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-[#FF385C]" /> What You Will Learn / Courses
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">Clearing this exam unlocks admission to the following degree programs:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedExam.targetedCourses.map((course, i) => (
                        <span key={i} className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-gray-700">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-extrabold text-gray-900 mb-3">Top Accepting Colleges</h3>
                    <div className="space-y-3">
                      {selectedExam.topColleges.map((college, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-gray-200 bg-white shadow-sm">
                          <div className={`w-8 h-8 rounded-full ${selectedExam.bgColor} flex items-center justify-center text-xs font-bold ${selectedExam.color}`}>
                            {i + 1}
                          </div>
                          <span className="font-bold text-gray-800">{college}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Col Sticky Action Card */}
                <div className="w-full md:w-80 shrink-0">
                  <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 sticky top-6">
                    <h4 className="font-extrabold text-gray-900 mb-4 text-lg">Exam Highlights</h4>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex gap-3">
                        <Clock className="w-5 h-5 text-gray-400 shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-gray-500 uppercase">Mode</div>
                          <div className="font-bold text-gray-900">{selectedExam.mode}</div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Calendar className="w-5 h-5 text-gray-400 shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-gray-500 uppercase">Eligibility</div>
                          <div className="font-bold text-gray-900 text-sm leading-snug">{selectedExam.eligibility}</div>
                        </div>
                      </div>
                    </div>

                    <a 
                      href={`https://www.google.com/search?q=${encodeURIComponent(selectedExam.title + ' official syllabus')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center w-full bg-[#FF385C] text-white font-bold py-4 rounded-2xl hover:bg-[#E50027] transition-colors shadow-lg shadow-red-500/20 mb-3"
                    >
                      View Syllabus
                    </a>
                  </div>
                </div>

              </div>
          </div>
        </div>
      )}
    </div>
  );
}
