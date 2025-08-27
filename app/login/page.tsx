"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const success = await login(email, password)

    if (success) {
      router.push("/dashboard")
    } else {
      setError("Credenciales inválidas")
    }

    setLoading(false)
  }

  const fillTestCredentials = () => {
    setEmail("admin@portalvendes.com")
    setPassword("admin123")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 animate-pulse" />

      <Card className="w-full max-w-md relative z-10 shadow-xl animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">Portal Vendes</CardTitle>
          <CardDescription>Inicia sesión en tu cuenta</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-4 bg-secondary/10 rounded-lg border border-secondary/20">
            <div className="text-sm font-medium text-secondary mb-2">🧪 Credenciales de Prueba</div>
            <div className="text-xs text-muted-foreground space-y-1">
              <div>
                <strong>Email:</strong> admin@portalvendes.com
              </div>
              <div>
                <strong>Contraseña:</strong> admin123
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={fillTestCredentials}
              className="mt-2 w-full text-xs hover:bg-secondary/10 bg-transparent"
            >
              Usar credenciales de prueba
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="tu@email.com"
                className="transition-all duration-200 focus:scale-105"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="transition-all duration-200 focus:scale-105"
              />
            </div>
            {error && (
              <div className="text-destructive text-sm text-center animate-in slide-in-from-top-2 duration-300">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full transition-all duration-200 hover:scale-105" disabled={loading}>
              {loading ? (
                <div className="flex items-center gap-2">
                  <LoadingSpinner size="sm" />
                  Iniciando sesión...
                </div>
              ) : (
                "Iniciar sesión"
              )}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            ¿No tienes cuenta?{" "}
            <Link
              href="/register"
              className="text-primary hover:underline transition-all duration-200 hover:text-primary/80"
            >
              Regístrate aquí
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
