'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { Mail, MessageSquare, MapPin, Clock, Send, CheckCircle, Phone, ArrowRight } from 'lucide-react';

const channels = [
{ icon: MessageSquare, title: 'Live Chat', desc: 'Chat with our support team in real time', badge: 'Fastest', badgeColor: 'bg-green-100 text-green-700', action: 'Start chat' },
{ icon: Mail, title: 'Email Support', desc: 'Detailed queries and account issues', badge: '< 2 hrs', badgeColor: 'bg-blue-100 text-blue-700', action: 'Send email' },
{ icon: Phone, title: 'Phone Support', desc: 'For enterprise and urgent issues only', badge: 'Enterprise', badgeColor: 'bg-amber-100 text-amber-700', action: 'Schedule call' }];


const offices = [
{ city: 'Bengaluru (HQ)', address: '4th Floor, 91springboard, Koramangala, Bengaluru 560034', hours: 'Mon–Fri, 9am–7pm IST' },
{ city: 'Mumbai', address: 'WeWork BKC, Bandra Kurla Complex, Mumbai 400051', hours: 'Mon–Fri, 9am–7pm IST' }];


export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', type: 'General', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header />
      <main className="pt-16">

      {/* Hero Banner with Image */}
      <section className="relative bg-slate-900 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1632910088125-e85bec44bb0e"
          alt="Person typing on laptop at a clean desk with a coffee cup, representing reaching out and communication"
          fill
          className="object-cover opacity-20"
          priority />
        
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-violet-950/80" />
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <h1 className="text-5xl font-bold text-white mb-4">Get in touch</h1>
          <p className="text-xl text-slate-300 max-w-xl">Whether you're a creator, brand, or journalist — we're here to help.</p>
        </div>
      </section>

      {/* Channels */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-4">
            {channels.map((c) =>
            <div key={c.title} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-violet-200 transition-colors group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
                    <c.icon className="w-5 h-5 text-violet-700" />
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${c.badgeColor}`}>{c.badge}</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-1">{c.title}</h3>
                <p className="text-sm text-slate-500 mb-4">{c.desc}</p>
                <button className="text-violet-600 text-sm font-semibold hover:text-violet-800 flex items-center gap-1 transition-colors">
                  {c.action} <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a message</h2>
              {submitted ?
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Message received!</h3>
                  <p className="text-slate-500">We'll get back to you at <strong>{form.email}</strong> within 2 hours.</p>
                </div> :

              <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Full name</label>
                      <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300"
                      placeholder="Your name" />
                    
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
                      <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300"
                      placeholder="you@example.com" />
                    
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">I am a...</label>
                    <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 bg-white">
                    
                      <option>Creator</option>
                      <option>Brand</option>
                      <option>Press / Journalist</option>
                      <option>Investor</option>
                      <option>General inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
                    <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 resize-none"
                    placeholder="Tell us how we can help..." />
                  
                  </div>
                  <button type="submit" className="w-full bg-violet-700 text-white py-3.5 rounded-xl font-semibold hover:bg-violet-800 transition-colors flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" /> Send message
                  </button>
                </form>
              }
            </div>

            {/* Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Office image */}
              <div className="rounded-2xl overflow-hidden shadow-md">
                <Image
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_177ed801d-1784218483224.png"
                  alt="ViralBridge Bengaluru office interior with open workspace, plants, and collaborative seating areas"
                  width={700}
                  height={280}
                  className="w-full h-44 object-cover" />
                
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Our offices</h2>
                {offices.map((o) =>
                <div key={o.city} className="bg-white rounded-2xl p-5 border border-slate-100 mb-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">{o.city}</h3>
                        <p className="text-sm text-slate-500 mb-2">{o.address}</p>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400">
                          <Clock className="w-3.5 h-3.5" />{o.hours}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-violet-50 rounded-2xl p-5 border border-violet-100">
                <h3 className="font-semibold text-slate-900 mb-2">Specific contacts</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-slate-500">Support</span><a href="mailto:support@viralbridge.in" className="text-violet-600 hover:underline">support@viralbridge.in</a></div>
                  <div className="flex justify-between"><span className="text-slate-500">Press</span><a href="mailto:press@viralbridge.in" className="text-violet-600 hover:underline">press@viralbridge.in</a></div>
                  <div className="flex justify-between"><span className="text-slate-500">Partnerships</span><a href="mailto:partners@viralbridge.in" className="text-violet-600 hover:underline">partners@viralbridge.in</a></div>
                  <div className="flex justify-between"><span className="text-slate-500">Legal</span><a href="mailto:legal@viralbridge.in" className="text-violet-600 hover:underline">legal@viralbridge.in</a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </div>);

}