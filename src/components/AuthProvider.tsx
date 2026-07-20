'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { fetchMe } from '@/src/lib/auth/api';
import { clearSsoChecked } from '@/src/lib/auth/sso';
import { clearSession, getStoredUser, getToken, type AuthUser } from '@/src/lib/auth/session';
import {
  buildAdminBridgeUrl,
  markSsoChecked,
  wasSsoCheckedRecently,
} from '@/src/lib/auth/sso';

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  setUser: (user: AuthUser | null) => void;
  refreshUser: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function shouldSkipSso(pathname: string): boolean {
  return pathname.startsWith('/auth/') || pathname.startsWith('/sign-up-login-screen');
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const stored = getStoredUser();
    if (!stored) {
      setUser(null);
      return;
    }
    try {
      const me = await fetchMe();
      setUser({ ...stored, ...me, role: me.role ?? stored.role });
    } catch {
      setUser(stored);
    }
  }, []);

  useEffect(() => {
    const stored = getStoredUser();
    const token = getToken();

    if (token && stored) {
      setUser(stored);
      refreshUser().finally(() => setLoading(false));
      return;
    }

    if (shouldSkipSso(pathname) || wasSsoCheckedRecently()) {
      setLoading(false);
      return;
    }

    markSsoChecked();
    const receiveUrl = `${window.location.origin}/auth/receive?next=${encodeURIComponent(pathname || '/')}`;
    window.location.href = buildAdminBridgeUrl(receiveUrl);
  }, [pathname, refreshUser]);

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
