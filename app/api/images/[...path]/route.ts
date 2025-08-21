import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const imagePath = join(process.cwd(), 'utils', 'images', ...params.path)
    const imageBuffer = await readFile(imagePath)
    
    // Determinar el tipo de contenido basado en la extensión
    const extension = params.path[params.path.length - 1].split('.').pop()?.toLowerCase()
    let contentType = 'image/jpeg' // Por defecto
    
    if (extension === 'png') {
      contentType = 'image/png'
    } else if (extension === 'gif') {
      contentType = 'image/gif'
    } else if (extension === 'webp') {
      contentType = 'image/webp'
    } else if (extension === 'svg') {
      contentType = 'image/svg+xml'
    }
    
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('Error serving image:', error)
    return new NextResponse('Image not found', { status: 404 })
  }
}
