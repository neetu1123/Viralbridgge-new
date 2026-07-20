import type { ApiResponse } from './types';

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://backend-admin-viralbridgge-new-three.vercel.app';

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

export async function apiFetch<T>(
  path: string,
  options?: RequestInit,
  attempt = 1,
): Promise<T> {
  const url = `${BASE_URL.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`;
  const token = getToken();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);

  let response: Response;
  try {
    response = await fetch(url, {
      ...options,
      headers: {
        Accept: 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options?.headers ?? {}),
      },
      signal: controller.signal,
      cache: 'no-store',
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError('Request timed out. The API may still be starting — try again in a few seconds.');
    }
    throw new ApiError('Cannot reach API. Check NEXT_PUBLIC_API_URL and backend deployment.');
  } finally {
    clearTimeout(timeout);
  }

  if (response.status === 503 && attempt < 3) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return apiFetch<T>(path, options, attempt + 1);
  }

  const payload = (await response.json()) as ApiResponse<T> | { message?: string };

  if (!response.ok) {
    throw new ApiError(
      ('message' in payload && payload.message) || `Request failed (${response.status})`,
      response.status,
    );
  }

  if ('success' in payload && payload.success) {
    return payload.data;
  }

  return payload as T;
}

export function buildQuery(params: Record<string, string | number | undefined | null>): string {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      search.set(key, String(value));
    }
  });
  const qs = search.toString();
  return qs ? `?${qs}` : '';
}
