"use client"

import * as React from "react"
import { useActionState } from "react"
import { useSearchParams } from "next/navigation"
import { login, register } from "./actions"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { VendesLogo } from "@/components/ui/vendes-logo"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { AuthState } from "@/types/dashboard"

const initialState: AuthState = {}

export default function LoginPage() {
  const searchParams = useSearchParams()
  const from = searchParams.get("from") || "/"
  const [isRegister, setIsRegister] = React.useState(false)
  const [rolSeleccionado, setRolSeleccionado] = React.useState<"admin" | "cliente">("cliente")
  const [loginState, loginAction, loginPending] = useActionState(login, initialState)
  const [registerState, registerAction, registerPending] = useActionState(register, initialState)

  const pending = loginPending || registerPending
  const state = isRegister ? registerState : loginState

  return (
    <div className="min-h-screen vendes-background p-4">
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5 md:grid-cols-2">
        {/* Panel de marca */}
        <div className="relative hidden items-center justify-center vendes-bg-primary p-8 text-white md:flex">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(169,240,77,0.25),transparent_40%)]" />
          <div className="relative z-10 max-w-sm space-y-4">
            <VendesLogo size="2xl" className="text-white" />
            <h2 className="text-2xl font-semibold leading-tight">
              {isRegister ? "Únete a Vendes" : "Bienvenido al dashboard de Vendes"}
            </h2>
            <p className="text-purple-100">
              {isRegister 
                ? "Crea tu cuenta y comienza a configurar tu comercio en línea con tu identidad de marca."
                : "Configura tu comercio en pocos pasos y comienza a vender en línea. Todo con tu identidad de marca."
              }
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-white/10 p-3">
                <p className="font-medium">Colores de marca</p>
                <p className="text-purple-200">Morado y Verde Vendes</p>
              </div>
              <div className="rounded-lg bg-white/10 p-3">
                <p className="font-medium">Experiencia simple</p>
                <p className="text-purple-200">Diseño claro y moderno</p>
              </div>
            </div>
          </div>
        </div>

        {/* Panel del formulario */}
        <div className="p-6 md:p-8">
          <div className="mb-8 flex items-center gap-2 md:hidden">
            <VendesLogo size="xl" className="vendes-text-primary" />
            <span className="sr-only">Vendes</span>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-semibold vendes-text-dark">
              {isRegister ? "Crear cuenta" : "Iniciar sesión"}
            </h1>
            <p className="text-sm vendes-text-neutral">
              {isRegister 
                ? "Completa tus datos para crear tu cuenta"
                : "Accede con tus credenciales"
              }
            </p>
          </div>

          <form action={isRegister ? registerAction : loginAction} className="space-y-5">
            <input type="hidden" name="from" value={from} />
            {isRegister && <input type="hidden" name="rolSeleccionado" value={rolSeleccionado} />}
            
            {isRegister && (
              <div className="space-y-2">
                <label htmlFor="nombres" className="text-sm font-medium vendes-text-dark">
                  Nombres completos
                </label>
                <Input
                  id="nombres"
                  name="nombres"
                  type="text"
                  placeholder="Tu nombre completo"
                  required
                  disabled={pending}
                  className="vendes-input h-11"
                />
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium vendes-text-dark">
                Correo electrónico
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder={isRegister ? "tu@email.com" : "demo@vendes.com"}
                required
                autoFocus={!isRegister}
                disabled={pending}
                className="vendes-input h-11"
              />
            </div>

            {isRegister && (
              <div className="space-y-2">
                <label htmlFor="telefono" className="text-sm font-medium vendes-text-dark">
                  Número de teléfono
                </label>
                <Input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  placeholder="3001234567"
                  required
                  disabled={pending}
                  className="vendes-input h-11"
                />
              </div>
            )}

            {isRegister && (
              <div className="space-y-2">
                <label htmlFor="documento" className="text-sm font-medium vendes-text-dark">
                  Número de documento
                </label>
                <Input
                  id="documento"
                  name="documento"
                  type="text"
                  placeholder="12345678"
                  required
                  disabled={pending}
                  className="vendes-input h-11"
                />
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium vendes-text-dark">
                Contraseña
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder={isRegister ? "Mínimo 6 caracteres" : "demo123"}
                required
                disabled={pending}
                className="vendes-input h-11"
              />
            </div>

            {isRegister && (
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium vendes-text-dark">
                  Confirmar contraseña
                </label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Repite tu contraseña"
                  required
                  disabled={pending}
                  className="vendes-input h-11"
                />
              </div>
            )}

            {isRegister && (
              <div className="space-y-3">
                <label className="text-sm font-medium vendes-text-dark">
                  Tipo de cuenta
                </label>
                <RadioGroup
                  value={rolSeleccionado}
                  onValueChange={(value) => setRolSeleccionado(value as "admin" | "cliente")}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cliente" id="cliente" />
                    <Label htmlFor="cliente" className="cursor-pointer">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">👤</span>
                        <div>
                          <span className="font-medium">Cliente</span>
                          <p className="text-xs vendes-text-neutral">Acceso básico al portal</p>
                        </div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="admin" id="admin" />
                    <Label htmlFor="admin" className="cursor-pointer">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">👑</span>
                        <div>
                          <span className="font-medium">Administrador</span>
                          <p className="text-xs vendes-text-neutral">Acceso completo al sistema</p>
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {isRegister && rolSeleccionado === "admin" && (
              <div className="space-y-2">
                <label htmlFor="claveAdmin" className="text-sm font-medium vendes-text-dark">
                  Clave de administrador *
                </label>
                <Input
                  id="claveAdmin"
                  name="claveAdmin"
                  type="password"
                  placeholder="1, 2, 3 o 4"
                  required
                  disabled={pending}
                  className="vendes-input h-11"
                />
                <p className="text-xs vendes-text-neutral">
                  Ingresa una de las claves válidas para obtener permisos de administrador
                </p>
              </div>
            )}

            {state?.error ? (
              <Alert variant="destructive">
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            ) : null}

            <Button
              type="submit"
              className="vendes-button-primary w-full h-11"
              disabled={pending}
            >
              {pending 
                ? (isRegister ? "Creando cuenta..." : "Accediendo...") 
                : (isRegister ? "Crear cuenta" : "Entrar")
              }
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setIsRegister(!isRegister)
                  setRolSeleccionado("cliente") // Reset al cambiar modo
                }}
                className="text-sm vendes-text-primary hover:underline"
                disabled={pending}
              >
                {isRegister 
                  ? "¿Ya tienes cuenta? Inicia sesión" 
                  : "¿No tienes cuenta? Regístrate"
                }
              </button>
            </div>

            {!isRegister && (
              <div className="rounded-lg vendes-border vendes-bg-neutral/40 p-3 text-xs vendes-text-neutral">
                <p className="mb-1 font-semibold vendes-text-dark">Credenciales demo</p>
                <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                  <p>
                    <span className="font-medium">Email:</span> demo@vendes.com
                  </p>
                  <p>
                    <span className="font-medium">Password:</span> demo123
                  </p>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-1 sm:grid-cols-2">
                  <p>
                    <span className="font-medium">Email:</span> admin@vendes.com
                  </p>
                  <p>
                    <span className="font-medium">Password:</span> admin123
                  </p>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-1 sm:grid-cols-2">
                  <p>
                    <span className="font-medium">Email:</span> test@vendes.com
                  </p>
                  <p>
                    <span className="font-medium">Password:</span> test123
                  </p>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}


