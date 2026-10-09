'use client';

import { useEffect } from 'react';
import { buildAdminLoginUrl } from '@/src/lib/auth/sso';

export default function GetListedCreatorPage() {
  useEffect(() => {
    window.location.replace(buildAdminLoginUrl('/explore/creators-v2'));
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F8F7FC] px-6">
      <p className="text-sm text-[#6B6B8A]">Creator listing is not used here. Redirecting to creator login…</p>
    </main>
  );
}
