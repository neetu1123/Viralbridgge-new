'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { Shield } from 'lucide-react';

const sections = [
{
  id: 'information-we-collect',
  title: '1. Information We Collect',
  content: `We collect information you provide directly to us, such as when you create an account, complete your profile, apply for campaigns, or contact us for support.

**Account Information**: Name, email address, phone number, date of birth, and profile photo.

**Identity Verification (KYC)**: PAN card number, bank account details, and government-issued ID for payment processing and fraud prevention.

**Profile Information**: Bio, social media handles, follower counts, engagement metrics, niche categories, and portfolio content.

**Campaign Data**: Applications submitted, deliverables uploaded, messages exchanged with brands or creators, and campaign performance data.

**Payment Information**: Bank account details and UPI IDs for processing payouts. We do not store full card numbers.

**Usage Data**: Pages visited, features used, time spent on platform, device information, IP address, and browser type.`
},
{
  id: 'how-we-use',
  title: '2. How We Use Your Information',
  content: `We use the information we collect to:

• Provide, maintain, and improve the ViralBridge platform
• Process payments and manage escrow transactions
• Match creators with brand campaigns using our AI system
• Verify your identity and prevent fraud
• Send transactional emails (campaign updates, payment notifications, account alerts)
• Send marketing communications (with your consent, which you can withdraw at any time)
• Comply with legal obligations including tax reporting (TDS/GST)
• Resolve disputes between creators and brands
• Analyze platform usage to improve our services`
},
{
  id: 'sharing',
  title: '3. Information Sharing',
  content: `We do not sell your personal information. We share your information only in the following circumstances:

**With other platform users**: Your public profile (name, handle, niche, follower counts, portfolio) is visible to brands. Your contact details are never shared without your consent.

**With service providers**: We share data with trusted third parties who help us operate the platform (payment processors, cloud hosting, analytics providers, email services). These providers are contractually bound to protect your data.

**For legal compliance**: We may disclose information when required by law, court order, or government authority, including tax authorities for TDS/GST compliance.

**Business transfers**: In the event of a merger, acquisition, or sale of assets, your information may be transferred. We will notify you before this occurs.`
},
{
  id: 'data-retention',
  title: '4. Data Retention',
  content: `We retain your personal information for as long as your account is active or as needed to provide services. Specifically:

• Account data: Retained for the duration of your account plus 3 years after closure
• Transaction records: Retained for 7 years for tax and legal compliance
• Campaign data: Retained for 5 years
• KYC documents: Retained for 5 years as required by Indian financial regulations
• Usage logs: Retained for 12 months

You may request deletion of your account and associated data at any time, subject to our legal retention obligations.`
},
{
  id: 'your-rights',
  title: '5. Your Rights',
  content: `Under applicable data protection laws, you have the right to:

• **Access**: Request a copy of the personal data we hold about you
• **Correction**: Request correction of inaccurate or incomplete data
• **Deletion**: Request deletion of your personal data (subject to legal retention requirements)
• **Portability**: Receive your data in a structured, machine-readable format
• **Objection**: Object to processing of your data for direct marketing purposes
• **Withdrawal of consent**: Withdraw consent for processing where consent is the legal basis

To exercise any of these rights, contact us at privacy@viralbridge.in. We will respond within 30 days.`
},
{
  id: 'security',
  title: '6. Security',
  content: `We implement industry-standard security measures to protect your information:

• All data transmitted between your browser and our servers is encrypted using TLS 1.3
• Passwords are hashed using bcrypt with salt
• Payment data is processed through PCI-DSS compliant payment processors
• KYC documents are stored in encrypted, access-controlled storage
• We conduct regular security audits and penetration testing
• Employee access to personal data is restricted on a need-to-know basis

Despite these measures, no security system is impenetrable. If you believe your account has been compromised, contact us immediately at security@viralbridge.in.`
},
{
  id: 'cookies',
  title: '7. Cookies',
  content: `We use cookies and similar tracking technologies to operate the platform. See our Cookie Policy for full details. In summary:

• **Essential cookies**: Required for the platform to function (authentication, security)
• **Analytics cookies**: Help us understand how users interact with the platform (with consent)
• **Marketing cookies**: Used to show relevant ads on third-party platforms (with consent)

You can manage cookie preferences through our Cookie Settings panel or your browser settings.`
},
{
  id: 'contact',
  title: '8. Contact Us',
  content: `For privacy-related questions, requests, or complaints:

**Email**: privacy@viralbridge.in
**Postal address**: ViralBridge Technologies Pvt. Ltd., 4th Floor, 91springboard, Koramangala, Bengaluru 560034, Karnataka, India

**Data Protection Officer**: dpo@viralbridge.in

If you are not satisfied with our response, you have the right to lodge a complaint with the relevant data protection authority.`
}];


export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header />
      <main className="pt-16">

      {/* Hero with subtle image */}
      <section className="relative bg-slate-900 overflow-hidden">
        <Image
          src="https://img.rocket.new/generatedImages/rocket_gen_img_10b344c41-1772618227431.png"
          alt="Digital privacy and data security concept with lock icon and encrypted data streams"
          fill
          className="object-cover opacity-10"
          priority />
        
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 to-slate-900/98" />
        <div className="relative max-w-4xl mx-auto px-6 py-16">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-violet-400" />
            <span className="text-violet-400 font-semibold text-sm">Legal</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-slate-400">Last updated: July 1, 2026 · Effective: July 1, 2026</p>
          <p className="text-slate-300 mt-4 max-w-2xl leading-relaxed">
            ViralBridge Technologies Pvt. Ltd. ("ViralBridge", "we", "us", or "our") is committed to protecting your privacy. This policy explains how we collect, use, and protect your personal information when you use our platform.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* TOC */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
              <h3 className="font-semibold text-slate-900 text-sm mb-3">Contents</h3>
              <nav className="space-y-1">
                {sections?.map((s) =>
                <a key={s?.id} href={`#${s?.id}`} className="block text-xs text-slate-500 hover:text-violet-700 py-1 transition-colors leading-snug">
                    {s?.title}
                  </a>
                )}
              </nav>
            </div>
          </aside>

          {/* Body */}
          <main className="lg:col-span-3 space-y-10">
            {sections?.map((s) =>
            <section key={s?.id} id={s?.id} className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-4">{s?.title}</h2>
                <div className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                  {s?.content?.split('\n')?.map((line, i) => {
                  if (line?.startsWith('**') && line?.endsWith('**')) {
                    return <p key={i} className="font-semibold text-slate-800 mt-3 mb-1">{line?.replace(/\*\*/g, '')}</p>;
                  }
                  if (line?.startsWith('• ')) {
                    return <p key={i} className="flex gap-2 mt-1"><span className="text-violet-400 flex-shrink-0">•</span><span>{line?.slice(2)}</span></p>;
                  }
                  if (line?.trim() === '') return <div key={i} className="h-2" />;
                  return <p key={i} className="mt-1">{line}</p>;
                })}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
      </main>
      <Footer />
    </div>);

}