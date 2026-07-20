'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { clearSsoChecked, parseSsoHash } from '@/src/lib/auth/sso';
import { setSession } from '@/src/lib/auth/session';
import { useAuth } from '@/src/components/AuthProvider';

export default function AuthReceiveClient() {
  const searchParams = useSearchParams();
  const { setUser } = useAuth();
  const [message, setMessage] = useState('Signing you in...');

  useEffect(() => {
    const parsed = parseSsoHash(window.location.hash);
    const next = searchParams.get('next') || '/';

    if (!parsed) {
      setMessage('No session found. Redirecting...');
      clearSsoChecked();
      window.location.replace(next);
      return;
    }

    setSession(parsed.token, parsed.user);
    setUser(parsed.user);
    clearSsoChecked();
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
    window.location.replace(next.startsWith('/') ? next : '/');
  }, [searchParams, setUser]);

  return (
    <div className="min-h-screen bg-[#F8F7FC] flex items-center justify-center px-6">
      <p className="text-[#6B6B8A] text-sm">{message}</p>
    </div>
  );
}
