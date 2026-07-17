'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { ArrowRight, MapPin, Clock, Briefcase, Heart, Zap, Users, TrendingUp, Star, ChevronDown } from 'lucide-react';

const openRoles = [
{
  id: 1,
  title: 'Senior Full-Stack Engineer',
  team: 'Engineering',
  location: 'Bengaluru (Hybrid)',
  type: 'Full-time',
  level: 'Senior',
  desc: 'Build the core platform infrastructure powering 12,000+ creators and 3,400+ brand campaigns. You\'ll own critical features end-to-end.',
  tags: ['Next.js', 'Node.js', 'PostgreSQL', 'AWS']
},
{
  id: 2,
  title: 'ML Engineer — Creator Matching',
  team: 'AI / ML',
  location: 'Bengaluru (Hybrid)',
  type: 'Full-time',
  level: 'Mid–Senior',
  desc: 'Improve the AI matching engine that achieves 94% campaign success. Work on recommendation systems, trust scoring, and audience quality models.',
  tags: ['Python', 'PyTorch', 'Recommendation Systems', 'NLP']
},
{
  id: 3,
  title: 'Creator Success Manager',
  team: 'Creator Growth',
  location: 'Bengaluru / Remote',
  type: 'Full-time',
  level: 'Mid',
  desc: 'Own the success of 1,000+ creators on the platform. Help them optimize profiles, win campaigns, and grow their income.',
  tags: ['Creator Economy', 'Account Management', 'Data Analysis']
},
{
  id: 4,
  title: 'Brand Partnerships Lead',
  team: 'Sales',
  location: 'Mumbai / Bengaluru',
  type: 'Full-time',
  level: 'Senior',
  desc: 'Close enterprise brand deals and build long-term partnerships with D2C and FMCG brands. Own a ₹5Cr+ revenue target.',
  tags: ['B2B Sales', 'Influencer Marketing', 'Enterprise']
},
{
  id: 5,
  title: 'Product Designer',
  team: 'Design',
  location: 'Bengaluru (Hybrid)',
  type: 'Full-time',
  level: 'Mid',
  desc: 'Design the future of creator-brand collaboration. Own end-to-end product design from research to high-fidelity prototypes.',
  tags: ['Figma', 'User Research', 'Design Systems', 'Prototyping']
},
{
  id: 6,
  title: 'Growth Marketing Manager',
  team: 'Marketing',
  location: 'Remote',
  type: 'Full-time',
  level: 'Mid',
  desc: 'Drive creator and brand acquisition through performance marketing, content, and community. Own CAC and activation metrics.',
  tags: ['Performance Marketing', 'SEO', 'Content', 'Analytics']
}];


const perks = [
{ icon: TrendingUp, title: 'ESOPs from Day 1', desc: 'Every full-time employee gets meaningful equity. We\'re building this together.' },
{ icon: Heart, title: 'Health & Wellness', desc: 'Full health insurance for you and your family. Mental health support included.' },
{ icon: Zap, title: 'Learning Budget', desc: '₹50,000/year for courses, conferences, and books. We invest in your growth.' },
{ icon: Users, title: 'Flexible Work', desc: 'Hybrid-first culture. Most roles are 3 days in office, 2 remote. No micromanagement.' },
{ icon: Star, title: 'Creator Perks', desc: 'Free ViralBridge Pro account. Attend creator events and brand launches.' },
{ icon: Briefcase, title: 'Competitive Pay', desc: 'Top-of-market salaries benchmarked against Series A/B startups.' }];


const values = [
{ label: 'Move fast, fix things', desc: 'We ship weekly. Mistakes are learning, not failures.' },
{ label: 'Radical ownership', desc: 'No hand-holding. You own your work end-to-end.' },
{ label: 'Creator-first thinking', desc: 'Every decision starts with: does this help creators earn more?' },
{ label: 'Data over opinions', desc: 'We debate with data. Intuition is a starting point, not a conclusion.' }];


const teamColors: Record<string, string> = {
  'Engineering': 'bg-violet-100 text-violet-700',
  'AI / ML': 'bg-purple-100 text-purple-700',
  'Creator Growth': 'bg-rose-100 text-rose-700',
  'Sales': 'bg-amber-100 text-amber-700',
  'Design': 'bg-teal-100 text-teal-700',
  'Marketing': 'bg-blue-100 text-blue-700'
};

const teams = ['All', 'Engineering', 'AI / ML', 'Creator Growth', 'Sales', 'Design', 'Marketing'];

export default function CareersPage() {
  const [activeTeam, setActiveTeam] = useState('All');
  const [expandedRole, setExpandedRole] = useState<number | null>(null);

  const filtered = activeTeam === 'All' ? openRoles : openRoles.filter((r) => r.team === activeTeam);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header />
      <main className="pt-16">

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-slate-900 min-h-[520px] flex items-center">
        <Image
          src="https://img.rocket.new/generatedImages/rocket_gen_img_108a7f85a-1767613245607.png"
          alt="ViralBridge team collaborating in a modern open office workspace"
          fill
          className="object-cover opacity-30"
          priority />
        
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-violet-950/70 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-6 py-28">
          <span className="inline-flex items-center gap-2 bg-violet-500/20 text-violet-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-violet-500/30">
            <Briefcase className="w-3.5 h-3.5" /> We're hiring
          </span>
          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 max-w-2xl">
            Build the future of the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-rose-400">creator economy</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-xl leading-relaxed mb-8">
            We're a 28-person team on a mission to make creator-brand collaboration fair, intelligent, and scalable. Join us.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <a href="#open-roles" className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
              See open roles <ArrowRight className="w-4 h-4" />
            </a>
            <Link href="/about" className="text-slate-300 hover:text-white font-medium transition-colors">
              Learn about us →
            </Link>
          </div>
          <div className="flex items-center gap-8 mt-12 flex-wrap">
            {[{ v: '28', l: 'Team members' }, { v: '6', l: 'Open roles' }, { v: 'Series A', l: 'Stage' }, { v: 'Bengaluru', l: 'HQ' }].map((s) =>
            <div key={s.l}>
                <div className="text-2xl font-bold text-white">{s.v}</div>
                <div className="text-slate-400 text-sm">{s.l}</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block bg-rose-100 text-rose-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">Our Culture</span>
              <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
                A team that ships, learns, and actually cares
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                We're not a typical startup. We're operators who've been on both sides of the creator economy — and we're building the platform we wish existed.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Small team, big scope. Everyone here has real ownership and real impact. No politics, no bureaucracy — just fast execution and honest feedback.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {values.map((v) =>
                <div key={v.label} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <div className="font-semibold text-slate-900 text-sm mb-1">{v.label}</div>
                    <div className="text-xs text-slate-500 leading-relaxed">{v.desc}</div>
                  </div>
                )}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl shadow-violet-100">
                <Image
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_1a6d4f440-1779839892162.png"
                  alt="ViralBridge team members having a collaborative discussion around a table"
                  width={800}
                  height={560}
                  className="w-full h-[400px] object-cover" />
                
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
                    <Star className="w-5 h-5 text-violet-700" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">4.8 / 5</div>
                    <div className="text-xs text-slate-500">Glassdoor rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Photo */}
      <section className="py-0">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-3 rounded-3xl overflow-hidden">
            <div className="col-span-2 h-64 relative">
              <Image
                src="https://img.rocket.new/generatedImages/rocket_gen_img_1bd1fce73-1772346374830.png"
                alt="Modern open-plan office with standing desks and natural light at ViralBridge Bengaluru HQ"
                fill
                className="object-cover" />
              
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex-1 relative rounded-none overflow-hidden">
                <Image
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_11e48555e-1764651381219.png"
                  alt="Team members laughing and celebrating a product milestone together"
                  fill
                  className="object-cover" />
                
              </div>
              <div className="flex-1 relative overflow-hidden">
                <Image
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_175c5803d-1772473481605.png"
                  alt="Developer working on laptop with multiple screens showing code and dashboards"
                  fill
                  className="object-cover" />
                
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Why join ViralBridge?</h2>
            <p className="text-slate-500 max-w-xl mx-auto">We take care of our team so they can take care of our creators and brands.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {perks.map((p) =>
            <div key={p.title} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow hover:-translate-y-0.5 transition-transform">
                <div className="w-11 h-11 bg-violet-100 rounded-xl flex items-center justify-center mb-4">
                  <p.icon className="w-5 h-5 text-violet-700" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{p.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{p.desc}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section id="open-roles" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-1">Open roles</h2>
              <p className="text-slate-500">{openRoles.length} positions across {teams.length - 1} teams</p>
            </div>
          </div>
          {/* Team filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {teams.map((t) =>
            <button
              key={t}
              onClick={() => setActiveTeam(t)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTeam === t ? 'bg-violet-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              
                {t}
              </button>
            )}
          </div>
          <div className="space-y-3">
            {filtered.map((role) =>
            <div key={role.id} className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden hover:border-violet-200 transition-colors">
                <button
                onClick={() => setExpandedRole(expandedRole === role.id ? null : role.id)}
                className="w-full px-6 py-5 flex items-center gap-4 text-left">
                
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap mb-1">
                      <h3 className="font-bold text-slate-900">{role.title}</h3>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${teamColors[role.team] || 'bg-slate-100 text-slate-600'}`}>{role.team}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500 flex-wrap">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{role.location}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{role.type}</span>
                      <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{role.level}</span>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${expandedRole === role.id ? 'rotate-180' : ''}`} />
                </button>
                {expandedRole === role.id &&
              <div className="px-6 pb-6 border-t border-slate-200 pt-5">
                    <p className="text-slate-600 mb-4 leading-relaxed">{role.desc}</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {role.tags.map((tag) =>
                  <span key={tag} className="bg-white border border-slate-200 text-slate-600 text-xs px-3 py-1.5 rounded-full font-medium">{tag}</span>
                  )}
                    </div>
                    <a
                  href={`mailto:careers@viralbridge.in?subject=Application: ${role.title}`}
                  className="inline-flex items-center gap-2 bg-violet-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-violet-800 transition-colors">
                  
                      Apply for this role <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
              }
              </div>
            )}
          </div>
        </div>
      </section>

      {/* No role fit CTA */}
      <section className="py-16 bg-gradient-to-br from-violet-700 to-purple-800 text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-3">Don't see the right role?</h2>
          <p className="text-violet-200 mb-6 text-lg">We're always looking for exceptional people. Send us your profile and we'll reach out when something fits.</p>
          <a
            href="mailto:careers@viralbridge.in?subject=Open Application"
            className="inline-flex items-center gap-2 bg-white text-violet-700 px-7 py-3.5 rounded-xl font-bold hover:bg-violet-50 transition-colors">
            
            Send open application <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
      </main>
      <Footer />
    </div>);

}