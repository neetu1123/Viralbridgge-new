import React, { Suspense } from 'react';
import AuthReceiveClient from './AuthReceiveClient';

export default function AuthReceivePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8F7FC]" />}>
      <AuthReceiveClient />
    </Suspense>
  );
}
