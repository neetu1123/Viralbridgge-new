'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { sendDiscoveryEnquiry } from '@/src/lib/api/discovery';
import { useAuth } from '@/src/components/AuthProvider';

interface Props {
  slug: string;
  name: string;
  onClose: () => void;
}

export default function EnquiryModal({ slug, name, onClose }: Props) {
  const { user } = useAuth();
  const [nameValue, setNameValue] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await sendDiscoveryEnquiry(slug, {
        name: nameValue,
        email,
        phone,
        message,
        website_url: honeypot,
      });
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send enquiry');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <button type="button" className="absolute inset-0 bg-black/40" onClick={onClose} aria-label="Close" />
      <div className="relative w-full max-w-md bg-white rounded-2xl p-6 shadow-xl">
        <button type="button" onClick={onClose} className="absolute top-4 right-4 text-[#9AA0B4]" aria-label="Close">
          <X size={18} />
        </button>
        <h2 className="text-lg font-semibold text-[#1F1F2E]">Send enquiry</h2>
        <p className="text-sm text-[#6B6B8A] mt-1">Message {name}. They will be notified in ViralBridge.</p>
        {done ? (
          <p className="mt-6 text-sm text-emerald-700">Enquiry sent. They’ll get back to you shortly.</p>
        ) : (
          <form onSubmit={submit} className="mt-4 space-y-3">
            <input value={nameValue} onChange={(e) => setNameValue(e.target.value)} required placeholder="Your name" className="w-full rounded-xl border border-[#E5E7EB] px-3 py-2.5 text-sm" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email" className="w-full rounded-xl border border-[#E5E7EB] px-3 py-2.5 text-sm" />
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone (optional)" className="w-full rounded-xl border border-[#E5E7EB] px-3 py-2.5 text-sm" />
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={4} placeholder="How can they help?" className="w-full rounded-xl border border-[#E5E7EB] px-3 py-2.5 text-sm" />
            <input value={honeypot} onChange={(e) => setHoneypot(e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button type="submit" disabled={submitting} className="w-full btn-primary py-2.5 text-sm disabled:opacity-60">
              {submitting ? 'Sending…' : 'Send enquiry'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
