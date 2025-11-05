import { supabase } from "@/lib/supabase";
import { makeRedirectUri } from 'expo-auth-session';
import React, { createContext, useContext, useEffect, useState } from "react";

type UserType = {
  id: string;
  phone?: string;
  email?: string;
  app_metadata: {
    provider?: string;
    providers?: string[];
  };
  user_metadata: {
    [key: string]: any;
  };
  aud: string;
  confirmation_sent_at?: string;
  recovery_sent_at?: string;
  email_confirmed_at?: string;
  phone_confirmed_at?: string;
  last_sign_in_at?: string;
  role?: string;
  updated_at?: string;
  created_at?: string;
};

type SessionType = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at: number;
  token_type: string;
  user: UserType;
};

type AuthContextType = {
  session: SessionType | null;
  user: UserType | null;
  loading: boolean;
  signInWithGoogle: () => Promise<{ data: any | null; error: Error | null }>;
  signInWithPhone: (phone: string) => Promise<{ data: any | null; error: Error | null }>;
  verifyOTP: (phone: string, token: string) => Promise<{ data: any | null; error: Error | null }>;
  testLogin: () => void;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<SessionType | null>(null);
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }: { data: { session: any } }) => {
      setSession(session as SessionType);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event: string, session: any) => {
        setSession(session as SessionType);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      // Create the redirect URI using expo-auth-session
      const redirectUri = makeRedirectUri({
        scheme: 'home-bonzenga',
        path: 'auth-callback'
      });

      console.log('Redirect URI:', redirectUri);

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          redirectTo: redirectUri,
        }
      });
      return { data, error };
    } catch (error) {
      console.error('Error in signInWithGoogle:', error);
      return { data: null, error: error as Error };
    }
  };

  const signInWithPhone = async (phone: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        phone: phone,
      });
      return { data, error };
    } catch (error) {
      console.error('Error in signInWithPhone:', error);
      return { data: null, error: error as Error };
    }
  };

  const verifyOTP = async (phone: string, token: string) => {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone: phone,
        token: token,
        type: 'sms',
      });
      return { data, error };
    } catch (error) {
      console.error('Error in verifyOTP:', error);
      return { data: null, error: error as Error };
    }
  };

  const testLogin = () => {
    // Create a mock user for testing purposes
    const mockUser: UserType = {
      id: 'test-user-123',
      phone: '+1234567890',
      email: 'test@example.com',
      app_metadata: {
        provider: 'test',
        providers: ['test'],
      },
      user_metadata: {
        name: 'Test User',
      },
      aud: 'authenticated',
      role: 'authenticated',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const mockSession: SessionType = {
      access_token: 'mock-access-token',
      refresh_token: 'mock-refresh-token',
      expires_in: 3600,
      expires_at: Date.now() + 3600000,
      token_type: 'bearer',
      user: mockUser,
    };

    setSession(mockSession);
    setUser(mockUser);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    session,
    user,
    loading,
    signInWithGoogle,
    signInWithPhone,
    verifyOTP,
    testLogin,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
