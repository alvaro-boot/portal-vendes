"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { AuthState } from "@/types/dashboard"
import { registrarUsuario, autenticarUsuario } from "@/lib/users"

const SESSION_COOKIE = "vd_session"

export async function login(state: AuthState, formData: FormData): Promise<AuthState | never> {
  const email = String(formData.get("email") || "")
  const password = String(formData.get("password") || "")
  const from = String(formData.get("from") || "/")

  if (!email || !password) {
    return { error: "Todos los campos son requeridos" }
  }

  const resultado = await autenticarUsuario({ email, password })

  if (resultado.success && resultado.usuario) {
    cookies().set(SESSION_COOKIE, resultado.usuario.id, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 24 horas
    })
    redirect(from.startsWith("/") ? from : "/")
  }

  return { error: resultado.error || "Credenciales inválidas" }
}

export async function register(state: AuthState, formData: FormData): Promise<AuthState | never> {
  const email = String(formData.get("email") || "")
  const password = String(formData.get("password") || "")
  const confirmPassword = String(formData.get("confirmPassword") || "")
  const nombres = String(formData.get("nombres") || "")
  const telefono = String(formData.get("telefono") || "")
  const documento = String(formData.get("documento") || "")
  const rolSeleccionado = String(formData.get("rolSeleccionado") || "cliente") as "admin" | "cliente"
  const claveAdmin = String(formData.get("claveAdmin") || "")
  const from = String(formData.get("from") || "/")

  if (!email || !password || !confirmPassword || !nombres || !telefono || !documento) {
    return { error: "Todos los campos son requeridos" }
  }

  // Validar que si es admin, tenga la clave
  if (rolSeleccionado === "admin" && !claveAdmin) {
    return { error: "La clave de administrador es requerida para el rol de admin" }
  }

  const resultado = await registrarUsuario({
    email,
    password,
    confirmPassword,
    nombres,
    telefono,
    documento,
    rolSeleccionado,
    claveAdmin: claveAdmin || undefined
  })

  if (resultado.success) {
    // Después del registro exitoso, iniciar sesión automáticamente
    const loginResultado = await autenticarUsuario({ email, password })
    
    if (loginResultado.success && loginResultado.usuario) {
      cookies().set(SESSION_COOKIE, loginResultado.usuario.id, {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, // 24 horas
      })
      redirect(from.startsWith("/") ? from : "/")
    }
  }

  return { error: resultado.error || "Error al registrar usuario" }
}

export async function logout() {
  cookies().set(SESSION_COOKIE, "", {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
  })
  redirect("/login")
}


