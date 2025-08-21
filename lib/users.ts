import { Usuario, DatosRegistro, DatosLogin } from "@/types/dashboard"

// Enum de usuarios registrados
export enum UsuariosRegistrados {
  DEMO = "demo@vendes.com",
  ADMIN = "admin@vendes.com",
  TEST = "test@vendes.com"
}

// Función simple de hasheo (en producción usar bcryptjs)
function hashPassword(password: string): string {
  return btoa(password + "_vendes_salt")
}

function comparePassword(password: string, hashedPassword: string): boolean {
  return hashPassword(password) === hashedPassword
}

// Claves de administrador válidas
const CLAVES_ADMIN = ["1", "2", "3", "4"]

// Base de datos simulada de usuarios
let usuarios: Usuario[] = [
  {
    id: "1",
    email: UsuariosRegistrados.DEMO,
    password: hashPassword("demo123"),
    nombres: "Usuario Demo",
    telefono: "3001234567",
    documento: "12345678",
    fechaRegistro: new Date("2024-01-01"),
    estado: "activo",
    rol: "cliente"
  },
  {
    id: "2", 
    email: UsuariosRegistrados.ADMIN,
    password: hashPassword("admin123"),
    nombres: "Administrador Sistema",
    telefono: "3009876543",
    documento: "87654321",
    fechaRegistro: new Date("2024-01-01"),
    estado: "activo",
    rol: "admin"
  },
  {
    id: "3",
    email: UsuariosRegistrados.TEST,
    password: hashPassword("test123"),
    nombres: "Usuario Test",
    telefono: "3005555555",
    documento: "55555555",
    fechaRegistro: new Date("2024-01-01"),
    estado: "activo",
    rol: "cliente"
  }
]

/**
 * Registra un nuevo usuario
 */
export async function registrarUsuario(datos: DatosRegistro): Promise<{ success: boolean; error?: string }> {
  try {
    // Validar que las contraseñas coincidan
    if (datos.password !== datos.confirmPassword) {
      return { success: false, error: "Las contraseñas no coinciden" }
    }

    // Validar que el email no esté registrado
    const usuarioExistente = usuarios.find(u => u.email.toLowerCase() === datos.email.toLowerCase())
    if (usuarioExistente) {
      return { success: false, error: "El email ya está registrado" }
    }

    // Validar que el documento no esté registrado
    const documentoExistente = usuarios.find(u => u.documento === datos.documento)
    if (documentoExistente) {
      return { success: false, error: "El documento ya está registrado" }
    }

    // Validar longitud de contraseña
    if (datos.password.length < 6) {
      return { success: false, error: "La contraseña debe tener al menos 6 caracteres" }
    }

    // Validar formato de teléfono (solo números, mínimo 7 dígitos)
    if (!/^\d{7,15}$/.test(datos.telefono.replace(/\s/g, ''))) {
      return { success: false, error: "El número de teléfono debe tener entre 7 y 15 dígitos" }
    }

    // Validar formato de documento (solo números, mínimo 5 dígitos)
    if (!/^\d{5,20}$/.test(datos.documento.replace(/\s/g, ''))) {
      return { success: false, error: "El documento debe tener entre 5 y 20 dígitos" }
    }

    // Validar que los nombres no estén vacíos
    if (!datos.nombres.trim()) {
      return { success: false, error: "Los nombres son obligatorios" }
    }

    // Hashear la contraseña
    const passwordHasheado = hashPassword(datos.password)

    // Validar clave de administrador si el usuario seleccionó rol admin
    if (datos.rolSeleccionado === "admin") {
      if (!datos.claveAdmin) {
        return { success: false, error: "La clave de administrador es requerida para el rol de admin" }
      }
      if (!CLAVES_ADMIN.includes(datos.claveAdmin)) {
        return { success: false, error: "Clave de administrador inválida. Use 1, 2, 3 o 4" }
      }
    }

    // Determinar el rol del usuario
    const rol = datos.rolSeleccionado

    // Crear nuevo usuario
    const nuevoUsuario: Usuario = {
      id: Date.now().toString(),
      email: datos.email.toLowerCase(),
      password: passwordHasheado,
      nombres: datos.nombres.trim(),
      telefono: datos.telefono.replace(/\s/g, ''),
      documento: datos.documento.replace(/\s/g, ''),
      fechaRegistro: new Date(),
      estado: "activo",
      rol: rol
    }

    // Agregar a la lista de usuarios
    usuarios.push(nuevoUsuario)

    // Agregar al enum (simulado - en un caso real esto se haría en la base de datos)
    Object.assign(UsuariosRegistrados, { [datos.email.toUpperCase().replace(/[^A-Z0-9]/g, '_')]: datos.email })

    return { success: true }
  } catch (error) {
    console.error("Error al registrar usuario:", error)
    return { success: false, error: "Error interno del servidor" }
  }
}

/**
 * Autentica un usuario
 */
export async function autenticarUsuario(datos: DatosLogin): Promise<{ success: boolean; usuario?: Usuario; error?: string }> {
  try {
    // Buscar usuario por email
    const usuario = usuarios.find(u => u.email.toLowerCase() === datos.email.toLowerCase())
    
    if (!usuario) {
      return { success: false, error: "Credenciales inválidas" }
    }

    // Verificar estado del usuario
    if (usuario.estado !== "activo") {
      return { success: false, error: "Usuario inactivo" }
    }

    // Verificar contraseña
    const passwordValido = comparePassword(datos.password, usuario.password)
    if (!passwordValido) {
      return { success: false, error: "Credenciales inválidas" }
    }

    return { success: true, usuario }
  } catch (error) {
    console.error("Error al autenticar usuario:", error)
    return { success: false, error: "Error interno del servidor" }
  }
}

/**
 * Obtiene un usuario por email
 */
export function obtenerUsuarioPorEmail(email: string): Usuario | undefined {
  return usuarios.find(u => u.email.toLowerCase() === email.toLowerCase())
}

/**
 * Obtiene todos los usuarios registrados
 */
export function obtenerTodosLosUsuarios(): Usuario[] {
  return usuarios.map(u => ({
    ...u,
    password: "***" // No exponer contraseñas
  }))
}

/**
 * Verifica si un email está en el enum de usuarios registrados
 */
export function esUsuarioRegistrado(email: string): boolean {
  return Object.values(UsuariosRegistrados).includes(email.toLowerCase() as UsuariosRegistrados)
}

/**
 * Obtiene usuarios por rol
 */
export function obtenerUsuariosPorRol(rol: "admin" | "cliente"): Usuario[] {
  return usuarios.filter(u => u.rol === rol).map(u => ({
    ...u,
    password: "***" // No exponer contraseñas
  }))
}

/**
 * Verifica si un usuario es administrador
 */
export function esAdministrador(email: string): boolean {
  const usuario = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase())
  return usuario?.rol === "admin"
}

/**
 * Verifica si un usuario cliente ya tiene una página web creada
 */
export function tienePaginaWeb(email: string): boolean {
  const usuario = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase())
  return !!usuario?.paginaWebId
}

/**
 * Asigna una página web a un usuario cliente
 */
export function asignarPaginaWeb(email: string, paginaWebId: string): boolean {
  const usuario = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase())
  if (usuario && usuario.rol === "cliente") {
    usuario.paginaWebId = paginaWebId
    return true
  }
  return false
}

/**
 * Obtiene el ID de la página web de un usuario cliente
 */
export function obtenerPaginaWebId(email: string): string | undefined {
  const usuario = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase())
  return usuario?.paginaWebId
}

/**
 * Verifica si un usuario puede crear una nueva página web
 */
export function puedeCrearPaginaWeb(email: string): boolean {
  const usuario = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase())
  if (!usuario) return false
  
  // Los administradores siempre pueden crear páginas
  if (usuario.rol === "admin") return true
  
  // Los clientes solo pueden crear una página
  return usuario.rol === "cliente" && !usuario.paginaWebId
}

/**
 * Obtiene el usuario actual desde el ID de sesión
 */
export function obtenerUsuarioActual(userId: string): Usuario | null {
  const usuario = usuarios.find(u => u.id === userId)
  if (!usuario) return null
  
  // Retornar una copia sin la contraseña por seguridad
  const { password, ...usuarioSinPassword } = usuario
  return usuarioSinPassword as Usuario
}
