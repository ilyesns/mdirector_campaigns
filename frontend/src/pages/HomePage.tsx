import { useAuth } from '../features/auth/context'

export function HomePage() {
  const { user, logout } = useAuth()
  return (
    <div style={{ padding: 32 }}>
      <h1>Welcome, {user?.full_name}</h1>
      <p>Role: {user?.role}</p>
      <button onClick={logout}>Log out</button>
    </div>
  )
}