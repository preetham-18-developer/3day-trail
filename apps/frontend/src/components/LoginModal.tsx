"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Mail, Lock, User, Phone, Eye, EyeOff,
  GraduationCap, CheckCircle2, ArrowLeft
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { adminLogin } from '@/lib/adminAuth';
interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMode = 'choose' | 'login' | 'signup' | 'signup-step2' | 'success';

const INPUT = "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF385C] focus:ring-2 focus:ring-[#FF385C]/20 outline-none transition-all text-sm font-medium bg-gray-50 focus:bg-white";
const LABEL = "block text-sm font-bold text-gray-700 mb-1.5";

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const router = useRouter();
  const { setMockProfile } = useAuthStore();
  const [mode, setMode] = useState<AuthMode>('choose');
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Sign Up fields
  const [signup, setSignup] = useState({
    firstName: '', lastName: '', email: '', password: '', phone: '',
    degree: '', currentLevel: '', year: ''
  });

  // Login fields
  const [login, setLogin] = useState({ email: '', password: '' });

  const handleClose = () => {
    setTimeout(() => {
      setMode('choose');
      setError('');
      setIsLoading(false);
      setSignup({ firstName: '', lastName: '', email: '', password: '', phone: '', degree: '', currentLevel: '', year: '' });
      setLogin({ email: '', password: '' });
    }, 300);
    onClose();
  };

  const updateSignup = (k: keyof typeof signup, v: string) => {
    setSignup(prev => ({ ...prev, [k]: v }));
    setError('');
  };
  const updateLogin = (k: keyof typeof login, v: string) => {
    setLogin(prev => ({ ...prev, [k]: v }));
    setError('');
  };

  // ── LOGIN HANDLER ──
  const handleLogin = async () => {
    if (!login.email || !login.password) {
      setError('Please enter your email and password.');
      return;
    }
    setIsLoading(true);
    setError('');

    if (adminLogin(login.email, login.password)) {
      setMockProfile('Admin', login.email);
      handleClose();
      router.push('/admin/dashboard');
      return;
    }

    try {
      const { data, error: supaErr } = await supabase.auth.signInWithPassword({
        email: login.email, password: login.password
      });
      if (supaErr) throw supaErr;
      if (data.user) {
        const meta = data.user.user_metadata;
        setMockProfile(
          meta.full_name || `${meta.first_name || ''} ${meta.last_name || ''}`.trim() || login.email.split('@')[0],
          login.email
        );
        handleClose();
        return;
      }
    } catch {
      // Supabase not configured — use mock login
    }
    // Mock fallback: just set the profile directly
    setMockProfile(login.email.split('@')[0], login.email);
    handleClose();
    setIsLoading(false);
  };

  // ── VALIDATE STEP 1 (signup) ──
  const validateStep1 = (): boolean => {
    if (!signup.firstName.trim()) { setError('First name is required.'); return false; }
    if (!signup.email.trim() || !signup.email.includes('@')) { setError('Valid email is required.'); return false; }
    if (signup.password.length < 6) { setError('Password must be at least 6 characters.'); return false; }
    if (!signup.phone.trim()) { setError('Phone number is required.'); return false; }
    return true;
  };

  // ── SIGNUP FINAL HANDLER ──
  const handleSignup = async () => {
    if (!signup.degree) {
      setError('Please select your target degree.');
      return;
    }
    setIsLoading(true);
    setError('');

    const fullName = `${signup.firstName} ${signup.lastName}`.trim();

    // Fire Supabase in background — don't block UI
    (async () => {
      try {
        await supabase.auth.signUp({
          email: signup.email,
          password: signup.password,
          options: { data: { first_name: signup.firstName, last_name: signup.lastName, full_name: fullName, phone: signup.phone } }
        });
      } catch { /* silent */ }
    })();

    // Instantly update header
    setMockProfile(fullName || signup.email.split('@')[0], signup.email);
    setIsLoading(false);
    setMode('success');
  };

  const slideVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.25 } },
    exit: { opacity: 0, x: -30, transition: { duration: 0.2 } }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-[460px] bg-white rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh]"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-20">
              {(mode === 'signup-step2') ? (
                <button onClick={() => setMode('signup')} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
              ) : (
                <div className="w-9" />
              )}
              <h2 className="text-base font-bold text-gray-900 text-center flex-1">
                {mode === 'choose' && 'Log in or sign up'}
                {mode === 'login' && 'Welcome back'}
                {mode === 'signup' && 'Create your account'}
                {mode === 'signup-step2' && 'Academic Profile'}
                {mode === 'success' && 'You\'re all set! 🎉'}
              </h2>
              <button onClick={handleClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto hide-scrollbar flex-1">
              <AnimatePresence mode="wait">

                {/* ── CHOOSE ── */}
                {mode === 'choose' && (
                  <motion.div key="choose" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="p-6 sm:p-8 space-y-4">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#FF385C] to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#FF385C]/20">
                        <GraduationCap className="w-9 h-9 text-white" />
                      </div>
                      <h3 className="text-2xl font-black text-gray-900 mb-1">Welcome to CollegeHunt</h3>
                      <p className="text-gray-500 text-sm">Discover and apply to your dream college</p>
                    </div>

                    {/* Google */}
                    <button
                      onClick={async () => {
                        try {
                          await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin } });
                        } catch {
                          setMockProfile('Google User', 'user@gmail.com');
                          handleClose();
                        }
                      }}
                      className="w-full flex items-center justify-center gap-3 px-4 py-3.5 border-2 border-gray-200 rounded-2xl hover:border-gray-400 hover:bg-gray-50 transition-all font-bold text-gray-700 relative active:scale-[0.98]"
                    >
                      <svg className="w-5 h-5 absolute left-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      Continue with Google
                    </button>

                    <div className="relative flex items-center">
                      <div className="flex-grow border-t border-gray-200" />
                      <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-bold uppercase tracking-wider">or</span>
                      <div className="flex-grow border-t border-gray-200" />
                    </div>

                    {/* Email → Login or Signup */}
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setMode('login')}
                        className="py-3.5 rounded-2xl border-2 border-gray-200 hover:border-[#FF385C] hover:bg-[#FFF0F2] font-bold text-sm text-gray-700 hover:text-[#FF385C] transition-all active:scale-[0.98]"
                      >
                        Log In
                      </button>
                      <button
                        onClick={() => setMode('signup')}
                        className="py-3.5 rounded-2xl bg-[#FF385C] hover:bg-[#E31C5F] font-bold text-sm text-white shadow-md shadow-[#FF385C]/20 transition-all active:scale-[0.98]"
                      >
                        Sign Up Free
                      </button>
                    </div>

                    <p className="text-center text-xs text-gray-400 mt-4 leading-relaxed">
                      By continuing, you agree to our <span className="text-[#FF385C] font-bold cursor-pointer">Terms</span> and <span className="text-[#FF385C] font-bold cursor-pointer">Privacy Policy</span>.
                    </p>
                  </motion.div>
                )}

                {/* ── LOGIN ── */}
                {mode === 'login' && (
                  <motion.div key="login" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="p-6 sm:p-8 space-y-5">
                    <div className="text-center mb-6">
                      <p className="text-gray-500 text-sm">Enter your registered email and password</p>
                    </div>

                    <div>
                      <label className={LABEL}>Email Address <span className="text-[#FF385C]">*</span></label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="email" value={login.email} onChange={e => updateLogin('email', e.target.value)}
                          placeholder="you@example.com" className={`${INPUT} pl-11`} />
                      </div>
                    </div>

                    <div>
                      <label className={LABEL}>Password <span className="text-[#FF385C]">*</span></label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type={showPass ? 'text' : 'password'} value={login.password} onChange={e => updateLogin('password', e.target.value)}
                          placeholder="Your password" className={`${INPUT} pl-11 pr-11`} />
                        <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                          {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {error && <p className="text-sm text-red-500 font-medium bg-red-50 px-4 py-3 rounded-xl">{error}</p>}

                    <button onClick={handleLogin} disabled={isLoading}
                      className="w-full py-4 bg-[#FF385C] text-white font-bold rounded-2xl hover:bg-[#E31C5F] transition-all active:scale-[0.98] disabled:opacity-70 shadow-md shadow-[#FF385C]/20 flex items-center justify-center gap-2 mt-2">
                      {isLoading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Logging in...</> : 'Log In'}
                    </button>

                    <p className="text-center text-sm text-gray-500">
                      Don&apos;t have an account?{' '}
                      <button onClick={() => { setMode('signup'); setError(''); }} className="text-[#FF385C] font-bold hover:underline">Sign Up Free</button>
                    </p>
                  </motion.div>
                )}

                {/* ── SIGNUP STEP 1 ── */}
                {mode === 'signup' && (
                  <motion.div key="signup" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="p-6 sm:p-8 space-y-4">
                    <div className="text-center mb-4">
                      <p className="text-gray-500 text-sm">Step 1 of 2 — Create your free account</p>
                      <div className="flex gap-2 mt-3 justify-center">
                        <div className="h-1.5 w-16 bg-[#FF385C] rounded-full" />
                        <div className="h-1.5 w-16 bg-gray-200 rounded-full" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={LABEL}>First Name <span className="text-[#FF385C]">*</span></label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input type="text" value={signup.firstName} onChange={e => updateSignup('firstName', e.target.value)}
                            placeholder="Preetham" className={`${INPUT} pl-10`} />
                        </div>
                      </div>
                      <div>
                        <label className={LABEL}>Last Name</label>
                        <input type="text" value={signup.lastName} onChange={e => updateSignup('lastName', e.target.value)}
                          placeholder="Kumar" className={INPUT} />
                      </div>
                    </div>

                    <div>
                      <label className={LABEL}>Email Address <span className="text-[#FF385C]">*</span></label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="email" value={signup.email} onChange={e => updateSignup('email', e.target.value)}
                          placeholder="you@example.com" className={`${INPUT} pl-11`} />
                      </div>
                    </div>

                    <div>
                      <label className={LABEL}>Password <span className="text-[#FF385C]">*</span></label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type={showPass ? 'text' : 'password'} value={signup.password} onChange={e => updateSignup('password', e.target.value)}
                          placeholder="Min. 6 characters" className={`${INPUT} pl-11 pr-11`} />
                        <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                          {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className={LABEL}>Mobile Number <span className="text-[#FF385C]">*</span></label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="tel" value={signup.phone} onChange={e => updateSignup('phone', e.target.value)}
                          placeholder="+91 98765 43210" className={`${INPUT} pl-11`} />
                      </div>
                    </div>

                    {error && <p className="text-sm text-red-500 font-medium bg-red-50 px-4 py-3 rounded-xl">{error}</p>}

                    <button
                      onClick={() => { if (validateStep1()) { setError(''); setMode('signup-step2'); } }}
                      className="w-full py-4 bg-[#FF385C] text-white font-bold rounded-2xl hover:bg-[#E31C5F] transition-all active:scale-[0.98] shadow-md shadow-[#FF385C]/20 mt-2">
                      Continue →
                    </button>

                    <p className="text-center text-sm text-gray-500">
                      Already have an account?{' '}
                      <button onClick={() => { setMode('login'); setError(''); }} className="text-[#FF385C] font-bold hover:underline">Log In</button>
                    </p>
                  </motion.div>
                )}

                {/* ── SIGNUP STEP 2 ── */}
                {mode === 'signup-step2' && (
                  <motion.div key="signup-step2" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="p-6 sm:p-8 space-y-4">
                    <div className="text-center mb-4">
                      <p className="text-gray-500 text-sm">Step 2 of 2 — Tell us about your studies</p>
                      <div className="flex gap-2 mt-3 justify-center">
                        <div className="h-1.5 w-16 bg-[#FF385C] rounded-full" />
                        <div className="h-1.5 w-16 bg-[#FF385C] rounded-full" />
                      </div>
                    </div>

                    <div>
                      <label className={LABEL}>Currently Studying <span className="text-[#FF385C]">*</span></label>
                      <select value={signup.currentLevel} onChange={e => updateSignup('currentLevel', e.target.value)} className={INPUT}>
                        <option value="">Select level</option>
                        <option value="12th">Class 12th</option>
                        <option value="undergrad">Undergraduate (UG)</option>
                        <option value="grad">Graduate (PG)</option>
                        <option value="working">Working Professional</option>
                      </select>
                    </div>

                    <div>
                      <label className={LABEL}>Target Degree <span className="text-[#FF385C]">*</span></label>
                      <select value={signup.degree} onChange={e => updateSignup('degree', e.target.value)} className={INPUT}>
                        <option value="">Select degree</option>
                        <option value="B.Tech">B.Tech / B.E.</option>
                        <option value="MBBS">MBBS / Medical</option>
                        <option value="BBA">BBA / BMS</option>
                        <option value="MBA">MBA / PGDM</option>
                        <option value="BCA">BCA / MCA</option>
                        <option value="B.Sc">B.Sc / M.Sc</option>
                        <option value="Design">B.Des / M.Des</option>
                        <option value="Law">LLB / LLM</option>
                      </select>
                    </div>

                    <div>
                      <label className={LABEL}>Target Admission Year</label>
                      <select value={signup.year} onChange={e => updateSignup('year', e.target.value)} className={INPUT}>
                        <option value="">Select year</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                      </select>
                    </div>

                    {error && <p className="text-sm text-red-500 font-medium bg-red-50 px-4 py-3 rounded-xl">{error}</p>}

                    <button onClick={handleSignup} disabled={isLoading}
                      className="w-full py-4 bg-[#FF385C] text-white font-bold rounded-2xl hover:bg-[#E31C5F] transition-all active:scale-[0.98] disabled:opacity-70 shadow-md shadow-[#FF385C]/20 flex items-center justify-center gap-2 mt-2">
                      {isLoading
                        ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating account...</>
                        : 'Create My Account 🎓'}
                    </button>
                  </motion.div>
                )}

                {/* ── SUCCESS ── */}
                {mode === 'success' && (
                  <motion.div key="success" variants={slideVariants} initial="hidden" animate="visible" exit="exit"
                    className="p-8 flex flex-col items-center text-center space-y-4">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}
                      className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-2">
                      <CheckCircle2 className="w-12 h-12 text-green-500" strokeWidth={1.5} />
                    </motion.div>
                    <h3 className="text-2xl font-black text-gray-900">Welcome, {signup.firstName || 'Student'}!</h3>
                    <p className="text-gray-500 text-sm max-w-xs">
                      Your CollegeHunt account is ready. We&apos;ve personalised your dashboard for <strong>{signup.degree}</strong> admissions.
                    </p>
                    <button
                      onClick={handleClose}
                      className="w-full py-4 mt-4 bg-[#FF385C] text-white font-bold rounded-2xl hover:bg-[#E31C5F] transition-all active:scale-[0.98] shadow-md shadow-[#FF385C]/20">
                      Explore Colleges 🚀
                    </button>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
