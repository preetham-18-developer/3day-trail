"use client";

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Search, Award, X,
  Cpu, HeartPulse, Briefcase, Palette, Scale, BookOpen, Microscope
} from 'lucide-react';

// Extensive Course Data
const courseCategories = [
  {
    category: "Intermediate (10+2)",
    icon: Microscope,
    courses: [
      {
        id: "mpc",
        name: "MPC (Maths, Physics, Chemistry)",
        description: [
          "The most popular stream for students aiming for Engineering and Technology.",
          "Develops strong analytical, mathematical, and problem-solving skills.",
          "Opens doors to IIT-JEE, BITSAT, and state-level engineering entrance exams.",
          "Core focus on advanced mathematics and physical sciences.",
          "Also allows shifts to commerce or arts streams for graduation if desired."
        ],
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
        topColleges: [
          "Sri Chaitanya Junior College",
          "Narayana Junior College",
          "FIITJEE Junior College"
        ]
      },
      {
        id: "bipc",
        name: "BiPC (Biology, Physics, Chemistry)",
        description: [
          "The primary pathway for students aspiring to become Doctors and Healthcare professionals.",
          "Extensive focus on Botany, Zoology, and human anatomy.",
          "Prepares students for NEET, AIIMS, and JIPMER medical entrance exams.",
          "Leads to careers in MBBS, BDS, Pharmacy, and Agricultural Sciences.",
          "Requires strong memorization and analytical skills."
        ],
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80",
        topColleges: [
          "Aakash Institute / Junior College",
          "Sri Chaitanya Junior College",
          "Allen Career Institute"
        ]
      },
      {
        id: "mec",
        name: "MEC (Maths, Economics, Commerce)",
        description: [
          "A highly sought-after stream bridging Mathematics with Business studies.",
          "Perfect for students aiming for Chartered Accountancy (CA) or Actuarial Sciences.",
          "Core subjects include Accountancy, Economics, and advanced Mathematics.",
          "Leads to premium degrees like B.Com (Hons), BBA, and Economics (Hons).",
          "Highly lucrative for careers in finance, banking, and data analytics."
        ],
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        topColleges: [
          "St. Xavier's College",
          "Mount Carmel College",
          "Delhi Public School (DPS)"
        ]
      },
      {
        id: "cec",
        name: "CEC (Civics, Economics, Commerce)",
        description: [
          "Ideal for students interested in business, law, and civil services.",
          "Focuses on business studies, political science, and economic policies.",
          "Excellent foundation for pursuing CA, CS, Law (BA LLB), and Management.",
          "Less mathematically intensive compared to MEC.",
          "Provides a direct route to UPSC and government administration roles."
        ],
        image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&q=80",
        topColleges: [
          "Loyola College",
          "Christ Junior College",
          "DPS"
        ]
      }
    ]
  },
  {
    category: "Engineering",
    icon: Cpu,
    courses: [
      {
        id: "btech-cse",
        name: "B.Tech Computer Science Engineering",
        description: [
          "Focuses on computation, algorithms, and programming languages.",
          "High demand in tech industries with lucrative placement opportunities.",
          "Core subjects include Data Structures, AI, and Operating Systems.",
          "Offers diverse roles like Software Developer, Data Scientist, and Systems Architect.",
          "Requires strong analytical and mathematical problem-solving skills."
        ],
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
        topColleges: ["IIT Bombay", "IIT Delhi", "BITS Pilani"]
      },
      {
        id: "btech-ece",
        name: "B.Tech Electronics & Communication",
        description: [
          "Covers electronic devices, circuits, communication equipment, and electromagnetics.",
          "Bridges the gap between hardware and software engineering.",
          "Excellent opportunities in telecommunications, IoT, and embedded systems.",
          "Core labs involve working with microprocessors and circuit design.",
          "Provides a foundation for emerging fields like 5G and robotics."
        ],
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
        topColleges: ["IIT Madras", "IIT Kharagpur", "NIT Trichy"]
      }
    ]
  },
  {
    category: "Medical",
    icon: HeartPulse,
    courses: [
      {
        id: "mbbs",
        name: "MBBS (Medicine and Surgery)",
        description: [
          "The most prestigious and rigorous undergraduate medical degree.",
          "Takes 5.5 years to complete, including a 1-year mandatory internship.",
          "Curriculum covers anatomy, biochemistry, pharmacology, and surgery.",
          "Offers a direct pathway to becoming a licensed medical practitioner.",
          "Extremely competitive admission process primarily through NEET-UG."
        ],
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80",
        topColleges: ["AIIMS New Delhi", "PGIMER, Chandigarh", "CMC, Vellore"]
      },
      {
        id: "bds",
        name: "BDS (Dental Surgery)",
        description: [
          "Focuses entirely on dental surgery and oral healthcare.",
          "A 5-year program including a 1-year compulsory rotatory internship.",
          "High potential for private practice and independent clinics.",
          "Involves subjects like orthodontics, oral pathology, and dental anatomy.",
          "Second most preferred medical course after MBBS."
        ],
        image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80",
        topColleges: ["Maulana Azad Dental Sciences", "Manipal College of Dental Sciences", "Govt Dental College, Mumbai"]
      }
    ]
  },
  {
    category: "Business",
    icon: Briefcase,
    courses: [
      {
        id: "bba",
        name: "BBA (Business Administration)",
        description: [
          "Provides a strong foundation in core business disciplines and management.",
          "Ideal stepping stone for pursuing an MBA in the future.",
          "Covers marketing, finance, human resources, and operations.",
          "Emphasizes leadership, communication, and entrepreneurial skills.",
          "Offers early entry into the corporate sector at executive levels."
        ],
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
        topColleges: ["Shaheed Sukhdev (DU)", "NMIMS, Mumbai", "Christ University"]
      },
      {
        id: "bcom-hons",
        name: "B.Com (Honours)",
        description: [
          "A comprehensive program focusing on commerce, accounting, and finance.",
          "Highly preferred by students aiming for CA, CS, or CMA professional courses.",
          "Core subjects include Corporate Accounting, Taxation, and Business Law.",
          "Develops strong quantitative and financial analysis skills.",
          "Excellent placements in auditing, banking, and financial services sectors."
        ],
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
        topColleges: ["SRCC, Delhi", "Hindu College, Delhi", "Loyola College"]
      }
    ]
  },
  {
    category: "Design",
    icon: Palette,
    courses: [
      {
        id: "bdes",
        name: "B.Des (Bachelor of Design)",
        description: [
          "A 4-year program focused on aesthetic and functional design principles.",
          "Specializations include Fashion, Industrial, UI/UX, and Communication Design.",
          "Heavily project-based, emphasizing creativity, portfolio building, and design thinking.",
          "Requires passing specialized entrance exams like UCEED or NID DAT.",
          "Booming demand in tech (Product Design) and lifestyle industries."
        ],
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
        topColleges: ["NID, Ahmedabad", "IIT Bombay (IDC)", "Srishti Institute"]
      }
    ]
  },
  {
    category: "Law",
    icon: Scale,
    courses: [
      {
        id: "ballb",
        name: "BA LLB (Integrated Law)",
        description: [
          "A 5-year integrated program combining Arts subjects with Legal studies.",
          "Saves one academic year compared to pursuing BA and LLB separately.",
          "Core subjects include Constitutional Law, Criminal Law, and Sociology.",
          "Admission primarily through the CLAT (Common Law Admission Test).",
          "Opens doors to litigation, corporate law firms, and judicial services."
        ],
        image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&q=80",
        topColleges: ["NLSIU, Bangalore", "NLU, Delhi", "NALSAR, Hyderabad"]
      }
    ]
  },
  {
    category: "Arts",
    icon: BookOpen,
    courses: [
      {
        id: "ba-eco",
        name: "BA (Hons) Economics",
        description: [
          "Focuses on macro and microeconomics, statistics, and mathematical economics.",
          "A highly rigorous course requiring strong quantitative skills.",
          "Excellent preparation for roles in finance, consulting, and policy-making.",
          "Serves as a strong foundation for a Master's in Economics or MBA.",
          "Top recruiters include global banks, analytics firms, and think tanks."
        ],
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
        topColleges: ["St. Stephen's College", "Delhi School of Economics", "MCC"]
      }
    ]
  }
];

function CoursesContent() {
  const [activeCategory, setActiveCategory] = useState(courseCategories[0].category);
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
    }
  }, [initialQuery]);
  const [selectedCourse, setSelectedCourse] = useState<{ id: string; name: string; description: string[]; image: string; topColleges: string[] } | null>(null);

  const currentCategoryData = courseCategories.find(c => c.category === activeCategory);

  // Filter courses based on search
  const filteredCourses = useMemo(() => {
    if (!searchQuery) return currentCategoryData?.courses || [];
    
    return currentCategoryData?.courses.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()))
    ) || [];
  }, [searchQuery, currentCategoryData]);

  // Prevent background scrolling when modal is open
  React.useEffect(() => {
    if (selectedCourse) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedCourse]);

  return (
    <div className="min-h-screen bg-white">
      
      {/* Header Search Area (Airbnb Style) */}
      <div className="pt-8 pb-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex justify-center">
        <div className="relative w-full max-w-2xl group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-dark" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-12 pr-4 py-4 rounded-full border border-gray-border bg-white shadow-sm hover:shadow-md focus:shadow-md focus:outline-none transition-all text-gray-dark font-medium text-lg placeholder-gray-text"
            placeholder="Search courses, streams, or keywords"
          />
        </div>
      </div>

      {/* Airbnb Style Horizontal Categories */}
      <div className="sticky top-20 z-40 bg-white border-b border-gray-border/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto hide-scrollbar gap-8 lg:gap-12 py-4">
            {courseCategories.map((cat) => {
              const isActive = activeCategory === cat.category;
              return (
                <button
                  key={cat.category}
                  onClick={() => {
                    setActiveCategory(cat.category);
                    setSearchQuery("");
                  }}
                  className={`flex flex-col items-center gap-2 pb-3 border-b-2 transition-all min-w-max ${
                    isActive
                      ? 'border-gray-dark text-gray-dark opacity-100'
                      : 'border-transparent text-gray-text hover:text-gray-dark opacity-70 hover:opacity-100'
                  }`}
                >
                  <cat.icon className="w-6 h-6" />
                  <span className="text-sm font-semibold">{cat.category}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredCourses.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-dark">No exact matches</h3>
            <p className="text-gray-text mt-2 text-lg">Try changing or removing some of your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <div 
                key={course.id}
                onClick={() => setSelectedCourse(course)}
                className="group cursor-pointer flex flex-col h-full animate-fade-in"
              >
                <div className="aspect-[4/3] rounded-2xl bg-gray-light mb-3 overflow-hidden relative border border-gray-border/50 group-hover:shadow-md transition-shadow">
                  <img src={course.image} alt={course.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors"></div>
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-dark border border-gray-border/50">
                    {course.topColleges.length} Top Colleges
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-bold text-gray-dark leading-snug line-clamp-2 group-hover:text-brand transition-colors">
                      {course.name}
                    </h3>
                    <p className="text-sm text-gray-text mt-1 line-clamp-1">
                      {course.description[0]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Course Details Modal (Airbnb Listing Style) */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center sm:p-4">
          <div
            onClick={() => setSelectedCourse(null)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
          />
          <div
            className="relative w-full md:w-[800px] max-h-[90vh] bg-white md:rounded-3xl shadow-2xl overflow-y-auto hide-scrollbar rounded-t-3xl animate-fade-in"
          >
            <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-border p-4 flex justify-between items-center z-10">
                <button 
                  onClick={() => setSelectedCourse(null)}
                  className="p-2 hover:bg-gray-light rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-dark" />
                </button>
                <div className="font-bold text-gray-dark hidden md:block">Course Overview</div>
                <div className="w-9" /> {/* Spacer for centering */}
              </div>

              <div className="p-6 md:p-10 flex flex-col lg:flex-row gap-10">
                
                {/* Left Content */}
                <div className="flex-1">
                  <div className="w-full h-64 rounded-2xl overflow-hidden mb-8 relative border border-gray-border">
                    <img src={selectedCourse.image} alt={selectedCourse.name} className="w-full h-full object-cover" />
                  </div>
                  <h2 className="text-3xl font-extrabold text-gray-dark mb-6 tracking-tight">
                    {selectedCourse.name}
                  </h2>
                  
                  <div className="py-6 border-y border-gray-border mb-8">
                    <h3 className="text-xl font-bold text-gray-dark mb-4">What you&apos;ll learn</h3>
                    <ul className="space-y-4">
                      {selectedCourse.description.map((point: string, idx: number) => (
                        <li key={idx} className="flex gap-4 items-start">
                          <span className="text-brand font-bold mt-0.5">•</span>
                          <span className="text-gray-dark leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-dark mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5 text-brand" /> 
                      Top Recommended Colleges
                    </h3>
                    <div className="grid gap-4">
                      {selectedCourse.topColleges.map((college: string, idx: number) => (
                        <div key={idx} className="p-4 border border-gray-border rounded-xl flex items-center gap-4 hover:shadow-md transition-shadow">
                          <div className="w-10 h-10 bg-gray-light rounded-lg flex items-center justify-center font-bold text-gray-text">
                            {idx + 1}
                          </div>
                          <div className="font-semibold text-gray-dark">{college}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Sticky Booking/Action Card */}
                <div className="w-full lg:w-[300px] shrink-0">
                  <div className="sticky top-24 border border-gray-border rounded-2xl p-6 shadow-xl shadow-black/5 bg-white">
                    <div className="text-2xl font-bold text-gray-dark mb-2">Interested?</div>
                    <p className="text-gray-text text-sm mb-6">
                      Book a free counseling session to discuss your admission strategy for {selectedCourse.name}.
                    </p>
                    <a href="mailto:counseling@collegehunt.com?subject=Inquiry for Course Admission" className="block text-center w-full py-4 bg-brand text-white font-bold rounded-xl hover:bg-brand-dark transition-colors mb-4">
                      Book Free Counseling
                    </a>
                    <a href="/predictor" className="block text-center w-full py-4 bg-white border border-gray-dark text-gray-dark font-bold rounded-xl hover:bg-gray-light transition-colors">
                      View Admission Chances
                    </a>
                    
                    <div className="mt-6 pt-6 border-t border-gray-border text-center text-xs text-gray-text">
                      No payment required for the first discovery call.
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
  );
}

export default function CoursesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading courses...</div>}>
      <CoursesContent />
    </Suspense>
  );
}
