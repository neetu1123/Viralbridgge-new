import { getAdminBase, getStoredUser, normalizeRole } from './session';
import { markLoggedOut } from './sso';

export function buildMarketingLogoutUrl(): string {
  const adminBase = getAdminBase();
  const marketingBase = (process.env.NEXT_PUBLIC_MARKETING_URL || 'https://viralbridgge-new.vercel.app').replace(/\/$/, '');
  return `${adminBase}/auth/logout?returnUrl=${encodeURIComponent(`${marketingBase}/`)}`;
}

export function performMarketingLogout(): void {
  markLoggedOut();
}

function normalizeAdminPath(path: string): string {
  return path.startsWith('/') ? path : `/${path}`;
}

/** Admin portal path after login (client portal). */
export function buildAdminPortalUrl(path: string): string {
  return `${getAdminBase()}${normalizeAdminPath(path)}`;
}

/** Login on admin portal, then redirect to client action path. */
export function buildAdminLoginForAction(adminPath: string): string {
  const adminBase = getAdminBase();
  return `${adminBase}/sign-up-login-screen?redirect=${encodeURIComponent(normalizeAdminPath(adminPath))}`;
}

export function goToAdminPortal(adminPath: string): void {
  const user = getStoredUser();
  const adminBase = getAdminBase();
  const safePath = normalizeAdminPath(adminPath);

  if (!user) {
    window.location.href = buildAdminLoginForAction(safePath);
    return;
  }

  const receiveUrl = `${adminBase}/auth/receive?next=${encodeURIComponent(safePath)}`;
  const marketingBase = (process.env.NEXT_PUBLIC_MARKETING_URL || 'https://viralbridgge-new.vercel.app').replace(/\/$/, '');
  window.location.href = `${marketingBase}/auth/bridge?returnUrl=${encodeURIComponent(receiveUrl)}`;
}

export function handleApplyCampaign(campaignId: string, onWrongRole?: (message: string) => void): void {
  const user = getStoredUser();
  const role = normalizeRole(user?.role);
  const path = `/campaign-discovery/apply/${encodeURIComponent(campaignId)}`;

  if (!user) {
    window.location.href = buildAdminLoginForAction(path);
    return;
  }
  if (role !== 'CREATOR') {
    onWrongRole?.('Only creator accounts can apply to campaigns.');
    return;
  }
  goToAdminPortal(path);
}

export function handleInviteCreator(creatorId: string, onWrongRole?: (message: string) => void): void {
  const user = getStoredUser();
  const role = normalizeRole(user?.role);
  const path = `/creator-discovery?invite=${encodeURIComponent(creatorId)}`;

  if (!user) {
    window.location.href = buildAdminLoginForAction(path);
    return;
  }
  if (role !== 'BRAND') {
    onWrongRole?.('Only brand accounts can invite creators.');
    return;
  }
  goToAdminPortal(path);
}
