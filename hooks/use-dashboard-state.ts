"use client"

/**
 * Hook personalizado para manejar el estado del dashboard
 *
 * Centraliza toda la lógica de estado del dashboard, incluyendo:
 * - Navegación entre secciones
 * - Persistencia de datos
 * - Validación de completitud
 * - Auto-navegación
 */

import { useState, useCallback, useMemo } from "react"
import type {
  DashboardSection,
  DashboardState,
  IdentidadComercio,
  PersonalizacionPlantilla,
  Producto,
  InformacionNosotros,
  Testimonio,
} from "@/types/dashboard"
import { DASHBOARD_SECTIONS, VENDES_COLORS } from "@/constants/dashboard"

/** Estado inicial del dashboard */
const INITIAL_STATE: DashboardState = {
  activeSection: "constructor",
  completedSections: [],
  identidad: {
    nombreComercio: "",
    plantilla: "moderno",
    tipodominio: "subdominio",
    subdominio: "micomercio",
    dominioPropio: "",
    colorPrimario: VENDES_COLORS.PRIMARY,
    colorSecundario: VENDES_COLORS.SECONDARY,
    logo: null,
  },
  personalizacion: {
    imagenBanner: null,
    fraseDestacada: "",
    ofrecerServicios: false,
  },
  productos: [],
  nosotros: {
    quienesSomos: "",
    mision: "",
  },
  testimonios: [
    {
      id: "1",
      nombre: "María González",
      resena: "Excelente servicio y productos de calidad. Siempre encuentro lo que busco.",
      rol: "Cliente frecuente",
      destacado: true,
    },
    {
      id: "2",
      nombre: "Carlos Ruiz",
      resena: "La atención al cliente es fantástica. Entrega rápida y producto tal como se describe.",
      rol: "Comprador online",
      destacado: false,
    },
  ],
}

/**
 * Hook para manejar el estado completo del dashboard
 *
 * @returns Objeto con estado y funciones para manipular el dashboard
 */
export function useDashboardState() {
  const [state, setState] = useState<DashboardState>(INITIAL_STATE)

  /**
   * Cambia la sección activa del dashboard
   */
  const setActiveSection = useCallback((section: DashboardSection) => {
    setState((prev) => ({
      ...prev,
      activeSection: section,
    }))
  }, [])

  /**
   * Marca una sección como completada y navega automáticamente a la siguiente
   */
  const markSectionComplete = useCallback((section: DashboardSection) => {
    setState((prev) => {
      const newCompletedSections = prev.completedSections.includes(section)
        ? prev.completedSections
        : [...prev.completedSections, section]

      // Auto-navegación a la siguiente sección
      const currentIndex = DASHBOARD_SECTIONS.indexOf(section)
      const nextSection = DASHBOARD_SECTIONS[currentIndex + 1]
      const newActiveSection = nextSection || section

      return {
        ...prev,
        completedSections: newCompletedSections,
        activeSection: newActiveSection,
      }
    })
  }, [])

  /**
   * Actualiza los datos de identidad del comercio
   */
  const updateIdentidad = useCallback((identidad: Partial<IdentidadComercio>) => {
    setState((prev) => ({
      ...prev,
      identidad: { ...prev.identidad, ...identidad },
    }))
  }, [])

  /**
   * Actualiza los datos de personalización
   */
  const updatePersonalizacion = useCallback((personalizacion: Partial<PersonalizacionPlantilla>) => {
    setState((prev) => ({
      ...prev,
      personalizacion: { ...prev.personalizacion, ...personalizacion },
    }))
  }, [])

  /**
   * Actualiza la lista de productos
   */
  const updateProductos = useCallback((productos: Producto[]) => {
    setState((prev) => ({
      ...prev,
      productos,
    }))
  }, [])

  /**
   * Actualiza la información corporativa
   */
  const updateNosotros = useCallback((nosotros: Partial<InformacionNosotros>) => {
    setState((prev) => ({
      ...prev,
      nosotros: { ...prev.nosotros, ...nosotros },
    }))
  }, [])

  /**
   * Actualiza la lista de testimonios
   */
  const updateTestimonios = useCallback((testimonios: Testimonio[]) => {
    setState((prev) => ({
      ...prev,
      testimonios,
    }))
  }, [])

  /**
   * Actualiza los datos del constructor de sitios
   */
  const updateConstructor = useCallback((constructorData: any) => {
    setState((prev) => ({
      ...prev,
      constructor: constructorData,
    }))
  }, [])

  /**
   * Calcula el porcentaje de progreso completado
   */
  const progressPercentage = useMemo(() => {
    return (state.completedSections.length / DASHBOARD_SECTIONS.length) * 100
  }, [state.completedSections.length])

  /**
   * Verifica si una sección específica está completada
   */
  const isSectionCompleted = useCallback(
    (section: DashboardSection) => {
      return state.completedSections.includes(section)
    },
    [state.completedSections],
  )

  /**
   * Obtiene la siguiente sección disponible
   */
  const getNextSection = useCallback((currentSection: DashboardSection) => {
    const currentIndex = DASHBOARD_SECTIONS.indexOf(currentSection)
    return DASHBOARD_SECTIONS[currentIndex + 1] || null
  }, [])

  /**
   * Obtiene la sección anterior
   */
  const getPreviousSection = useCallback((currentSection: DashboardSection) => {
    const currentIndex = DASHBOARD_SECTIONS.indexOf(currentSection)
    return currentIndex > 0 ? DASHBOARD_SECTIONS[currentIndex - 1] : null
  }, [])

  return {
    // Estado
    ...state,
    progressPercentage,

    // Acciones
    setActiveSection,
    markSectionComplete,
    updateIdentidad,
    updatePersonalizacion,
    updateProductos,
    updateNosotros,
    updateTestimonios,
    updateConstructor,

    // Utilidades
    isSectionCompleted,
    getNextSection,
    getPreviousSection,
  }
}
