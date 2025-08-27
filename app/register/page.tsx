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

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { register } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      setLoading(false)
      return
    }

    const success = await register(name, email, password)

    if (success) {
      router.push("/dashboard")
    } else {
      setError("Error al crear la cuenta")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5 animate-pulse" />

      <Card className="w-full max-w-md relative z-10 shadow-xl animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">Portal Vendes</CardTitle>
          <CardDescription>Crea tu cuenta</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre completo</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Tu nombre"
                className="transition-all duration-200 focus:scale-105"
              />
            </div>
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
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                  Creando cuenta...
                </div>
              ) : (
                "Crear cuenta"
              )}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            ¿Ya tienes cuenta?{" "}
            <Link
              href="/login"
              className="text-primary hover:underline transition-all duration-200 hover:text-primary/80"
            >
              Inicia sesión aquí
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
