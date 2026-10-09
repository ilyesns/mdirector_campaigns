const TOKEN_KEY = 'mdc_token'

export type Role = 'admin' | 'approver' | 'recruiter'

export interface User {
  id: number
  email: string
  full_name: string
  role: Role
}

export class ApiError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const setToken = (t: string) => localStorage.setItem(TOKEN_KEY, t)
export const clearToken = () => localStorage.removeItem(TOKEN_KEY)

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers)
  const token = getToken()
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const res = await fetch(`/api${path}`, { ...options, headers })

  if (!res.ok) {
    if (res.status === 401) clearToken()
    const body = await res.json().catch(() => ({}))
    throw new ApiError(res.status, body.detail ?? res.statusText)
  }
  return res.json() as Promise<T>
}

export async function login(email: string, password: string): Promise<void> {
  // OAuth2 login expects a form, not JSON
  const body = new URLSearchParams({ username: email, password })
  const data = await apiFetch<{ access_token: string }>('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })
  setToken(data.access_token)
}

export const getMe = () => apiFetch<User>('/auth/me')