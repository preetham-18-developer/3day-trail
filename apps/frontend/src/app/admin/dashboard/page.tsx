"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { isAdminAuthenticated, adminLogout } from '@/lib/adminAuth';
import initialColleges from '@/data/colleges.json';
import { 
  Building, LogOut, Plus, Trash2, Edit2, Shield, Search, CheckCircle, 
  Navigation, Layout, BarChart3, Users, TrendingUp, Eye, Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminDashboard() {
  const router = useRouter();
  const { signOut } = useAuthStore();
  
  // Auth & Tab State
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<'colleges' | 'analytics'>('colleges');

  // Colleges State (Local state)
  const [colleges, setColleges] = useState(initialColleges);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Add/Edit College State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '', location: '', category: 'engineering', fee: '', placement: '', image: ''
  });

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.replace('/');
    } else {
      setIsAuth(true);
    }
  }, [router]);

  if (isAuth === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleLogout = async () => {
    adminLogout();
    await signOut();
    router.push('/');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this college?')) {
      setColleges(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleEdit = (college: any) => {
    setFormData({
      name: college.name, location: college.location, category: college.category,
      fee: college.fee, placement: college.placement, image: college.image || ''
    });
    setEditingId(college.id);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setColleges(prev => prev.map(c => c.id === editingId ? {
        ...c, ...formData,
        feeValue: parseInt(formData.fee.replace(/[^0-9]/g, '')) * 100000 || c.feeValue
      } : c));
    } else {
      setColleges(prev => [{
        id: `college-${Date.now()}`, ...formData, rating: 4.5, reviews: 0,
        feeValue: parseInt(formData.fee.replace(/[^0-9]/g, '')) * 100000 || 500000,
        avgPackage: "8.5 LPA", highestPackage: "20.0 LPA", tags: ["New"], isTopRated: false
      }, ...prev]);
    }
    setIsFormOpen(false);
    setEditingId(null);
    setFormData({ name: '', location: '', category: 'engineering', fee: '', placement: '', image: '' });
  };

  const filteredColleges = colleges.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex admin-dashboard-marker" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        body > header, body > footer, #chatbot-container, .chatbot-wrapper { display: none !important; }
      `}} />

      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-100 p-6 flex flex-col hidden md:flex shrink-0 z-20 relative">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-black text-xl text-gray-900 tracking-tight">Admin Panel</h2>
            <p className="text-xs text-gray-500 font-medium">CollegeHunt Control</p>
          </div>
        </div>
        
        <div className="space-y-2 flex-1">
          <button 
            onClick={() => setActiveTab('colleges')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'colleges' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}
          >
            <Building className="w-5 h-5" /> Manage Colleges
          </button>
          <button 
            onClick={() => setActiveTab('analytics')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'analytics' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}
          >
            <BarChart3 className="w-5 h-5" /> Analytics Dashboard
          </button>
        </div>

        <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all font-medium mt-auto">
          <LogOut className="w-5 h-5" /> Exit Admin
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-100 px-8 py-5 flex justify-between items-center sticky top-0 z-10 shadow-sm">
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            {activeTab === 'colleges' ? 'College Management' : 'Platform Analytics'}
          </h1>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
              <CheckCircle className="w-4 h-4" /> System Online
            </div>
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-bold text-sm transition-all border border-red-100">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:block">Sign Out</span>
            </button>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          
          {/* ===================== COLLEGES TAB ===================== */}
          {activeTab === 'colleges' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              {/* Colleges Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.03)] flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0"><Building className="w-6 h-6" /></div>
                  <div>
                    <p className="text-sm font-bold text-gray-500 mb-1">Total Colleges</p>
                    <h3 className="text-3xl font-black text-gray-900">{colleges.length}</h3>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.03)] flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0"><Navigation className="w-6 h-6" /></div>
                  <div>
                    <p className="text-sm font-bold text-gray-500 mb-1">Top Locations</p>
                    <h3 className="text-3xl font-black text-gray-900">18+</h3>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.03)] flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shrink-0"><Layout className="w-6 h-6" /></div>
                  <div>
                    <p className="text-sm font-bold text-gray-500 mb-1">Active Categories</p>
                    <h3 className="text-3xl font-black text-gray-900">5</h3>
                  </div>
                </div>
              </div>

              {/* Colleges Editor */}
              <div className="bg-white border border-gray-100 rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.03)] overflow-hidden">
                <div className="p-6 sm:p-8 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-black text-gray-900">Platform Data</h2>
                    <p className="text-sm text-gray-500 font-medium mt-1">Real-time college directory editor</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input type="text" placeholder="Search colleges..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 w-full sm:w-64" />
                    </div>
                    <button onClick={() => { setIsFormOpen(!isFormOpen); setEditingId(null); setFormData({ name: '', location: '', category: 'engineering', fee: '', placement: '', image: '' }); }} className="shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white p-2 sm:px-4 sm:py-2 rounded-xl flex items-center gap-2 font-bold text-sm shadow-lg shadow-indigo-500/25 active:scale-95">
                      <Plus className="w-5 h-5" /> <span className="hidden sm:block">{isFormOpen && !editingId ? 'Cancel' : 'Add College'}</span>
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {isFormOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-b border-gray-50 bg-indigo-50/30 overflow-hidden">
                      <form onSubmit={handleFormSubmit} className="p-6 sm:p-8 space-y-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-indigo-700 font-black text-lg">
                            {editingId ? <Edit2 className="w-5 h-5" /> : <Building className="w-5 h-5" />} {editingId ? 'Edit College' : 'Add New College'}
                          </div>
                          {editingId && <button type="button" onClick={() => setIsFormOpen(false)} className="text-sm font-bold text-gray-500 hover:text-gray-800">Cancel Edit</button>}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          <div><label className="block text-xs font-bold text-gray-500 mb-2">College Name</label><input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:border-indigo-500" /></div>
                          <div><label className="block text-xs font-bold text-gray-500 mb-2">Location</label><input required type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:border-indigo-500" /></div>
                          <div><label className="block text-xs font-bold text-gray-500 mb-2">Category</label><select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:border-indigo-500"><option value="engineering">Engineering</option><option value="medical">Medical</option><option value="law">Law</option><option value="commerce">Commerce</option><option value="design">Design</option></select></div>
                          <div><label className="block text-xs font-bold text-gray-500 mb-2">Avg Fee</label><input required type="text" value={formData.fee} onChange={e => setFormData({...formData, fee: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:border-indigo-500" /></div>
                          <div><label className="block text-xs font-bold text-gray-500 mb-2">Placement Rate</label><input required type="text" value={formData.placement} onChange={e => setFormData({...formData, placement: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:border-indigo-500" /></div>
                          <div><label className="block text-xs font-bold text-gray-500 mb-2">Image URL</label><input required type="url" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:border-indigo-500" /></div>
                        </div>
                        <div className="flex justify-end pt-2">
                          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md">{editingId ? 'Update College' : 'Save College'}</button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50/50 border-b border-gray-100">
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">College</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Fee & Placement</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filteredColleges.length === 0 ? (
                        <tr><td colSpan={4} className="px-6 py-12 text-center text-gray-500 font-medium">No colleges found.</td></tr>
                      ) : (
                        filteredColleges.map((college) => (
                          <tr key={college.id} className="hover:bg-gray-50/50 transition-colors group">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-gray-100"><img src={college.image} className="w-full h-full object-cover" /></div>
                                <div><div className="font-bold text-gray-900">{college.name}</div><div className="text-xs text-gray-500 font-medium">{college.location}</div></div>
                              </div>
                            </td>
                            <td className="px-6 py-4"><span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-50 text-indigo-700 capitalize border border-indigo-100">{college.category}</span></td>
                            <td className="px-6 py-4"><div className="text-sm font-bold text-gray-900">{college.fee}</div><div className="text-xs text-green-600 font-bold">{college.placement} Placed</div></td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button onClick={() => handleEdit(college)} className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                                <button onClick={() => handleDelete(college.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* ===================== ANALYTICS TAB ===================== */}
          {activeTab === 'analytics' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              
              {/* Top KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: "Active Users", value: "8,249", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
                  { label: "Total Page Views", value: "142.5k", icon: Eye, color: "text-purple-600", bg: "bg-purple-50" },
                  { label: "Predictor Usage", value: "3,102", icon: Activity, color: "text-orange-600", bg: "bg-orange-50" },
                  { label: "Avg. Session", value: "4m 12s", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" }
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_2px_20px_rgba(0,0,0,0.03)] hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center`}>
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">+12%</span>
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-gray-900 mb-1">{stat.value}</h3>
                      <p className="text-sm font-bold text-gray-500">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Traffic Chart */}
                <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 p-8 shadow-[0_2px_20px_rgba(0,0,0,0.03)]">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="text-xl font-black text-gray-900">Traffic Overview</h3>
                      <p className="text-sm text-gray-500 font-medium mt-1">Daily visitors over the last 7 days</p>
                    </div>
                  </div>
                  
                  {/* CSS Bar Chart */}
                  <div className="h-64 flex items-end justify-between gap-2 sm:gap-6 pt-4 border-b border-gray-100 relative">
                    {/* Y-Axis lines */}
                    <div className="absolute w-full h-full flex flex-col justify-between pb-8 pointer-events-none">
                      <div className="border-b border-gray-100/50 w-full h-0"></div>
                      <div className="border-b border-gray-100/50 w-full h-0"></div>
                      <div className="border-b border-gray-100/50 w-full h-0"></div>
                      <div className="border-b border-gray-100/50 w-full h-0"></div>
                    </div>
                    
                    {[
                      { day: 'Mon', height: 'h-[40%]' }, { day: 'Tue', height: 'h-[65%]' },
                      { day: 'Wed', height: 'h-[45%]' }, { day: 'Thu', height: 'h-[85%]' },
                      { day: 'Fri', height: 'h-[75%]' }, { day: 'Sat', height: 'h-[95%]' },
                      { day: 'Sun', height: 'h-[60%]' }
                    ].map((bar, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-3 relative z-10 group">
                        <div className={`w-full max-w-[48px] bg-indigo-50 hover:bg-indigo-100 rounded-t-xl relative overflow-hidden transition-all duration-500 ${bar.height} min-h-[20px] flex items-end`}>
                          <div className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-xl group-hover:opacity-90 transition-opacity" style={{height: '100%'}}></div>
                        </div>
                        <span className="text-xs font-bold text-gray-500">{bar.day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Viewed Colleges */}
                <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-[0_2px_20px_rgba(0,0,0,0.03)]">
                  <h3 className="text-xl font-black text-gray-900 mb-6">Top Viewed Colleges</h3>
                  <div className="space-y-6">
                    {colleges.slice(0, 4).map((c, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-8 font-black text-gray-300 text-xl">0{i+1}</div>
                        <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                          <img src={c.image} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 truncate">{c.name}</h4>
                          <p className="text-xs text-gray-500 font-medium truncate">{c.location}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-indigo-600">{1420 - i*200}</div>
                          <div className="text-[10px] uppercase font-bold text-gray-400">Views</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}
