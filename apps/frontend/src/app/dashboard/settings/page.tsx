"use client";

import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { User, Mail, Save, BookOpen, Bell, Camera, MapPin, Edit3, Phone, Award } from 'lucide-react';

export default function SettingsPage() {
  const { profile, setProfile } = useAuthStore();
  const [isSaving, setIsSaving] = useState(false);
  
  // Local state for all fields
  const [formData, setFormData] = useState({
    first_name: profile?.first_name || '',
    last_name: profile?.last_name || '',
    phone: profile?.phone || '',
    gender: profile?.gender || '',
    location: profile?.location || '',
    bio: profile?.bio || '',
    current_level: profile?.current_level || 'undergrad',
    target_degree: profile?.target_degree || 'B.Tech',
    specialization: profile?.specialization || '',
    college_name: profile?.college_name || '',
    graduation_year: profile?.graduation_year || '',
    cgpa: profile?.cgpa || '',
    skills: profile?.skills || []
  });

  useEffect(() => {
    if (profile) {
      setFormData(prev => ({
        ...prev,
        ...profile
      }));
    }
  }, [profile]);

  // Dynamic Skills based on degree
  const btechSkills = ["Java", "Python", "DSA", "Web Development", "React", "AI/ML", "Cloud Computing", "C++", "JavaScript", "SQL"];
  const mbaSkills = ["Marketing", "Finance", "HR", "Analytics", "Communication", "Leadership", "Business Strategy", "Operations"];
  
  const suggestedSkills = formData.target_degree?.includes('B.Tech') || formData.target_degree?.includes('B.E.') || formData.target_degree?.includes('BCA')
    ? btechSkills 
    : formData.target_degree?.includes('MBA') || formData.target_degree?.includes('BBA')
    ? mbaSkills
    : ["Communication", "Problem Solving", "Leadership", "Teamwork"];

  const handleUpdate = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleSkill = (skill: string) => {
    setFormData(prev => {
      const skills = prev.skills || [];
      if (skills.includes(skill)) {
        return { ...prev, skills: skills.filter(s => s !== skill) };
      } else {
        return { ...prev, skills: [...skills, skill] };
      }
    });
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      // Simulate API call and update global state
      if (profile) {
        setProfile({
          ...profile,
          ...formData
        });
      }
      setIsSaving(false);
    }, 800);
  };

  return (
    <div className="max-w-4xl space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">
          Profile & Settings
        </h1>
        <p className="text-gray-500 font-medium mt-2">
          Personalize your dashboard and optimize your college recommendations.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        
        {/* Profile Picture Section */}
        <div className="p-6 sm:p-8 border-b border-gray-50 flex flex-col sm:flex-row items-center sm:items-start gap-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 -z-10"></div>
          
          <div className="relative mt-8 sm:mt-10 group cursor-pointer">
            <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-[#FF385C] to-orange-400 flex items-center justify-center text-white font-bold text-4xl shadow-xl overflow-hidden shrink-0 border-4 border-white">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                profile?.first_name?.charAt(0).toUpperCase() || 'U'
              )}
            </div>
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <div className="mt-8 sm:mt-14 text-center sm:text-left flex-1">
            <h3 className="font-black text-2xl text-gray-900 mb-1">{formData.first_name} {formData.last_name}</h3>
            <p className="text-sm font-bold text-[#FF385C] uppercase tracking-wider mb-4">{formData.target_degree} Aspirant</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3">
              <button className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl text-sm transition-colors">
                Upload New Photo
              </button>
              <button className="px-4 py-2 bg-gray-50 text-gray-600 hover:text-red-600 font-bold rounded-xl text-sm hover:bg-red-50 transition-colors">
                Remove
              </button>
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="p-6 sm:p-8 space-y-6">
          <h3 className="font-extrabold text-gray-900 flex items-center gap-2 text-lg">
            <User className="w-5 h-5 text-[#FF385C]" /> Basic Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">First Name</label>
              <input 
                type="text" 
                value={formData.first_name}
                onChange={(e) => handleUpdate('first_name', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF385C] focus:ring-1 focus:ring-[#FF385C] outline-none transition-all text-sm font-medium bg-gray-50 focus:bg-white" 
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">Last Name</label>
              <input 
                type="text" 
                value={formData.last_name}
                onChange={(e) => handleUpdate('last_name', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF385C] focus:ring-1 focus:ring-[#FF385C] outline-none transition-all text-sm font-medium bg-gray-50 focus:bg-white" 
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="email" 
                  disabled
                  value={profile?.email || ''}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-500 outline-none cursor-not-allowed text-sm font-medium" 
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">Mobile Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => handleUpdate('phone', e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF385C] focus:ring-1 focus:ring-[#FF385C] outline-none transition-all text-sm font-medium bg-gray-50 focus:bg-white" 
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">Gender</label>
              <select 
                value={formData.gender}
                onChange={(e) => handleUpdate('gender', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF385C] focus:ring-1 focus:ring-[#FF385C] outline-none transition-all text-sm font-medium appearance-none bg-gray-50 focus:bg-white"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">City / State</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  value={formData.location}
                  onChange={(e) => handleUpdate('location', e.target.value)}
                  placeholder="Mumbai, Maharashtra"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF385C] focus:ring-1 focus:ring-[#FF385C] outline-none transition-all text-sm font-medium bg-gray-50 focus:bg-white" 
                />
              </div>
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-sm font-bold text-gray-700">Bio / About</label>
              <div className="relative">
                <Edit3 className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                <textarea 
                  value={formData.bio}
                  onChange={(e) => handleUpdate('bio', e.target.value)}
                  placeholder="Write a short bio about your academic interests and career goals..."
                  rows={3}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF385C] focus:ring-1 focus:ring-[#FF385C] outline-none transition-all text-sm font-medium bg-gray-50 focus:bg-white resize-none" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Academic Preferences */}
        <div className="p-6 sm:p-8 border-t border-gray-50 space-y-6">
          <h3 className="font-extrabold text-gray-900 flex items-center gap-2 text-lg">
            <BookOpen className="w-5 h-5 text-[#FF385C]" /> Academic Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">Currently Studying</label>
              <select 
                value={formData.current_level}
                onChange={(e) => handleUpdate('current_level', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF385C] focus:ring-1 focus:ring-[#FF385C] outline-none transition-all text-sm font-medium appearance-none bg-gray-50 focus:bg-white"
              >
                <option value="12th">Class 12th</option>
                <option value="undergrad">Undergraduate</option>
                <option value="working">Working Professional</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">Preferred Degree</label>
              <select 
                value={formData.target_degree}
                onChange={(e) => handleUpdate('target_degree', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF385C] focus:ring-1 focus:ring-[#FF385C] outline-none transition-all text-sm font-medium appearance-none bg-gray-50 focus:bg-white"
              >
                <option value="B.Tech">B.Tech / B.E.</option>
                <option value="MBBS">MBBS</option>
                <option value="BBA">BBA / BMS</option>
                <option value="MBA">MBA / PGDM</option>
                <option value="BCA">BCA / MCA</option>
                <option value="Design">B.Des / M.Des</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">Specialization Interest</label>
              <input 
                type="text" 
                value={formData.specialization}
                onChange={(e) => handleUpdate('specialization', e.target.value)}
                placeholder="e.g. Computer Science, Finance"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF385C] focus:ring-1 focus:ring-[#FF385C] outline-none transition-all text-sm font-medium bg-gray-50 focus:bg-white" 
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">Current College / School</label>
              <input 
                type="text" 
                value={formData.college_name}
                onChange={(e) => handleUpdate('college_name', e.target.value)}
                placeholder="Name of institution"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF385C] focus:ring-1 focus:ring-[#FF385C] outline-none transition-all text-sm font-medium bg-gray-50 focus:bg-white" 
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">Graduation Year</label>
              <input 
                type="number" 
                value={formData.graduation_year}
                onChange={(e) => handleUpdate('graduation_year', e.target.value)}
                placeholder="YYYY"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF385C] focus:ring-1 focus:ring-[#FF385C] outline-none transition-all text-sm font-medium bg-gray-50 focus:bg-white" 
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">CGPA / Percentage</label>
              <input 
                type="text" 
                value={formData.cgpa}
                onChange={(e) => handleUpdate('cgpa', e.target.value)}
                placeholder="e.g. 8.5 or 90%"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF385C] focus:ring-1 focus:ring-[#FF385C] outline-none transition-all text-sm font-medium bg-gray-50 focus:bg-white" 
              />
            </div>
          </div>
        </div>

        {/* Dynamic Skills Section */}
        <div className="p-6 sm:p-8 border-t border-gray-50 space-y-6 bg-gray-50/30">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-gray-900 flex items-center gap-2 text-lg">
              <Award className="w-5 h-5 text-[#FF385C]" /> Skills & Competencies
            </h3>
            <span className="text-xs font-bold bg-white border border-gray-200 px-3 py-1 rounded-full text-gray-500 shadow-sm">
              Tailored for {formData.target_degree}
            </span>
          </div>
          <p className="text-gray-500 text-sm">Select the skills you possess. This helps our AI match you with the best specialized programs.</p>
          
          <div className="flex flex-wrap gap-3 mt-4">
            {suggestedSkills.map((skill) => {
              const isSelected = formData.skills?.includes(skill);
              return (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all active:scale-95 ${
                    isSelected 
                      ? 'bg-[#FF385C] border-[#FF385C] text-white shadow-md shadow-[#FF385C]/20' 
                      : 'bg-white border-gray-200 text-gray-600 hover:border-[#FF385C]/50 hover:bg-[#FFF0F2]'
                  }`}
                >
                  {skill}
                </button>
              );
            })}
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="p-6 sm:p-8 border-t border-gray-50 space-y-6">
          <h3 className="font-extrabold text-gray-900 flex items-center gap-2 text-lg">
            <Bell className="w-5 h-5 text-[#FF385C]" /> Notifications
          </h3>
          
          <div className="space-y-4 max-w-2xl">
            <label className="flex items-center justify-between p-5 border border-gray-100 rounded-2xl hover:bg-gray-50 cursor-pointer transition-colors shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <div>
                <div className="font-bold text-gray-900">Application Deadlines</div>
                <div className="text-sm text-gray-500 font-medium mt-1">Get alerted 7 days before target college deadlines.</div>
              </div>
              <div className="relative">
                <input type="checkbox" defaultChecked className="peer sr-only" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FF385C]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF385C]"></div>
              </div>
            </label>
            <label className="flex items-center justify-between p-5 border border-gray-100 rounded-2xl hover:bg-gray-50 cursor-pointer transition-colors shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <div>
                <div className="font-bold text-gray-900">Admission Probability Updates</div>
                <div className="text-sm text-gray-500 font-medium mt-1">Weekly AI predictions on your target colleges.</div>
              </div>
              <div className="relative">
                <input type="checkbox" defaultChecked className="peer sr-only" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FF385C]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF385C]"></div>
              </div>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 sm:p-8 border-t border-gray-50 bg-gray-50 flex flex-col sm:flex-row justify-end gap-3 sticky bottom-0 z-10">
          <button className="px-6 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-100 transition-colors text-sm w-full sm:w-auto">
            Cancel Changes
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-3 bg-[#FF385C] text-white font-bold rounded-xl hover:bg-[#E50027] transition-all active:scale-[0.98] text-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-[#FF385C]/20 w-full sm:w-auto"
          >
            {isSaving ? (
              <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving Profile...</>
            ) : (
              <><Save className="w-4 h-4" /> Save Profile</>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
