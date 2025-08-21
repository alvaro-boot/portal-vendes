"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Download, Upload, Edit, Trash2, Facebook, Instagram, Linkedin } from "lucide-react"
import { NavigationSteps } from "@/components/navigation-steps"
import type { DashboardSection } from "@/types/dashboard"

interface ConfiguracionProductosProps {
  activeSection: DashboardSection
  setActiveSection: (section: DashboardSection) => void
  completedSections: DashboardSection[]
  onComplete: (section: DashboardSection) => void
}

interface Producto {
  id: string
  nombre: string
  precio: number
  categoria: string
  inventario: number
  estado: "Activo" | "Inactivo"
}

export function ConfiguracionProductos({
  activeSection,
  setActiveSection,
  completedSections,
  onComplete,
}: ConfiguracionProductosProps) {
  const [productos] = useState<Producto[]>([
    {
      id: "1",
      nombre: "Producto Ejemplo",
      precio: 29.99,
      categoria: "Electrónicos",
      inventario: 50,
      estado: "Activo",
    },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onComplete("productos" as DashboardSection)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationSteps
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        completedSections={completedSections}
      />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#292522] mb-2">Configuración de Productos</h2>
                <p className="text-[#666666]">Gestiona el catálogo de productos o servicios de tu comercio.</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <Button className="gap-2 bg-[#551BB3] hover:bg-[#551BB3]/90 text-white px-6 py-2 rounded-lg font-medium">
                  <Plus className="w-4 h-4" />
                  Agregar producto
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 bg-transparent border-[#E2DDD9] text-[#666666] hover:bg-[#E2DDD9]"
                >
                  <Download className="w-4 h-4" />
                  Descargar plantilla
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 bg-transparent border-[#E2DDD9] text-[#666666] hover:bg-[#E2DDD9]"
                >
                  <Upload className="w-4 h-4" />
                  Importar CSV
                </Button>
              </div>

              {/* Products Table */}
              <div className="border rounded-lg overflow-hidden bg-white">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-medium text-[#292522] py-4 px-6">Producto</TableHead>
                      <TableHead className="font-medium text-[#292522] py-4 px-6">Categoría</TableHead>
                      <TableHead className="font-medium text-[#292522] py-4 px-6">Precio</TableHead>
                      <TableHead className="font-medium text-[#292522] py-4 px-6">Inventario</TableHead>
                      <TableHead className="font-medium text-[#292522] py-4 px-6">Estado</TableHead>
                      <TableHead className="font-medium text-[#292522] py-4 px-6 text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {productos.map((producto) => (
                      <TableRow key={producto.id} className="border-t">
                        <TableCell className="font-medium text-[#292522] py-4 px-6">{producto.nombre}</TableCell>
                        <TableCell className="text-[#666666] py-4 px-6">{producto.categoria}</TableCell>
                        <TableCell className="text-[#666666] py-4 px-6">${producto.precio.toFixed(2)}</TableCell>
                        <TableCell className="text-[#666666] py-4 px-6">{producto.inventario}</TableCell>
                        <TableCell className="py-4 px-6">
                          <Badge
                            variant="secondary"
                            className={
                              producto.estado === "Activo"
                                ? "bg-[#551BB3]/10 text-[#551BB3] hover:bg-[#551BB3]/10"
                                : "bg-[#E2DDD9] text-[#666666] hover:bg-[#E2DDD9]"
                            }
                          >
                            {producto.estado}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-4 px-6">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-700">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Save Button */}
              <form onSubmit={handleSubmit}>
                <div className="flex justify-end pt-8">
                  <Button
                    type="submit"
                    className="px-8 py-3 bg-[#551BB3] hover:bg-[#551BB3]/90 text-white font-medium rounded-lg"
                  >
                    Guardar configuración
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
