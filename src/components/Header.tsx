'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from './ui/AppLogo';
import UserMenu from './UserMenu';
import { useAuth } from './AuthProvider';
import { buildAdminLoginUrl, buildBrandListingLoginUrl } from '@/src/lib/auth/sso';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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
      <header
        className={`fixed pt-4 top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-nav'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-3 flex-nowrap">
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <AppLogo
              src="/viralbridge_logo_transparent.png"
              size={150}
              className="text-primary"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={`nav-${link.label}`}
                href={link.href}
                className="text-[#6B6B8A] hover:text-[#1F1F2E] font-medium text-[15px] transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={getFreeListUrl}
              className="btn-secondary text-sm px-3.5 py-2 inline-block whitespace-nowrap"
            >
              Get Free List
            </a>
            {loading ? (
              <div className="hidden md:block w-24 h-9 rounded-xl bg-[#F2F3F7] animate-pulse" />
            ) : isAuthenticated && user ? (
              <div className="hidden md:block">
                <UserMenu />
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <a
                  href={adminLoginUrl}
                  className="text-[#6B6B8A] hover:text-[#1F1F2E] font-medium text-[15px] transition-colors duration-150 px-3 py-2"
                >
                  Login
                </a>
                <a
                  href={adminLoginUrl}
                  className="btn-primary text-sm px-4 py-2 inline-block whitespace-nowrap"
                >
                  Sign Up Free
                </a>
              </div>
            )}
            <button
              className="lg:hidden p-2 rounded-xl hover:bg-[#F2F3F7] transition-colors"
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
      </header>

      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-white shadow-xl transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
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
              className="btn-secondary text-center"
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
        </div>
      </div>
    </>
  );
}
