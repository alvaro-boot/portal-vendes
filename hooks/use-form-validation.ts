"use client"

/**
 * Hook personalizado para validación de formularios
 *
 * Proporciona funciones de validación reutilizables y manejo de errores
 * para todos los formularios del dashboard.
 */

import { useState, useCallback } from "react"
import { VALIDATION_MESSAGES, TEXT_LIMITS, FILE_LIMITS } from "@/constants/dashboard"

/** Tipo para errores de validación */
export type ValidationErrors = Record<string, string>

/** Reglas de validación disponibles */
export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: any) => string | null
}

/** Configuración de validación para campos */
export type ValidationConfig = Record<string, ValidationRule>

/**
 * Hook para manejar validación de formularios
 *
 * @param config Configuración de reglas de validación
 * @returns Objeto con funciones y estado de validación
 */
export function useFormValidation(config: ValidationConfig) {
  const [errors, setErrors] = useState<ValidationErrors>({})

  /**
   * Valida un campo individual
   */
  const validateField = useCallback(
    (name: string, value: any): string | null => {
      const rules = config[name]
      if (!rules) return null

      // Validación de campo requerido
      if (rules.required && (!value || (typeof value === "string" && value.trim() === ""))) {
        return VALIDATION_MESSAGES.REQUIRED_FIELD
      }

      // Si el campo está vacío y no es requerido, no validar más reglas
      if (!value || (typeof value === "string" && value.trim() === "")) {
        return null
      }

      // Validación de longitud mínima
      if (rules.minLength && typeof value === "string" && value.length < rules.minLength) {
        return VALIDATION_MESSAGES.MIN_LENGTH(rules.minLength)
      }

      // Validación de longitud máxima
      if (rules.maxLength && typeof value === "string" && value.length > rules.maxLength) {
        return VALIDATION_MESSAGES.MAX_LENGTH(rules.maxLength)
      }

      // Validación con patrón regex
      if (rules.pattern && typeof value === "string" && !rules.pattern.test(value)) {
        return VALIDATION_MESSAGES.INVALID_EMAIL // Personalizar según el patrón
      }

      // Validación personalizada
      if (rules.custom) {
        return rules.custom(value)
      }

      return null
    },
    [config],
  )

  /**
   * Valida todos los campos del formulario
   */
  const validateForm = useCallback(
    (data: Record<string, any>): boolean => {
      const newErrors: ValidationErrors = {}
      let isValid = true

      Object.keys(config).forEach((fieldName) => {
        const error = validateField(fieldName, data[fieldName])
        if (error) {
          newErrors[fieldName] = error
          isValid = false
        }
      })

      setErrors(newErrors)
      return isValid
    },
    [config, validateField],
  )

  /**
   * Valida un campo específico y actualiza los errores
   */
  const validateSingleField = useCallback(
    (name: string, value: any) => {
      const error = validateField(name, value)
      setErrors((prev) => ({
        ...prev,
        [name]: error || "",
      }))
      return !error
    },
    [validateField],
  )

  /**
   * Limpia todos los errores
   */
  const clearErrors = useCallback(() => {
    setErrors({})
  }, [])

  /**
   * Limpia el error de un campo específico
   */
  const clearFieldError = useCallback((fieldName: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors[fieldName]
      return newErrors
    })
  }, [])

  /**
   * Verifica si hay errores en el formulario
   */
  const hasErrors = Object.values(errors).some((error) => error !== "")

  return {
    errors,
    hasErrors,
    validateForm,
    validateSingleField,
    clearErrors,
    clearFieldError,
  }
}

/**
 * Validaciones específicas para archivos
 */
export const fileValidations = {
  /**
   * Valida que un archivo sea una imagen válida
   */
  validateImage: (file: File | null): string | null => {
    if (!file) return null

    if (file.size > FILE_LIMITS.MAX_IMAGE_SIZE) {
      return VALIDATION_MESSAGES.FILE_TOO_LARGE
    }

    if (!FILE_LIMITS.ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return VALIDATION_MESSAGES.INVALID_FILE_TYPE
    }

    return null
  },

  /**
   * Valida una URL
   */
  validateUrl: (url: string): string | null => {
    if (!url) return null

    try {
      new URL(url)
      return null
    } catch {
      return VALIDATION_MESSAGES.INVALID_URL
    }
  },
}

/**
 * Configuraciones de validación predefinidas
 */
export const validationConfigs = {
  /** Validación para identidad del comercio */
  identidad: {
    nombreComercio: {
      required: true,
      minLength: TEXT_LIMITS.NOMBRE_COMERCIO_MIN,
      maxLength: TEXT_LIMITS.NOMBRE_COMERCIO_MAX,
    },
    subdominio: {
      required: true,
      pattern: /^[a-zA-Z0-9-]+$/,
    },
    dominioPropio: {
      custom: (value: string) => {
        if (!value) return null
        return fileValidations.validateUrl(`https://${value}`)
      },
    },
  } as ValidationConfig,

  /** Validación para personalización */
  personalizacion: {
    fraseDestacada: {
      maxLength: TEXT_LIMITS.FRASE_DESTACADA_MAX,
    },
  } as ValidationConfig,

  /** Validación para testimonios */
  testimonio: {
    nombre: {
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    resena: {
      required: true,
      minLength: 10,
      maxLength: 500,
    },
    rol: {
      required: true,
      maxLength: 50,
    },
  } as ValidationConfig,
}
