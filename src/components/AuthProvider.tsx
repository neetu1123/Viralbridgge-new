'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { fetchMe, ApiError } from '@/src/lib/auth/api';
import { clearLoggedOut, clearSsoChecked } from '@/src/lib/auth/sso';
import {
  clearSession,
  getStoredUser,
  getToken,
  setSession,
  type AuthUser,
} from '@/src/lib/auth/session';

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  setUser: (user: AuthUser | null) => void;
  refreshUser: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const token = getToken();
    const stored = getStoredUser();
    if (!token || !stored) {
      clearSession();
      setUser(null);
      return;
    }

    try {
      const me = await fetchMe();
      setSession(token, me);
      setUser(me);
      clearLoggedOut();
    } catch (error) {
      if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
        clearSession();
        clearSsoChecked();
        setUser(null);
        return;
      }
      setUser(stored);
    }
  }, []);

  useEffect(() => {
    const stored = getStoredUser();
    const token = getToken();

    if (!token || !stored) {
      setUser(null);
      setLoading(false);
      return;
    }

    setUser(stored);
    refreshUser().finally(() => setLoading(false));
  }, [refreshUser]);

  const logout = useCallback(() => {
    clearSession();
    clearSsoChecked();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      setUser,
      refreshUser,
      logout,
    }),
    [user, loading, refreshUser, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
