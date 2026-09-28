import { apiFetch } from './client';
import { normalizeRole } from '@/src/lib/auth/session';

export interface NotificationItem {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  entity_type?: string | null;
  entity_id?: string | null;
  metadata?: Record<string, unknown> | null;
  is_read: boolean;
  is_dismissed?: boolean;
  created_at: string;
}

export interface NotificationBannerResponse {
  data: NotificationItem[];
}

function prefixForRole(role?: string): '/brand' | '/creator' | '/admin' {
  const normalized = normalizeRole(role);
  if (normalized === 'BRAND') return '/brand';
  if (normalized === 'ADMIN' || normalized === 'SUPER_ADMIN') return '/admin';
  return '/creator';
}

export function fetchBannerNotifications(role?: string) {
  return apiFetch<NotificationBannerResponse>(`${prefixForRole(role)}/notifications/banner`);
}

export function fetchUnreadNotificationCount(role?: string) {
  return apiFetch<{ count: number }>(`${prefixForRole(role)}/notifications/unread-count`);
}

export function dismissNotification(id: string, role?: string) {
  return apiFetch(`${prefixForRole(role)}/notifications/${id}/dismiss`, { method: 'PATCH' });
}

export function markNotificationRead(id: string, role?: string) {
  return apiFetch(`${prefixForRole(role)}/notifications/${id}/read`, { method: 'PATCH' });
}

export function isApproachNotification(notif: NotificationItem): boolean {
  if (notif.type === 'CAMPAIGN_INVITE' || notif.type === 'CAMPAIGN_APPLICATION') return true;
  const title = notif.title.toLowerCase();
  const message = notif.message.toLowerCase();
  return (
    title.includes('campaign invitation') ||
    title.includes('new campaign application') ||
    message.includes('invited to apply') ||
    /\bapplied to\b/.test(message)
  );
}

export function getApproachActionPath(notif: NotificationItem, role?: string): string {
  const normalized = normalizeRole(role);
  const meta = (notif.metadata ?? {}) as {
    campaignId?: string;
    campaign_id?: string;
    applicationId?: string;
    application_id?: string;
  };
  const campaignId = meta.campaignId ?? meta.campaign_id ?? '';
  const applicationId = meta.applicationId ?? meta.application_id ?? notif.entity_id ?? '';

  if (normalized === 'BRAND') {
    if (applicationId) return `/brand-applicant/${applicationId}`;
    return '/brand-applicant';
  }

  if (campaignId) return `/campaign-discovery?apply=${campaignId}`;
  return '/creator-notifications';
}
