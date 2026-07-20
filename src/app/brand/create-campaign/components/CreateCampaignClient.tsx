'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { useAuth } from '@/src/components/AuthProvider';
import { createBrandCampaign } from '@/src/lib/api/brand';
import { buildAdminLoginUrl } from '@/src/lib/auth/sso';
import { getDashboardUrl, normalizeRole } from '@/src/lib/auth/session';

interface CampaignForm {
  title: string;
  platform: string;
  niche: string;
  budget: string;
  deadline: string;
  description: string;
  followersMin: string;
  engagementMin: string;
}

const platforms = ['Instagram', 'YouTube', 'TikTok', 'Twitter', 'LinkedIn', 'Pinterest', 'Twitch'];
const niches = [
  'Beauty & Skincare',
  'Fitness & Wellness',
  'Food & Cooking',
  'Tech & Gadgets',
  'Fashion & Style',
  'Travel & Adventure',
  'Gaming',
  'Finance & Investing',
];

export default function CreateCampaignClient() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [deliverables, setDeliverables] = useState<string[]>(['1 Feed Post', '2 Stories']);
  const [newDeliverable, setNewDeliverable] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<CampaignForm>();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      window.location.href = buildAdminLoginUrl('/brand/create-campaign');
      return;
    }
    if (normalizeRole(user.role) !== 'BRAND') {
      router.replace('/');
    }
  }, [user, loading, router]);

  const addDeliverable = () => {
    if (newDeliverable.trim()) {
      setDeliverables((prev) => [...prev, newDeliverable.trim()]);
      setNewDeliverable('');
    }
  };

  const onSubmit = async (data: CampaignForm) => {
    setIsSubmitting(true);
    try {
      await createBrandCampaign({
        title: data.title,
        description: data.description,
        platform: data.platform,
        budget: Number(data.budget),
        deadline: data.deadline,
        deliverables,
        locality: data.niche,
        languages: ['English'],
        status: 'PENDING_APPROVAL',
      });
      toast.success('Campaign created successfully!');
      window.location.href = getDashboardUrl('BRAND');
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Failed to create campaign');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !user || normalizeRole(user.role) !== 'BRAND') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#7B2FF7]/30 border-t-[#7B2FF7] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-10 py-8">
      <Toaster position="top-right" richColors />
      <Link
        href={getDashboardUrl('BRAND')}
        className="inline-flex items-center gap-2 text-sm text-[#6B6B8A] hover:text-[#7B2FF7] mb-6 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Brand Dashboard
      </Link>

      <div
        className="rounded-2xl p-6 lg:p-8 mb-8 text-white"
        style={{ background: 'linear-gradient(135deg, #7B2FF7 0%, #F357A8 100%)' }}
      >
        <h1 className="font-display font-800 text-2xl lg:text-3xl">Create New Campaign</h1>
        <p className="text-white/80 text-sm mt-2">
          Launch your influencer campaign and connect with creators who match your brand.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-2xl border border-[#E5E7EB] p-6 lg:p-8 shadow-card space-y-5"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-[#1F1F2E] mb-1.5" htmlFor="camp-title">
              Campaign Title
            </label>
            <input
              id="camp-title"
              type="text"
              placeholder="Summer Glow Skincare Launch"
              className={`w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7B2FF7]/30 focus:border-[#7B2FF7] ${errors.title ? 'border-red-400 bg-red-50' : 'border-[#E5E7EB]'}`}
              {...register('title', { required: 'Campaign title is required' })}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1F1F2E] mb-1.5" htmlFor="camp-platform">
              Platform
            </label>
            <select
              id="camp-platform"
              className={`w-full px-3 py-2.5 border rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#7B2FF7]/30 focus:border-[#7B2FF7] ${errors.platform ? 'border-red-400' : 'border-[#E5E7EB]'}`}
              {...register('platform', { required: 'Select a platform' })}
            >
              <option value="">Select platform...</option>
              {platforms.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            {errors.platform && <p className="text-red-500 text-xs mt-1">{errors.platform.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1F1F2E] mb-1.5" htmlFor="camp-niche">
              Niche
            </label>
            <select
              id="camp-niche"
              className={`w-full px-3 py-2.5 border rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#7B2FF7]/30 focus:border-[#7B2FF7] ${errors.niche ? 'border-red-400' : 'border-[#E5E7EB]'}`}
              {...register('niche', { required: 'Select a niche' })}
            >
              <option value="">Select niche...</option>
              {niches.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            {errors.niche && <p className="text-red-500 text-xs mt-1">{errors.niche.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1F1F2E] mb-1.5" htmlFor="camp-budget">
              Total Budget ($)
            </label>
            <input
              id="camp-budget"
              type="number"
              placeholder="5000"
              className={`w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7B2FF7]/30 focus:border-[#7B2FF7] ${errors.budget ? 'border-red-400 bg-red-50' : 'border-[#E5E7EB]'}`}
              {...register('budget', { required: 'Budget is required', min: { value: 100, message: 'Minimum budget is $100' } })}
            />
            {errors.budget && <p className="text-red-500 text-xs mt-1">{errors.budget.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1F1F2E] mb-1.5" htmlFor="camp-deadline">
              Application Deadline
            </label>
            <input
              id="camp-deadline"
              type="date"
              className={`w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7B2FF7]/30 focus:border-[#7B2FF7] ${errors.deadline ? 'border-red-400 bg-red-50' : 'border-[#E5E7EB]'}`}
              {...register('deadline', { required: 'Deadline is required' })}
            />
            {errors.deadline && <p className="text-red-500 text-xs mt-1">{errors.deadline.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1F1F2E] mb-1.5" htmlFor="camp-followers">
              Min. Followers
            </label>
            <input
              id="camp-followers"
              type="number"
              placeholder="10000"
              className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7B2FF7]/30 focus:border-[#7B2FF7]"
              {...register('followersMin')}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1F1F2E] mb-1.5" htmlFor="camp-engagement">
              Min. Engagement Rate (%)
            </label>
            <input
              id="camp-engagement"
              type="number"
              step="0.1"
              placeholder="3.5"
              className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7B2FF7]/30 focus:border-[#7B2FF7]"
              {...register('engagementMin')}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-[#1F1F2E] mb-1.5" htmlFor="camp-desc">
              Campaign Description
            </label>
            <p className="text-xs text-[#9AA0B4] mb-1.5">
              Describe what you want creators to do and what content you are looking for
            </p>
            <textarea
              id="camp-desc"
              rows={4}
              placeholder="We are launching our new product and need authentic creators to showcase it..."
              className={`w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7B2FF7]/30 focus:border-[#7B2FF7] resize-none ${errors.description ? 'border-red-400 bg-red-50' : 'border-[#E5E7EB]'}`}
              {...register('description', { required: 'Description is required', minLength: { value: 30, message: 'Add at least 30 characters' } })}
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-[#1F1F2E] mb-1.5">Deliverables</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {deliverables.map((d, i) => (
                <span
                  key={`deliv-${i}`}
                  className="inline-flex items-center gap-1.5 bg-[#EFEAFF] text-[#7B2FF7] border border-[#E5DEFF] text-xs font-medium px-2.5 py-1 rounded-full"
                >
                  {d}
                  <button type="button" onClick={() => setDeliverables((prev) => prev.filter((_, j) => j !== i))}>
                    <X size={11} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newDeliverable}
                onChange={(e) => setNewDeliverable(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addDeliverable())}
                placeholder="e.g. 1 Instagram Reel"
                className="flex-1 px-3 py-2 border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7B2FF7]/30 focus:border-[#7B2FF7]"
              />
              <button
                type="button"
                onClick={addDeliverable}
                className="flex items-center gap-1 px-3 py-2 bg-[#F2F3F7] hover:bg-[#E5E7EB] text-[#1F1F2E] rounded-xl text-sm font-medium transition-colors"
              >
                <Plus size={14} /> Add
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-2 border-t border-[#F2F3F7]">
          <Link
            href={getDashboardUrl('BRAND')}
            className="flex-1 py-3 border border-[#E5E7EB] text-[#6B6B8A] font-semibold rounded-xl text-sm text-center hover:bg-[#F2F3F7] transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 flex items-center justify-center gap-2 text-white font-display font-700 py-3 rounded-xl text-sm transition-all disabled:opacity-70"
            style={{ background: 'linear-gradient(90deg, #7B2FF7, #F357A8)' }}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Creating...</span>
              </>
            ) : (
              'Create Campaign'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
