'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Bell,
  ChevronDown,
  Heart,
  LogOut,
  MessageCircle,
  Plus,
  User,
  LayoutDashboard,
} from 'lucide-react';
import { useAuth } from './AuthProvider';
import {
  getDashboardUrl,
  getFirstName,
  getInitials,
  getProfileUrl,
  getRoleBadge,
  normalizeRole,
} from '@/src/lib/auth/session';
import { logoutApi } from '@/src/lib/auth/api';

export default function UserMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  if (!user) return null;

  const role = normalizeRole(user.role);
  const badge = getRoleBadge(user.role);
  const dashboardUrl = getDashboardUrl(user.role);
  const profileUrl = getProfileUrl(user.role);
  const displayName = getFirstName(user.name);
  const initials = getInitials(user.name);
  const avatar = user.avatar;

  const isBrand = role === 'BRAND';
  const isAdmin = role === 'ADMIN' || role === 'SUPER_ADMIN';

  const handleLogout = () => {
    setOpen(false);
    logout();
    void logoutApi();
    window.location.replace('/');
  };

  return (
    <div className="flex items-center gap-2 md:gap-3" ref={menuRef}>
      <button
        type="button"
        className="hidden sm:flex w-9 h-9 rounded-xl border border-[#E5E7EB] bg-white items-center justify-center text-[#6B6B8A] hover:border-[#7B2FF7] hover:text-[#7B2FF7] transition-colors"
        aria-label="Notifications"
      >
        <Bell size={16} />
      </button>

      {isBrand && (
        <Link
          href="/brand/create-campaign"
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-white text-sm font-semibold"
          style={{ background: 'linear-gradient(90deg, #7B2FF7, #F357A8)' }}
        >
          <Plus size={14} /> Create Campaign
        </Link>
      )}

      {!isBrand && !isAdmin && (
        <button
          type="button"
          className="hidden sm:flex w-9 h-9 rounded-xl border border-[#E5E7EB] bg-white items-center justify-center text-[#6B6B8A] hover:border-[#7B2FF7] hover:text-[#7B2FF7] transition-colors"
          aria-label="Messages"
        >
          <MessageCircle size={16} />
        </button>
      )}

      {isBrand && (
        <button
          type="button"
          className="hidden sm:flex w-9 h-9 rounded-xl border border-[#E5E7EB] bg-white items-center justify-center text-[#F357A8] hover:border-[#F357A8] transition-colors"
          aria-label="Saved creators"
        >
          <Heart size={16} />
        </button>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-[#F2F3F7] transition-colors"
          aria-expanded={open}
          aria-haspopup="menu"
        >
          <div
            className="w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center font-display font-700 text-sm text-white"
            style={{ background: avatar ? undefined : 'linear-gradient(135deg, #7B2FF7, #F357A8)' }}
          >
            {avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              initials
            )}
          </div>
          <span className="hidden md:block font-medium text-[#1F1F2E] text-sm max-w-[120px] truncate">
            {displayName}
          </span>
          <ChevronDown size={14} className={`text-[#9AA0B4] transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>

        {open && (
          <div
            className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl border border-[#E5E7EB] shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200"
            role="menu"
          >
            <div className="p-4 border-b border-[#F2F3F7]" style={{ background: 'linear-gradient(135deg, #F8F7FC 0%, #EFEAFF 100%)' }}>
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center font-display font-700 text-white"
                  style={{ background: avatar ? undefined : 'linear-gradient(135deg, #7B2FF7, #F357A8)' }}
                >
                  {avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    initials
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-display font-700 text-[#1F1F2E] truncate">{user.name}</p>
                  {badge && (
                    <p className="text-xs text-[#7B2FF7] font-semibold mt-0.5">
                      {badge.emoji} {badge.label}
                    </p>
                  )}
                  <p className="text-xs text-[#9AA0B4] truncate mt-0.5">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="p-2">
              <a
                href={dashboardUrl}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-[#1F1F2E] hover:bg-[#F2F3F7] transition-colors"
                role="menuitem"
              >
                <LayoutDashboard size={16} className="text-[#7B2FF7]" />
                {isBrand ? 'Brand Dashboard' : isAdmin ? 'Admin Dashboard' : 'My Dashboard'}
              </a>
              <a
                href={profileUrl}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-[#1F1F2E] hover:bg-[#F2F3F7] transition-colors"
                role="menuitem"
              >
                <User size={16} className="text-[#7B2FF7]" />
                {isBrand ? 'Company Profile' : 'My Profile'}
              </a>
            </div>

            <div className="p-2 border-t border-[#F2F3F7]">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-red-600 hover:bg-red-50 transition-colors"
                role="menuitem"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
