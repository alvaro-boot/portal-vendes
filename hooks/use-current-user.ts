"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Usuario } from "@/types/dashboard"
import { puedeCrearPaginaWeb, tienePaginaWeb, obtenerPaginaWebId } from "@/lib/users"

// Cache global para el usuario
let userCache: { usuario: Usuario | null; timestamp: number } | null = null
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutos

export function useCurrentUser() {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [loading, setLoading] = useState(true)

  const obtenerUsuarioActual = useCallback(async (forceRefresh = false) => {
    try {
      // Verificar caché si no es un refresh forzado
      if (!forceRefresh && userCache && (Date.now() - userCache.timestamp) < CACHE_DURATION) {
        setUsuario(userCache.usuario)
        setLoading(false)
        return
      }

      const response = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success && data.usuario) {
          // Actualizar caché
          userCache = {
            usuario: data.usuario,
            timestamp: Date.now()
          }
          setUsuario(data.usuario)
        } else {
          userCache = { usuario: null, timestamp: Date.now() }
          setUsuario(null)
        }
      } else if (response.status === 401) {
        userCache = { usuario: null, timestamp: Date.now() }
        setUsuario(null)
      } else {
        console.error("Error al obtener usuario:", response.statusText)
        setUsuario(null)
      }
    } catch (error) {
      console.error("Error al obtener usuario actual:", error)
      setUsuario(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    obtenerUsuarioActual()
  }, [obtenerUsuarioActual])

  // Memoizar las propiedades del usuario para evitar recálculos innecesarios
  const userProperties = useMemo(() => {
    const esAdmin = usuario?.rol === "admin"
    const esCliente = usuario?.rol === "cliente"
    const puedeCrearPagina = usuario ? puedeCrearPaginaWeb(usuario.email) : false
    const tienePagina = usuario ? tienePaginaWeb(usuario.email) : false
    const paginaWebId = usuario ? obtenerPaginaWebId(usuario.email) : undefined

    return {
      esAdmin,
      esCliente,
      puedeCrearPagina,
      tienePagina,
      paginaWebId
    }
  }, [usuario])

  // Memoizar las opciones de navegación
  const opcionesNavegacion = useMemo(() => ({
    dashboard: userProperties.esAdmin || userProperties.puedeCrearPagina,
    analytics: true,
    siteBuilder: userProperties.esAdmin || userProperties.puedeCrearPagina,
    store: true,
    settings: true,
    usuarios: userProperties.esAdmin
  }), [userProperties])

  // Función para refrescar la información del usuario
  const refrescarUsuario = useCallback(async () => {
    setLoading(true)
    await obtenerUsuarioActual(true)
  }, [obtenerUsuarioActual])

  return {
    usuario,
    loading,
    ...userProperties,
    opcionesNavegacion,
    refrescarUsuario
  }
}
