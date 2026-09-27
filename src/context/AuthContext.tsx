import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserProfile, UserRole } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  isLoading: boolean;
  loginCustomer: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  loginAdmin: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  registerCustomer: (name: string, email: string, phone: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (data: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  hasPermission: (requiredRole: UserRole | UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_CUSTOMER: UserProfile = {
  id: 'usr-customer-101',
  email: 'customer@cuisene.id',
  full_name: 'Siti Aminah',
  phone: '081298765432',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  role: 'CUSTOMER'
};

const DEMO_ADMIN: UserProfile = {
  id: 'usr-admin-001',
  email: 'admin@cuisene-ummua4.id',
  full_name: 'Dato Sultan Ummu A4',
  phone: '081100009999',
  avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
  role: 'SUPER_ADMIN'
};

const DEMO_STAFF: UserProfile = {
  id: 'usr-staff-002',
  email: 'staff@cuisene-ummua4.id',
  full_name: 'Budi Santoso',
  phone: '081233334444',
  role: 'STAFF'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('cuisene_auth_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return null; }
    }
    return null;
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        if (isSupabaseConfigured && supabase) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            // Fetch profile
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('user_id', session.user.id)
              .single();
            if (profile) {
              setUser(profile);
              localStorage.setItem('cuisene_auth_user', JSON.stringify(profile));
            }
          }
        }
      } catch (err) {
        console.warn('Session check error, utilizing current state', err);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const role: UserRole = user?.role || 'CUSTOMER';

  const loginCustomer = async (email: string, pass: string) => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
        if (error) throw error;
        if (data.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', data.user.id)
            .single();
          if (profile) {
            setUser(profile);
            localStorage.setItem('cuisene_auth_user', JSON.stringify(profile));
            return { success: true };
          }
        }
      }
      
      // Local demo auth simulation
      if (email.toLowerCase().includes('admin')) {
        return { success: false, error: 'Akun admin harus login melalui Portal Admin.' };
      }

      const mockCustomer: UserProfile = {
        ...DEMO_CUSTOMER,
        email,
        full_name: email.split('@')[0].toUpperCase(),
      };
      setUser(mockCustomer);
      localStorage.setItem('cuisene_auth_user', JSON.stringify(mockCustomer));
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Login gagal. Periksa email & kata sandi.' };
    } finally {
      setIsLoading(false);
    }
  };

  const loginAdmin = async (email: string, pass: string) => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
        if (error) throw error;
        if (data.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', data.user.id)
            .single();
          if (profile && ['SUPER_ADMIN', 'ADMIN', 'STAFF'].includes(profile.role)) {
            setUser(profile);
            localStorage.setItem('cuisene_auth_user', JSON.stringify(profile));
            return { success: true };
          } else {
            return { success: false, error: 'Akses ditolak. Anda tidak memiliki otorisasi Admin.' };
          }
        }
      }

      // Demo Admin Auth
      if (email.toLowerCase().includes('staff')) {
        setUser(DEMO_STAFF);
        localStorage.setItem('cuisene_auth_user', JSON.stringify(DEMO_STAFF));
        return { success: true };
      }

      if (pass === 'admin123' || email.includes('admin') || pass.length >= 6) {
        setUser(DEMO_ADMIN);
        localStorage.setItem('cuisene_auth_user', JSON.stringify(DEMO_ADMIN));
        return { success: true };
      }

      return { success: false, error: 'Kredensial Admin tidak valid.' };
    } catch (err: any) {
      return { success: false, error: err.message || 'Login Admin gagal.' };
    } finally {
      setIsLoading(false);
    }
  };

  const registerCustomer = async (name: string, email: string, phone: string, pass: string) => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signUp({ email, password: pass });
        if (error) throw error;
        if (data.user) {
          const newProf: UserProfile = {
            id: data.user.id,
            user_id: data.user.id,
            email,
            full_name: name,
            phone,
            role: 'CUSTOMER',
          };
          await supabase.from('profiles').insert(newProf);
          setUser(newProf);
          localStorage.setItem('cuisene_auth_user', JSON.stringify(newProf));
          return { success: true };
        }
      }

      // Demo local register
      const newCustomer: UserProfile = {
        id: 'usr-' + Date.now(),
        email,
        full_name: name,
        phone,
        role: 'CUSTOMER',
      };
      setUser(newCustomer);
      localStorage.setItem('cuisene_auth_user', JSON.stringify(newCustomer));
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Pendaftaran akun gagal.' };
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) return { success: false, error: 'Belum ada pengguna yang masuk.' };
    try {
      const updated = { ...user, ...data };
      setUser(updated);
      localStorage.setItem('cuisene_auth_user', JSON.stringify(updated));

      if (isSupabaseConfigured && supabase && user.user_id) {
        await supabase.from('profiles').update(data).eq('user_id', user.user_id);
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Gagal memperbarui profil.' };
    }
  };

  const logout = async () => {
    try {
      if (isSupabaseConfigured && supabase) {
        await supabase.auth.signOut();
      }
    } catch (e) {
      console.warn('Logout warning', e);
    } finally {
      setUser(null);
      localStorage.removeItem('cuisene_auth_user');
    }
  };

  const resetPassword = async (email: string) => {
    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) throw error;
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Gagal mengirim instruksi reset kata sandi.' };
    }
  };

  const hasPermission = (requiredRole: UserRole | UserRole[]) => {
    if (!user) return false;
    if (user.role === 'SUPER_ADMIN') return true;
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(user.role);
    }
    return user.role === requiredRole;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isLoading,
        loginCustomer,
        loginAdmin,
        registerCustomer,
        updateProfile,
        logout,
        resetPassword,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
