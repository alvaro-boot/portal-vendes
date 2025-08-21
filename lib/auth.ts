"use server"

import { cookies } from "next/headers"
import { obtenerUsuarioActual } from "./users"

const SESSION_COOKIE = "vd_session"

/**
 * Obtiene el ID del usuario actual desde las cookies de sesión
 */
export async function obtenerUserIdDeSesion(): Promise<string | null> {
  try {
    const sessionCookie = cookies().get(SESSION_COOKIE)
    return sessionCookie?.value || null
  } catch (error) {
    console.error("Error al obtener ID de sesión:", error)
    return null
  }
}

/**
 * Obtiene el usuario actual desde las cookies de sesión
 */
export async function obtenerUsuarioDeSesion() {
  try {
    const userId = await obtenerUserIdDeSesion()
    if (!userId) return null
    
    return obtenerUsuarioActual(userId)
  } catch (error) {
    console.error("Error al obtener usuario de sesión:", error)
    return null
  }
}

/**
 * Verifica si el usuario está autenticado
 */
export async function estaAutenticado(): Promise<boolean> {
  const userId = await obtenerUserIdDeSesion()
  return !!userId
}
