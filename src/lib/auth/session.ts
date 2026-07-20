export type UserRole = 'CREATOR' | 'BRAND' | 'ADMIN' | 'SUPER_ADMIN' | string;

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role?: UserRole;
  avatar?: string;
}

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function setSession(token: string, user: AuthUser): void {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearSession(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

export function getFirstName(name: string): string {
  return name.trim().split(/\s+/)[0] || name;
}

export function normalizeRole(role?: string): UserRole | undefined {
  if (!role) return undefined;
  return role.toUpperCase();
}

export function getDashboardUrl(role?: string): string {
  const adminBase = process.env.NEXT_PUBLIC_ADMIN_URL || 'https://admin-viralbridgge-new.vercel.app';
  const normalized = normalizeRole(role);
  if (normalized === 'BRAND') return `${adminBase}/brand/dashboard`;
  if (normalized === 'ADMIN' || normalized === 'SUPER_ADMIN') return `${adminBase}/admin/dashboard`;
  return `${adminBase}/creator/dashboard`;
}

export function getRoleBadge(role?: string): { label: string; emoji: string } | null {
  const normalized = normalizeRole(role);
  if (normalized === 'CREATOR') return { label: 'Verified Creator', emoji: '✔' };
  if (normalized === 'BRAND') return { label: 'Brand Account', emoji: '🏢' };
  if (normalized === 'ADMIN' || normalized === 'SUPER_ADMIN') return { label: 'Admin', emoji: '🛠' };
  return null;
}
