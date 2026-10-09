'use client';

import { useEffect } from 'react';
import { buildBrandListingLoginUrl } from '@/src/lib/auth/sso';

export default function MyListingEnquiriesPage() {
  useEffect(() => {
    window.location.replace(buildBrandListingLoginUrl());
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F8F7FC] px-6">
      <p className="text-sm text-[#6B6B8A]">Redirecting to the Brand dashboard to manage your listing…</p>
    </main>
  );
}
