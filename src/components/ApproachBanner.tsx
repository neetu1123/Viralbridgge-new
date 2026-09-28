'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Mail, Sparkles, X } from 'lucide-react';
import { useAuth } from './AuthProvider';
import { getAdminBase, normalizeRole } from '@/src/lib/auth/session';
import {
  dismissNotification,
  fetchBannerNotifications,
  getApproachActionPath,
  isApproachNotification,
  markNotificationRead,
  type NotificationItem,
} from '@/src/lib/api/notifications';

export default function ApproachBanner() {
  const { user, isAuthenticated } = useAuth();
  const [queue, setQueue] = useState<NotificationItem[]>([]);
  const role = user?.role;

  const load = useCallback(async () => {
    if (!isAuthenticated || !role) return;
    try {
      const res = await fetchBannerNotifications(role);
      setQueue((res.data ?? []).filter(isApproachNotification));
    } catch {
      // Banner must never block browsing
    }
  }, [isAuthenticated, role]);

  useEffect(() => {
    void load();
    if (!isAuthenticated) return;
    const interval = window.setInterval(() => {
      void load();
    }, 45000);
    return () => window.clearInterval(interval);
  }, [isAuthenticated, load]);

  const current = queue[0] ?? null;

  const removeCurrent = () => {
    setQueue((prev) => prev.slice(1));
  };

  const handleDismiss = async () => {
    if (!current) return;
    const id = current.id;
    removeCurrent();
    try {
      await dismissNotification(id, role);
    } catch {
      // Keep the banner closed even if the API call fails
    }
  };

  const handleAction = async () => {
    if (!current) return;
    const path = getApproachActionPath(current, role);
    const id = current.id;
    removeCurrent();
    try {
      await markNotificationRead(id, role);
    } catch {
      // Continue to dashboard even if mark-read fails
    }
    window.location.assign(`${getAdminBase()}${path}`);
  };

  const isInvite =
    current?.type === 'CAMPAIGN_INVITE' || Boolean(current?.title.toLowerCase().includes('invit'));
  const isBrand = normalizeRole(role) === 'BRAND';
  const actionLabel = isBrand ? 'Review Application' : 'View Invitation';

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="pointer-events-none fixed inset-x-0 top-[5.5rem] z-[60] flex justify-center px-4"
        >
          <div
            className="pointer-events-auto w-full max-w-xl rounded-2xl border border-[#E8E0FF] bg-white/95 shadow-[0_18px_50px_rgba(123,47,247,0.16)] backdrop-blur-md"
            role="status"
            aria-live="polite"
          >
            <div className="flex items-start gap-3 px-4 py-3.5">
              <div
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-white"
                style={{ background: 'linear-gradient(135deg, #7B2FF7, #F357A8)' }}
              >
                {isInvite ? <Mail size={18} /> : <Sparkles size={18} />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#7B2FF7]">
                  {isInvite ? 'New invitation' : 'New approach'}
                </p>
                <p className="mt-0.5 text-sm font-semibold text-[#1F1F2E]">{current.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-[#6B6B8A]">{current.message}</p>
                <div className="mt-2.5 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleAction}
                    className="rounded-lg px-3 py-1.5 text-xs font-semibold text-white"
                    style={{ background: 'linear-gradient(90deg, #7B2FF7, #F357A8)' }}
                  >
                    {actionLabel}
                  </button>
                  <button
                    type="button"
                    onClick={handleDismiss}
                    className="rounded-lg px-3 py-1.5 text-xs font-medium text-[#6B6B8A] hover:bg-[#F2F3F7]"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={handleDismiss}
                className="rounded-lg p-1.5 text-[#9AA0B4] hover:bg-[#F2F3F7] hover:text-[#1F1F2E]"
                aria-label="Close notification"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
