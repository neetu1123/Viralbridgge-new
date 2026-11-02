import { Suspense } from 'react';
import ResetPasswordClient from './ResetPasswordClient';

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-[#F8F7FC] flex items-center justify-center p-4">
      <Suspense fallback={<div className="text-[#6B6B8A]">Loading...</div>}>
        <ResetPasswordClient />
      </Suspense>
    </div>
  );
}
