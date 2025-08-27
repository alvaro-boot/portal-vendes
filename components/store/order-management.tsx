"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Package, Truck } from "lucide-react"

const orders = [
  {
    id: "#ORD-001",
    customer: "María García",
    email: "maria@email.com",
    total: 79.98,
    status: "pending",
    date: "2024-01-15",
    items: 2,
  },
  {
    id: "#ORD-002",
    customer: "Carlos López",
    email: "carlos@email.com",
    total: 129.99,
    status: "processing",
    date: "2024-01-14",
    items: 1,
  },
  {
    id: "#ORD-003",
    customer: "Ana Martínez",
    email: "ana@email.com",
    total: 49.99,
    status: "shipped",
    date: "2024-01-13",
    items: 1,
  },
  {
    id: "#ORD-004",
    customer: "Luis Rodríguez",
    email: "luis@email.com",
    total: 199.97,
    status: "delivered",
    date: "2024-01-12",
    items: 3,
  },
]

export function OrderManagement() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pendiente</Badge>
      case "processing":
        return <Badge className="bg-blue-100 text-blue-800">Procesando</Badge>
      case "shipped":
        return <Badge className="bg-yellow-100 text-yellow-800">Enviado</Badge>
      case "delivered":
        return <Badge className="bg-secondary text-secondary-foreground">Entregado</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getActionButton = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Button variant="outline" size="sm">
            <Package className="h-4 w-4 mr-2" />
            Procesar
          </Button>
        )
      case "processing":
        return (
          <Button variant="outline" size="sm">
            <Truck className="h-4 w-4 mr-2" />
            Enviar
          </Button>
        )
      default:
        return (
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Ver
          </Button>
        )
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pedidos recientes</CardTitle>
        <CardDescription>Gestiona los pedidos de tu tienda</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pedido</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.id}</div>
                      <div className="text-sm text-muted-foreground">{order.items} artículos</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.customer}</div>
                      <div className="text-sm text-muted-foreground">{order.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>${order.total}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell className="text-right">{getActionButton(order.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
