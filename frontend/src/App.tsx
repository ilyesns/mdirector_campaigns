import { useAuth } from './features/auth/context'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'

export default function App() {
  const { user, loading } = useAuth()
  if (loading) return <p style={{ padding: 32 }}>Loading…</p>
  return user ? <HomePage /> : <LoginPage />
}