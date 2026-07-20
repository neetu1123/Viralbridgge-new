import { apiFetch, ApiError } from '../api/client';
import { clearSession, setSession, type AuthUser } from './session';

function normalizeMeUser(me: Record<string, unknown>): AuthUser {
  const rawRole = me.role;
  let role: string | undefined;
  if (typeof rawRole === 'object' && rawRole && 'name' in rawRole) {
    role = String((rawRole as { name?: string }).name);
  } else if (typeof rawRole === 'string') {
    role = rawRole;
  }

  return {
    id: String(me.id),
    name: String(me.name),
    email: String(me.email),
    role: role ? role.toUpperCase() : undefined,
    avatar: typeof me.avatar === 'string' ? me.avatar : undefined,
  };
}

export async function login(email: string, password: string) {
  const result = await apiFetch<{ access_token: string; user: AuthUser }>('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const user = normalizeMeUser(result.user as unknown as Record<string, unknown>);
  setSession(result.access_token, user);
  return { ...result, user };
}

export async function register(name: string, email: string, password: string, role: string) {
  const result = await apiFetch<{ access_token: string; user: AuthUser }>('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, role }),
  });
  const user = normalizeMeUser(result.user as unknown as Record<string, unknown>);
  setSession(result.access_token, user);
  return { ...result, user };
}

export async function fetchMe(): Promise<AuthUser> {
  const me = await apiFetch<Record<string, unknown>>('/auth/me');
  return normalizeMeUser(me);
}

export async function logoutApi() {
  clearSession();
  try {
    await fetch(
      `${(process.env.NEXT_PUBLIC_API_URL || 'https://backend-admin-viralbridgge-new-three.vercel.app').replace(/\/$/, '')}/auth/logout`,
      { method: 'POST', headers: { Accept: 'application/json' } },
    );
  } catch {
    // ignore — session already cleared locally
  }
}

export function logoutInstant(): void {
  clearSession();
}

export { clearSession, getStoredUser, getToken, setSession } from './session';
export type { AuthUser } from './session';
export { ApiError };
