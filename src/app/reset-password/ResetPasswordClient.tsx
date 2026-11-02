'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { toast, Toaster } from 'sonner';
import { resetPassword } from '@/src/lib/auth/api';

export default function ResetPasswordClient() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const result = await resetPassword(token, password);
      setDone(true);
      toast.success(result.message || 'Password updated');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Could not reset password';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl border border-[#E5E7EB] shadow-card-hover p-8">
      <Toaster position="bottom-right" richColors />
      {!token ? (
        <>
          <h1 className="font-display font-700 text-2xl text-[#1F1F2E]">Reset link missing</h1>
          <p className="text-[#6B6B8A] text-sm mt-2 mb-6">Open the link from your email, or request a new one from the sign-in page.</p>
          <Link href="/sign-up-login-screen?mode=login" className="text-[#7B2FF7] text-sm font-semibold hover:underline">
            Back to sign in
          </Link>
        </>
      ) : done ? (
        <>
          <h1 className="font-display font-700 text-2xl text-[#1F1F2E]">Password updated</h1>
          <p className="text-[#6B6B8A] text-sm mt-2 mb-6">You can sign in with your new password.</p>
          <Link
            href="/sign-up-login-screen?mode=login"
            className="inline-flex w-full items-center justify-center py-3.5 rounded-xl font-display font-700 text-white"
            style={{ background: 'linear-gradient(90deg, #7B2FF7, #F357A8)' }}
          >
            Sign in
          </Link>
        </>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <h1 className="font-display font-700 text-2xl text-[#1F1F2E]">Choose a new password</h1>
          <p className="text-[#6B6B8A] text-sm">Use at least 8 characters. This link works once.</p>
          <input
            type="password"
            autoComplete="new-password"
            placeholder="New password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-sm outline-none focus:border-[#7B2FF7]"
          />
          <input
            type="password"
            autoComplete="new-password"
            placeholder="Confirm password"
            value={confirm}
            onChange={(event) => setConfirm(event.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-sm outline-none focus:border-[#7B2FF7]"
          />
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-display font-700 text-white disabled:opacity-70"
            style={{ background: 'linear-gradient(90deg, #7B2FF7, #F357A8)' }}
          >
            {loading ? 'Saving...' : 'Update password'}
          </button>
        </form>
      )}
    </div>
  );
}
