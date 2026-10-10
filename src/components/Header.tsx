'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from './ui/AppLogo';
import UserMenu from './UserMenu';
import { useAuth } from './AuthProvider';
import { buildAdminLoginUrl, buildBrandListingLoginUrl } from '@/src/lib/auth/sso';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const { user, loading, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Discover', href: '/discover' },
    { label: 'Campaign', href: '/explore/campaigns-v2' },
    { label: 'Creators', href: '/explore/creators-v2' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Services', href: '/services' },
  ];

  const adminLoginUrl = buildAdminLoginUrl('/explore/creators-v2');
  const getFreeListUrl = buildBrandListingLoginUrl();

  return (
    <>
      <motion.header
        initial={reduceMotion ? false : { y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 h-16 border-b transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-[#E5E7EB] shadow-sm'
            : 'bg-white/90 backdrop-blur-sm border-transparent'
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10 h-full grid grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center gap-4">
          <Link href="/" className="justify-self-start flex items-center h-14">
            <AppLogo
              src="/viralbridge_logo_transparent.png"
              size={220}
              className="h-14 w-auto max-w-[220px]"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
          </Link>

          <nav className="hidden lg:flex items-center justify-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={`nav-${link.label}`}
                href={link.href}
                className="text-[#6B6B8A] hover:text-[#1F1F2E] font-medium text-[15px] leading-none whitespace-nowrap transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="justify-self-end flex items-center gap-2.5 h-10">
            <a
              href={getFreeListUrl}
              className="inline-flex items-center justify-center h-10 px-4 rounded-full border border-[#7B2FF7] text-[#7B2FF7] bg-white text-sm font-semibold whitespace-nowrap hover:bg-[#EFEAFF] transition-colors"
            >
              Get Free List
            </a>
            {loading ? (
              <div className="hidden md:block w-24 h-10 rounded-xl bg-[#F2F3F7] animate-pulse" />
            ) : isAuthenticated && user ? (
              <div className="hidden md:flex items-center h-10">
                <UserMenu />
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2 h-10">
                <a
                  href={adminLoginUrl}
                  className="inline-flex items-center h-10 px-3 text-[#6B6B8A] hover:text-[#1F1F2E] font-medium text-[15px] leading-none transition-colors"
                >
                  Login
                </a>
                <a
                  href={adminLoginUrl}
                  className="inline-flex items-center justify-center h-10 px-4 rounded-full bg-[#7B2FF7] text-white text-sm font-semibold whitespace-nowrap hover:bg-[#6D28D9] transition-colors"
                >
                  Sign Up Free
                </a>
              </div>
            )}
            <button
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl hover:bg-[#F2F3F7] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
            {mobileOpen ? (
              <X size={22} className="text-[#1F1F2E]" />
            ) : (
              <Menu size={22} className="text-[#1F1F2E]" />
            )}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen ? (
      <motion.div
        className="fixed inset-0 z-40 lg:hidden"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
      >
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <motion.div
          initial={reduceMotion ? false : { x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
          className="absolute top-0 right-0 h-full w-72 bg-white shadow-xl"
        >
          <div className="p-6 pt-20 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={`mobile-nav-${link.label}`}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-[#1F1F2E] font-medium text-base py-3 px-4 rounded-xl hover:bg-[#F2F3F7] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <hr className="my-4 border-[#E5E7EB]" />
            <a
              href={getFreeListUrl}
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center h-11 px-4 rounded-full border border-[#7B2FF7] text-[#7B2FF7] bg-white text-sm font-semibold"
            >
              Get Free List
            </a>
            {!loading && isAuthenticated && user ? (
              <>
                <p className="px-4 text-sm text-[#6B6B8A]">Signed in as {user.name}</p>
                <button
                  onClick={async () => {
                    await logout();
                    setMobileOpen(false);
                    window.location.href = '/';
                  }}
                  className="text-red-600 font-medium text-base py-3 px-4 rounded-xl hover:bg-red-50 transition-colors text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <a
                  href={adminLoginUrl}
                  onClick={() => setMobileOpen(false)}
                  className="text-[#6B6B8A] font-medium text-base py-3 px-4 rounded-xl hover:bg-[#F2F3F7] transition-colors"
                >
                  Login
                </a>
                <a
                  href={adminLoginUrl}
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary text-center mt-2"
                >
                  Sign Up Free
                </a>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
