import { useState, useEffect } from 'react'
import { login as serverLogin, logout as serverLogout, getUser as serverGetUser } from '@/lib/auth'
import Cookies from 'js-cookie'

export function useAuth() {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedToken = Cookies.get('token')
    if (storedToken) {
      setToken(storedToken)
      fetchUserData(storedToken)
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUserData = async (token: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      } else {
        // If the token is invalid, clear it
        Cookies.remove('token')
        setToken(null)
        setUser(null)
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
      // If there's an error, clear the token
      Cookies.remove('token')
      setToken(null)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    const result = await serverLogin(email, password)
    if (result.success && result.token) {
      Cookies.set('token', result.token, { 
        expires: 1,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      })
      setToken(result.token)
      await fetchUserData(result.token)
    }
    return result
  }

  const logout = async () => {
    await serverLogout()
    Cookies.remove('token', { path: '/' })
    setToken(null)
    setUser(null)
  }

  return {
    token,
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!token,
  }
} 