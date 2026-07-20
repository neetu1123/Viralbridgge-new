import { apiFetch } from '../api/client';
import { clearSession, setSession, type AuthUser } from './session';

export async function login(email: string, password: string) {
  const result = await apiFetch<{ access_token: string; user: AuthUser }>('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  setSession(result.access_token, result.user);
  return result;
}

export async function register(name: string, email: string, password: string, role: string) {
  const result = await apiFetch<{ access_token: string; user: AuthUser }>('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, role }),
  });
  setSession(result.access_token, result.user);
  return result;
}

export async function fetchMe() {
  return apiFetch<AuthUser>('/auth/me');
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
