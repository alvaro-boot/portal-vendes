"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Camiseta Premium",
    price: 29.99,
    stock: 45,
    status: "active",
    sales: 23,
    image: "/plain-tshirt.png",
  },
  {
    id: 2,
    name: "Pantalón Casual",
    price: 49.99,
    stock: 12,
    status: "active",
    sales: 18,
    image: "/blue-jeans.png",
  },
  {
    id: 3,
    name: "Zapatos Deportivos",
    price: 89.99,
    stock: 0,
    status: "out_of_stock",
    sales: 31,
    image: "/various-shoes.png",
  },
  {
    id: 4,
    name: "Chaqueta de Invierno",
    price: 129.99,
    stock: 8,
    status: "low_stock",
    sales: 12,
    image: "/chaqueta.png",
  },
]

export function ProductManagement() {
  const [searchTerm, setSearchTerm] = useState("")

  const getStatusBadge = (status: string, stock: number) => {
    if (status === "out_of_stock" || stock === 0) {
      return <Badge variant="destructive">Sin stock</Badge>
    }
    if (status === "low_stock" || stock < 10) {
      return <Badge variant="secondary">Stock bajo</Badge>
    }
    return <Badge className="bg-secondary text-secondary-foreground">Activo</Badge>
  }

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Gestión de productos</CardTitle>
            <CardDescription>Administra tu catálogo de productos</CardDescription>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo producto
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Ventas</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="h-10 w-10 rounded-md object-cover"
                      />
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{getStatusBadge(product.status, product.stock)}</TableCell>
                  <TableCell>{product.sales} vendidos</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
