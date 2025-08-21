import { NextRequest, NextResponse } from "next/server"
import { obtenerUsuarioDeSesion } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const usuario = await obtenerUsuarioDeSesion()
    
    if (!usuario) {
      return NextResponse.json(
        { error: "No autenticado" },
        { status: 401 }
      )
    }

    // Retornar solo los datos necesarios para optimizar la respuesta
    const userData = {
      id: usuario.id,
      email: usuario.email,
      nombres: usuario.nombres,
      rol: usuario.rol,
      estado: usuario.estado,
      fechaRegistro: usuario.fechaRegistro
    }

    return NextResponse.json({
      success: true,
      usuario: userData
    }, {
      headers: {
        'Cache-Control': 'private, max-age=300', // Cache por 5 minutos
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.error("Error al obtener usuario actual:", error)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}
