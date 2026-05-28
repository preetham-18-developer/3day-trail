import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { User, Session } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar_url?: string;
  role?: string;
  preferences?: Record<string, unknown>;
  saved_colleges?: string[];
  phone?: string;
  gender?: string;
  location?: string;
  bio?: string;
  current_level?: string;
  target_degree?: string;
  specialization?: string;
  college_name?: string;
  graduation_year?: string;
  cgpa?: string;
  skills?: string[];
}

interface AuthState {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  isInitialized: boolean;
  isLoading: boolean;
  initialize: () => Promise<void>;
  setSession: (session: Session | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  setMockProfile: (name: string, email: string) => void;
  signOut: () => Promise<void>;
}

// Helper: read mock profile from localStorage synchronously
function readMockProfile(): UserProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('userProfile');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const parts = (parsed.name || '').split(' ');
    return {
      id: 'mock-123',
      first_name: parts[0] || 'Student',
      last_name: parts.slice(1).join(' ') || '',
      email: parsed.email || '',
      role: 'student',
    };
  } catch {
    return null;
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  // Fix hydration: start with null, update in initialize()
  profile: null,
  isInitialized: false,
  isLoading: false,

  initialize: async () => {
    set({ isLoading: true });
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        const metadata = session.user.user_metadata;
        set({
          session,
          user: session.user,
          profile: {
            id: session.user.id,
            first_name: metadata.full_name?.split(' ')[0] || metadata.first_name || 'Student',
            last_name: metadata.full_name?.split(' ')[1] || metadata.last_name || '',
            email: session.user.email || '',
            avatar_url: metadata.avatar_url,
          },
        });
      } else {
        // No real session — use mock if present, otherwise null
        const mock = readMockProfile();
        set({ profile: mock });
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      // On error always fall back to mock
      const mock = readMockProfile();
      set({ profile: mock });
    } finally {
      set({ isInitialized: true, isLoading: false });
    }

    // Listen for Supabase auth state changes (real OAuth / signOut)
    supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const metadata = session.user.user_metadata;
        set({
          session,
          user: session.user,
          profile: {
            id: session.user.id,
            first_name: metadata.full_name?.split(' ')[0] || metadata.first_name || 'Student',
            last_name: metadata.full_name?.split(' ')[1] || metadata.last_name || '',
            email: session.user.email || '',
            avatar_url: metadata.avatar_url,
          },
        });
      } else {
        // Only wipe profile if there is no mock session saved
        if (!localStorage.getItem('userProfile')) {
          set({ session: null, user: null, profile: null });
        }
      }
    });
  },

  setSession: (session) => set({ session, user: session?.user || null }),

  setProfile: (profile) => set({ profile }),

  // Called directly by LoginModal — instant, no events needed
  setMockProfile: (name: string, email: string) => {
    const parts = name.split(' ');
    const profile: UserProfile = {
      id: 'mock-123',
      first_name: parts[0] || 'Student',
      last_name: parts.slice(1).join(' ') || '',
      email,
      role: 'student',
    };
    localStorage.setItem('userProfile', JSON.stringify({ name, email }));
    set({ profile });
  },

  signOut: async () => {
    localStorage.removeItem('userProfile');
    await supabase.auth.signOut();
    set({ session: null, user: null, profile: null });
  },
}));
