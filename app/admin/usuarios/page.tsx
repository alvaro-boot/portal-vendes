"use client"

import * as React from "react"
import { PortalShell } from "@/components/portal/portal-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { obtenerTodosLosUsuarios, obtenerUsuariosPorRol, UsuariosRegistrados } from "@/lib/users"
import { Usuario } from "@/types/dashboard"

export default function UsuariosAdminPage() {
  const [usuarios, setUsuarios] = React.useState<Usuario[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const cargarUsuarios = () => {
      try {
        const usuariosData = obtenerTodosLosUsuarios()
        setUsuarios(usuariosData)
      } catch (error) {
        console.error("Error al cargar usuarios:", error)
      } finally {
        setLoading(false)
      }
    }

    cargarUsuarios()
  }, [])

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date))
  }

  const esUsuarioEnum = (email: string) => {
    return Object.values(UsuariosRegistrados).includes(email as UsuariosRegistrados)
  }

  if (loading) {
    return (
      <PortalShell>
        <div className="flex items-center justify-center min-h-[600px]">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 vendes-border-primary mx-auto"></div>
            <p className="vendes-text-neutral">Cargando usuarios...</p>
          </div>
        </div>
      </PortalShell>
    )
  }

  return (
    <PortalShell>
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-[#551BB3] rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white text-xl">👥</span>
            </div>
            <h1 className="text-3xl font-bold vendes-text-primary">
              Administración de Usuarios
            </h1>
            <div className="w-12 h-12 bg-[#551BB3] rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white text-xl">⚙️</span>
            </div>
          </div>
          <p className="text-lg vendes-text-neutral max-w-2xl mx-auto">
            Gestiona los usuarios registrados en el sistema y administra sus permisos
          </p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#551BB3] rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl">👥</span>
                </div>
                <div>
                  <p className="text-sm font-medium vendes-text-neutral">Total Usuarios</p>
                  <p className="text-2xl font-bold vendes-text-primary">{usuarios.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#551BB3] rounded-xl flex items-center justify-center shadow-lg">
                  <span className="vendes-text-dark text-xl">✅</span>
                </div>
                <div>
                  <p className="text-sm font-medium vendes-text-neutral">Usuarios Activos</p>
                  <p className="text-2xl font-bold vendes-text-secondary">
                    {usuarios.filter(u => u.estado === "activo").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#551BB3] rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl">👑</span>
                </div>
                <div>
                  <p className="text-sm font-medium vendes-text-neutral">Administradores</p>
                  <p className="text-2xl font-bold vendes-text-primary">
                    {usuarios.filter(u => u.rol === "admin").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#551BB3] rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl">👤</span>
                </div>
                <div>
                  <p className="text-sm font-medium vendes-text-neutral">Clientes</p>
                  <p className="text-2xl font-bold vendes-text-primary">
                    {usuarios.filter(u => u.rol === "cliente").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#551BB3] rounded-xl flex items-center justify-center shadow-lg">
                  <span className="vendes-text-dark text-xl">🆕</span>
                </div>
                <div>
                  <p className="text-sm font-medium vendes-text-neutral">Nuevos Registros</p>
                  <p className="text-2xl font-bold vendes-text-secondary">
                    {usuarios.filter(u => !esUsuarioEnum(u.email)).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de usuarios */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader>
            <CardTitle className="vendes-text-primary text-xl">Usuarios Registrados</CardTitle>
            <CardDescription className="vendes-text-neutral">
              Lista completa de usuarios en el sistema y su estado en el enum
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {usuarios.map((usuario) => (
                <div
                  key={usuario.id}
                  className="flex items-center justify-between p-6 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-[#551BB3] rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-semibold text-lg">
                        {usuario.nombres.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold vendes-text-dark text-lg">{usuario.nombres}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-1 text-sm">
                        <p className="vendes-text-neutral">
                          <span className="font-medium">Email:</span> {usuario.email}
                        </p>
                        <p className="vendes-text-neutral">
                          <span className="font-medium">Teléfono:</span> {usuario.telefono}
                        </p>
                        <p className="vendes-text-neutral">
                          <span className="font-medium">Documento:</span> {usuario.documento}
                        </p>
                      </div>
                      <p className="text-xs vendes-text-neutral mt-1">
                        Registrado: {formatDate(usuario.fechaRegistro)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge 
                      variant={usuario.estado === "activo" ? "default" : "secondary"}
                      className={usuario.estado === "activo" ? "bg-[#551BB3] text-white" : "vendes-bg-neutral vendes-text-neutral"}
                    >
                      {usuario.estado}
                    </Badge>
                    <Badge 
                      variant={usuario.rol === "admin" ? "default" : "outline"}
                      className={usuario.rol === "admin" ? "vendes-bg-primary text-white" : "vendes-border-secondary vendes-text-secondary"}
                    >
                      {usuario.rol === "admin" ? "👑 Admin" : "👤 Cliente"}
                    </Badge>
                    {esUsuarioEnum(usuario.email) && (
                      <Badge variant="outline" className="vendes-border-secondary vendes-text-secondary">
                        Enum
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Información del enum */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader>
            <CardTitle className="vendes-text-primary text-xl">Enum UsuariosRegistrados</CardTitle>
            <CardDescription className="vendes-text-neutral">
              Valores actuales del enum de usuarios registrados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <pre className="text-sm vendes-text-dark overflow-x-auto font-mono">
                {`enum UsuariosRegistrados {
${Object.entries(UsuariosRegistrados).map(([key, value]) => `  ${key} = "${value}"`).join(',\n')}
}`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Información de claves de admin */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader>
            <CardTitle className="vendes-text-primary text-xl">Claves de Administrador</CardTitle>
            <CardDescription className="vendes-text-neutral">
              Claves válidas para obtener permisos de administrador
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-purple-50 to-green-50 rounded-xl p-6 border border-purple-100">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["1", "2", "3", "4"].map((clave) => (
                  <div key={clave} className="text-center">
                    <div className="w-12 h-12 bg-[#551BB3] rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg">
                      <span className="text-white font-bold text-lg">{clave}</span>
                    </div>
                    <p className="text-sm vendes-text-neutral">Clave {clave}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                <p className="text-sm vendes-text-neutral">
                  <strong>Instrucciones:</strong> Los usuarios que ingresen una de estas claves durante el registro 
                  obtendrán automáticamente permisos de administrador en el sistema.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PortalShell>
  )
}
