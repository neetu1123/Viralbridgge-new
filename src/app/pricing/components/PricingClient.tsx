'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Zap, Star, Building2, Users, Crown, Sparkles, X as CloseIcon } from 'lucide-react';

type PlanTier = 'free' | 'starter' | 'pro' | 'premium' | 'enterprise';

interface Plan {
  id: string;
  tier: PlanTier;
  name: string;
  price: { monthly: number; yearly: number };
  description: string;
  features: string[];
  popular?: boolean;
  recommended?: boolean;
  current?: boolean;
  enterprise?: boolean;
}

const CREATOR_PLANS: Plan[] = [
  {
    id: 'creator-free',
    tier: 'free',
    name: 'Free',
    price: { monthly: 0, yearly: 0 },
    description: 'Get started with a public profile and basic tools.',
    features: ['Public creator profile', '3 campaign applications/month', 'Basic analytics', 'Community access'],
    current: true,
  },
  {
    id: 'creator-starter',
    tier: 'starter',
    name: 'Starter',
    price: { monthly: 499, yearly: 399 },
    description: 'For creators ready to land their first brand deals.',
    features: ['10 campaign applications/month', 'Creator invitations', 'Standard analytics', 'Email support'],
  },
  {
    id: 'creator-pro',
    tier: 'pro',
    name: 'Pro',
    price: { monthly: 1499, yearly: 1199 },
    description: 'For serious creators scaling their income.',
    features: ['Unlimited applications', 'Advanced analytics', 'Priority support', 'Premium badge', 'Verified badge', 'Advanced filters'],
    popular: true,
    recommended: true,
  },
  {
    id: 'creator-premium',
    tier: 'premium',
    name: 'Premium',
    price: { monthly: 2999, yearly: 2399 },
    description: 'Top-tier tools for professional creators.',
    features: ['Everything in Pro', 'Featured listing', 'Campaign insights', 'Team members (3)', 'Media kit generator'],
  },
  {
    id: 'creator-enterprise',
    tier: 'enterprise',
    name: 'Enterprise',
    price: { monthly: 0, yearly: 0 },
    description: 'Custom solutions for agencies and talent managers.',
    features: ['Unlimited team members', 'Multi-profile management', 'Dedicated account manager', 'Custom integrations', 'SLA support'],
    enterprise: true,
  },
];

const BRAND_PLANS: Plan[] = [
  {
    id: 'brand-free',
    tier: 'free',
    name: 'Free',
    price: { monthly: 0, yearly: 0 },
    description: 'Explore creators and launch your first campaign.',
    features: ['Browse creator profiles', '1 campaign/month', 'Basic analytics', 'In-app messaging'],
    current: true,
  },
  {
    id: 'brand-starter',
    tier: 'starter',
    name: 'Starter',
    price: { monthly: 2999, yearly: 2399 },
    description: 'Launch influencer campaigns with confidence.',
    features: ['3 active campaigns', 'Creator invitations', 'Standard analytics', 'Campaign applications'],
  },
  {
    id: 'brand-pro',
    tier: 'pro',
    name: 'Pro',
    price: { monthly: 7999, yearly: 6399 },
    description: 'Scale creator marketing with powerful tools.',
    features: ['Unlimited campaigns', 'Advanced filters', 'Campaign insights', 'Priority support', 'Premium badge', 'Team members (5)'],
    popular: true,
    recommended: true,
  },
  {
    id: 'brand-premium',
    tier: 'premium',
    name: 'Premium',
    price: { monthly: 14999, yearly: 11999 },
    description: 'Enterprise-grade tools for growing brands.',
    features: ['Everything in Pro', 'Featured listing', 'Verified badge', 'Advanced analytics', 'Unlimited applications', 'Dedicated support'],
  },
  {
    id: 'brand-enterprise',
    tier: 'enterprise',
    name: 'Enterprise',
    price: { monthly: 0, yearly: 0 },
    description: 'Custom solutions for large brands and agencies.',
    features: ['Unlimited everything', 'Custom integrations', 'Dedicated brand manager', 'White-label reporting', 'SLA & compliance'],
    enterprise: true,
  },
];

const COMPARISON_FEATURES = [
  { key: 'applications', label: 'Campaign Applications', values: { free: '3/mo', starter: '10/mo', pro: 'Unlimited', premium: 'Unlimited', enterprise: 'Unlimited' } },
  { key: 'invitations', label: 'Creator Invitations', values: { free: false, starter: true, pro: true, premium: true, enterprise: true } },
  { key: 'analytics', label: 'Analytics', values: { free: 'Basic', starter: 'Standard', pro: 'Advanced', premium: 'Advanced', enterprise: 'Custom' } },
  { key: 'support', label: 'Priority Support', values: { free: false, starter: false, pro: true, premium: true, enterprise: true } },
  { key: 'premiumBadge', label: 'Premium Badge', values: { free: false, starter: false, pro: true, premium: true, enterprise: true } },
  { key: 'verifiedBadge', label: 'Verified Badge', values: { free: false, starter: false, pro: true, premium: true, enterprise: true } },
  { key: 'team', label: 'Team Members', values: { free: '1', starter: '1', pro: '3', premium: '5', enterprise: 'Unlimited' } },
  { key: 'filters', label: 'Advanced Filters', values: { free: false, starter: false, pro: true, premium: true, enterprise: true } },
  { key: 'insights', label: 'Campaign Insights', values: { free: false, starter: false, pro: true, premium: true, enterprise: true } },
  { key: 'listing', label: 'Featured Listing', values: { free: false, starter: false, pro: false, premium: true, enterprise: true } },
  { key: 'campaigns', label: 'Unlimited Campaigns', values: { free: false, starter: false, pro: true, premium: true, enterprise: true } },
];

const FAQS = [
  { q: 'Who should choose Starter?', a: 'Starter is ideal for creators or brands just beginning their journey — enough applications and tools to get real results without a big commitment.' },
  { q: 'Who should choose Premium?', a: 'Premium suits established creators and mid-size brands who need featured visibility, team collaboration, and advanced campaign insights.' },
  { q: 'Can I upgrade later?', a: 'Yes! You can upgrade or downgrade at any time. Upgrades take effect immediately; downgrades apply at the next billing cycle.' },
  { q: 'Can I cancel anytime?', a: 'Absolutely. Cancel anytime from your dashboard with no hidden fees or long-term contracts.' },
];

const TESTIMONIALS = [
  { name: 'Ananya Kapoor', role: 'Brand Manager, GlowCo', quote: 'ViralBridge Pro cut our creator discovery time in half. The advanced filters alone are worth it.', avatar: 'AK', plan: 'Brand Pro' },
  { name: 'Rahul Verma', role: 'Content Creator, 500K followers', quote: 'Upgrading to Premium got me featured listings and 3x more campaign invites in the first month.', avatar: 'RV', plan: 'Creator Premium' },
  { name: 'Meera Shah', role: 'Marketing Lead, TechStart', quote: 'The comparison table made it easy to pick the right plan. Enterprise support has been exceptional.', avatar: 'MS', plan: 'Brand Enterprise' },
];

function FeatureValue({ value }: { value: string | boolean }) {
  if (typeof value === 'boolean') {
    return value ? <Check size={16} className="text-[#22C55E] mx-auto" /> : <X size={16} className="text-[#E5E7EB] mx-auto" />;
  }
  return <span className="text-xs font-medium text-[#6B6B8A]">{value}</span>;
}

function PlanCard({
  plan,
  yearly,
  onUpgrade,
  onCompare,
}: {
  plan: Plan;
  yearly: boolean;
  onUpgrade: (plan: Plan) => void;
  onCompare: (plan: Plan) => void;
}) {
  const price = yearly ? plan.price.yearly : plan.price.monthly;
  const savings = plan.price.monthly > 0 ? Math.round((1 - plan.price.yearly / plan.price.monthly) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative bg-white rounded-2xl border p-6 flex flex-col gap-5 transition-all duration-200 hover:-translate-y-1 ${
        plan.popular
          ? 'border-[#7B2FF7] shadow-[0_0_30px_rgba(123,47,247,0.15)] ring-2 ring-[#7B2FF7]/20'
          : 'border-[#E5E7EB] shadow-card hover:shadow-card-hover'
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="bg-gradient-to-r from-[#7B2FF7] via-[#F357A8] to-[#F9A826] text-white text-[11px] font-700 font-display px-3 py-1 rounded-full whitespace-nowrap flex items-center gap-1">
            <Sparkles size={10} />
            Most Popular
          </span>
        </div>
      )}

      {plan.current && (
        <span className="absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F0FDF4] text-[#22C55E]">
          Current Plan
        </span>
      )}

      {plan.recommended && !plan.current && (
        <span className="absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EFEAFF] text-[#7B2FF7]">
          Recommended
        </span>
      )}

      <div>
        <div className="flex items-center gap-2 mb-1">
          {plan.tier === 'premium' && <Crown size={16} className="text-[#F9A826]" />}
          <h3 className="font-display font-700 text-[#1F1F2E] text-lg">{plan.name}</h3>
        </div>
        <p className="text-[#9AA0B4] text-xs">{plan.description}</p>
      </div>

      <div>
        {plan.enterprise ? (
          <span className="font-display font-800 text-3xl text-[#1F1F2E]">Custom</span>
        ) : price === 0 ? (
          <span className="font-display font-800 text-3xl text-[#1F1F2E]">Free</span>
        ) : (
          <>
            <div className="flex items-baseline gap-1">
              <span className="font-display font-800 text-3xl text-[#1F1F2E]">₹{price.toLocaleString()}</span>
              <span className="text-[#9AA0B4] text-sm">/mo</span>
            </div>
            {yearly && savings > 0 && (
              <span className="text-[10px] font-semibold text-[#22C55E] bg-[#F0FDF4] px-2 py-0.5 rounded-full mt-1 inline-block">
                Save {savings}%
              </span>
            )}
          </>
        )}
      </div>

      {plan.enterprise ? (
        <Link href="https://admin-viralbridgge-new.vercel.app/" className="w-full text-center py-3 rounded-xl border border-[#7B2FF7] text-[#7B2FF7] text-sm font-semibold hover:bg-[#EFEAFF] transition-colors">
          Contact Sales
        </Link>
      ) : plan.current ? (
        <button disabled className="w-full py-3 rounded-xl bg-[#F2F3F7] text-[#9AA0B4] text-sm font-semibold cursor-not-allowed">
          Current Plan
        </button>
      ) : (
        <button
          onClick={() => onUpgrade(plan)}
          className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-150 ${
            plan.popular ? 'btn-primary' : 'border border-[#7B2FF7] text-[#7B2FF7] hover:bg-[#EFEAFF]'
          }`}
        >
          Upgrade
        </button>
      )}

      <button onClick={() => onCompare(plan)} className="text-[#7B2FF7] text-xs font-semibold hover:underline text-center">
        Compare Features
      </button>

      <div className="space-y-2.5 border-t border-[#F2F3F7] pt-4">
        {plan.features.map((f) => (
          <div key={f} className="flex items-start gap-2.5">
            <div className="w-4 h-4 rounded-full bg-[#EFEAFF] flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check size={10} className="text-[#7B2FF7]" strokeWidth={2.5} />
            </div>
            <span className="text-sm text-[#6B6B8A]">{f}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function PricingClient() {
  const [yearly, setYearly] = useState(true);
  const [tab, setTab] = useState<'creators' | 'brands'>('creators');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [compareModal, setCompareModal] = useState(false);
  const [upgradePlan, setUpgradePlan] = useState<Plan | null>(null);
  const [confirmModal, setConfirmModal] = useState(false);
  const [successScreen, setSuccessScreen] = useState(false);

  const plans = tab === 'creators' ? CREATOR_PLANS : BRAND_PLANS;
  const tiers: PlanTier[] = ['free', 'starter', 'pro', 'premium', 'enterprise'];

  const handleUpgrade = (plan: Plan) => {
    setUpgradePlan(plan);
    setConfirmModal(true);
  };

  const confirmUpgrade = () => {
    setConfirmModal(false);
    setSuccessScreen(true);
  };

  const yearlySavings = 20;

  return (
    <div className="bg-[#F8F7FC]">
      {/* Hero */}
      <section className="relative py-20 text-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#EFEAFF]/50 to-transparent pointer-events-none" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative">
          <span className="inline-flex items-center gap-1.5 text-[#7B2FF7] font-semibold text-sm uppercase tracking-widest mb-4 font-display">
            <Crown size={14} />
            Premium Membership
          </span>
          <h1 className="font-display font-800 text-4xl lg:text-5xl text-[#1F1F2E] tracking-tight mb-4">
            Choose the Perfect Plan
          </h1>
          <p className="text-[#6B6B8A] text-lg max-w-xl mx-auto mb-10">
            Unlock premium tools to grow faster with ViralBridge.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 bg-white border border-[#E5E7EB] rounded-2xl p-1.5 shadow-card">
            <button
              onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-150 ${
                !yearly ? 'bg-[#7B2FF7] text-white shadow-sm' : 'text-[#6B6B8A] hover:text-[#1F1F2E]'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-150 flex items-center gap-2 ${
                yearly ? 'bg-[#7B2FF7] text-white shadow-sm' : 'text-[#6B6B8A] hover:text-[#1F1F2E]'
              }`}
            >
              Yearly
              <span className={`text-[10px] font-700 px-1.5 py-0.5 rounded-full ${yearly ? 'bg-white/20 text-white' : 'bg-[#F0FDF4] text-[#22C55E]'}`}>
                Save {yearlySavings}%
              </span>
            </button>
          </div>
        </motion.div>
      </section>

      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        {/* Tab switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-white border border-[#E5E7EB] rounded-2xl p-1.5 shadow-card gap-1">
            <button
              onClick={() => setTab('creators')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                tab === 'creators' ? 'bg-[#EFEAFF] text-[#7B2FF7]' : 'text-[#6B6B8A] hover:text-[#1F1F2E]'
              }`}
            >
              <Users size={15} />
              Creator Plans
            </button>
            <button
              onClick={() => setTab('brands')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                tab === 'brands' ? 'bg-[#EFEAFF] text-[#7B2FF7]' : 'text-[#6B6B8A] hover:text-[#1F1F2E]'
              }`}
            >
              <Building2 size={15} />
              Brand Plans
            </button>
          </div>
        </div>

        {/* Premium badge examples */}
        <div className="flex justify-center gap-4 mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#F9A826] to-[#F357A8] text-white text-xs font-bold">
            <Crown size={12} />
            Premium Creator
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#7B2FF7] to-[#1DA1F2] text-white text-xs font-bold">
            <Star size={12} />
            Premium Brand
          </span>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-20">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              yearly={yearly}
              onUpgrade={handleUpgrade}
              onCompare={() => setCompareModal(true)}
            />
          ))}
        </div>

        {/* Feature Comparison Table */}
        <section className="mb-20">
          <h2 className="font-display font-700 text-[#1F1F2E] text-2xl text-center mb-8">Feature Comparison</h2>
          <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-card overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-[#E5E7EB]">
                  <th className="text-left p-4 text-sm font-display font-700 text-[#1F1F2E]">Feature</th>
                  {tiers.map((tier) => (
                    <th key={tier} className={`p-4 text-center text-xs font-display font-700 uppercase ${tier === 'pro' ? 'text-[#7B2FF7] bg-[#EFEAFF]/50' : 'text-[#6B6B8A]'}`}>
                      {tier}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_FEATURES.map((feat) => (
                  <tr key={feat.key} className="border-b border-[#F2F3F7] last:border-0">
                    <td className="p-4 text-sm text-[#1F1F2E] font-medium">{feat.label}</td>
                    {tiers.map((tier) => (
                      <td key={tier} className={`p-4 text-center ${tier === 'pro' ? 'bg-[#EFEAFF]/30' : ''}`}>
                        <FeatureValue value={feat.values[tier]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-20">
          <h2 className="font-display font-700 text-[#1F1F2E] text-2xl text-center mb-8">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-card"
              >
                <p className="text-[#6B6B8A] text-sm leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7B2FF7] to-[#F357A8] flex items-center justify-center text-white text-xs font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-display font-700 text-[#1F1F2E] text-sm">{t.name}</p>
                    <p className="text-[#9AA0B4] text-xs">{t.role}</p>
                  </div>
                  <span className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#EFEAFF] text-[#7B2FF7]">
                    {t.plan}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto mb-20">
          <h2 className="font-display font-700 text-[#1F1F2E] text-2xl text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={faq.q} className="bg-white rounded-2xl border border-[#E5E7EB] shadow-card overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left">
                  <span className="font-display font-700 text-[#1F1F2E] text-sm pr-4">{faq.q}</span>
                  <span className={`text-[#7B2FF7] font-bold text-lg flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="px-5 pb-4 text-sm text-[#6B6B8A] border-t border-[#F2F3F7] pt-3">{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Compare Features Modal */}
      <AnimatePresence>
        {compareModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setCompareModal(false)} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[80vh] overflow-y-auto p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-700 text-[#1F1F2E] text-xl">Detailed Plan Comparison</h3>
                <button onClick={() => setCompareModal(false)} className="p-2 rounded-xl hover:bg-[#F2F3F7]">
                  <CloseIcon size={18} />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px]">
                  <thead>
                    <tr className="border-b border-[#E5E7EB]">
                      <th className="text-left p-3 text-sm font-display font-700">Feature</th>
                      {tiers.map((tier) => (
                        <th key={tier} className="p-3 text-center text-xs font-bold uppercase text-[#6B6B8A]">{tier}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_FEATURES.map((feat) => (
                      <tr key={feat.key} className="border-b border-[#F2F3F7]">
                        <td className="p-3 text-sm text-[#1F1F2E]">{feat.label}</td>
                        {tiers.map((tier) => (
                          <td key={tier} className="p-3 text-center">
                            <FeatureValue value={feat.values[tier]} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upgrade Confirmation Modal */}
      <AnimatePresence>
        {confirmModal && upgradePlan && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setConfirmModal(false)} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#EFEAFF] flex items-center justify-center mx-auto mb-4">
                <Zap size={24} className="text-[#7B2FF7]" />
              </div>
              <h3 className="font-display font-700 text-[#1F1F2E] text-xl mb-2">Confirm Upgrade</h3>
              <p className="text-[#6B6B8A] text-sm mb-6">
                Upgrade to <strong>{upgradePlan.name}</strong> for{' '}
                <strong>
                  {upgradePlan.enterprise
                    ? 'custom pricing'
                    : yearly
                      ? `₹${upgradePlan.price.yearly.toLocaleString()}/mo (billed yearly)`
                      : `₹${upgradePlan.price.monthly.toLocaleString()}/mo`}
                </strong>
                ?
              </p>
              <div className="flex gap-3">
                <button onClick={() => setConfirmModal(false)} className="flex-1 py-3 rounded-xl border border-[#E5E7EB] text-[#6B6B8A] text-sm font-semibold hover:bg-[#F2F3F7]">
                  Cancel
                </button>
                <button onClick={confirmUpgrade} className="flex-1 py-3 rounded-xl btn-primary text-sm">
                  Confirm Upgrade
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Screen */}
      <AnimatePresence>
        {successScreen && upgradePlan && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="w-16 h-16 rounded-full bg-[#F0FDF4] flex items-center justify-center mx-auto mb-4"
              >
                <Check size={32} className="text-[#22C55E]" />
              </motion.div>
              <h3 className="font-display font-700 text-[#1F1F2E] text-2xl mb-2">Upgrade Successful!</h3>
              <p className="text-[#6B6B8A] text-sm mb-2">
                You&apos;re now on the <strong>{upgradePlan.name}</strong> plan.
              </p>
              <p className="text-[#9AA0B4] text-xs mb-6">This is a mock upgrade — no payment was processed.</p>
              <button
                onClick={() => { setSuccessScreen(false); setUpgradePlan(null); }}
                className="w-full py-3 rounded-xl btn-primary text-sm"
              >
                Get Started
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
