import { useState, type FormEvent } from 'react'
import { useAuth } from '../features/auth/context'

export function LoginPage() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await login(email, password)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 700, margin: '80px auto', display: 'grid', gap: 12 }}>
      <h1>Persevera Ecosistema </h1>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit" disabled={submitting}>{submitting ? 'Signing in…' : 'Sign in'}</button>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
    </form>
  )
}