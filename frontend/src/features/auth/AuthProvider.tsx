import { useEffect, useState, type ReactNode } from 'react'
import { clearToken, getMe, getToken, login as apiLogin, type User } from '../../api/client'
import { AuthContext } from './context'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // On page load: if a token is saved, check it's still valid
    if (!getToken()) {
      setLoading(false)
      return
    }
    getMe()
      .then(setUser)
      .catch(() => clearToken())
      .finally(() => setLoading(false))
  }, [])

  async function login(email: string, password: string) {
    await apiLogin(email, password)
    setUser(await getMe())
  }

  function logout() {
    clearToken()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}