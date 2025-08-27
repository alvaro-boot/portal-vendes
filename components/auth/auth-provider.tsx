"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const TEST_CREDENTIALS = {
  email: "admin@portalvendes.com",
  password: "admin123",
  name: "Administrador Portal",
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for existing session on mount
    const token = localStorage.getItem("auth-token")
    const userData = localStorage.getItem("user-data")

    if (token && userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (error) {
        localStorage.removeItem("auth-token")
        localStorage.removeItem("user-data")
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      if (email === TEST_CREDENTIALS.email && password === TEST_CREDENTIALS.password) {
        const testUser = {
          id: "test-admin-1",
          email: TEST_CREDENTIALS.email,
          name: TEST_CREDENTIALS.name,
        }

        const mockToken = "test-admin-token"

        localStorage.setItem("auth-token", mockToken)
        localStorage.setItem("user-data", JSON.stringify(testUser))
        setUser(testUser)

        return true
      }

      // Simulate API call for other users - replace with actual authentication
      if (email && password) {
        const mockUser = {
          id: "1",
          email,
          name: email.split("@")[0],
        }

        const mockToken = "mock-jwt-token"

        localStorage.setItem("auth-token", mockToken)
        localStorage.setItem("user-data", JSON.stringify(mockUser))
        setUser(mockUser)

        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call - replace with actual registration
      if (name && email && password) {
        const mockUser = {
          id: Date.now().toString(),
          email,
          name,
        }

        const mockToken = "mock-jwt-token"

        localStorage.setItem("auth-token", mockToken)
        localStorage.setItem("user-data", JSON.stringify(mockUser))
        setUser(mockUser)

        return true
      }
      return false
    } catch (error) {
      console.error("Registration error:", error)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("auth-token")
    localStorage.removeItem("user-data")
    setUser(null)
    router.push("/login")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
