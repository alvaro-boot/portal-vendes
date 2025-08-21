import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Store, 
  Globe, 
  Edit, 
  Trash2, 
  Eye, 
  Settings,
  Plus,
  Search,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react"
import type { DashboardSection } from "@/types/dashboard"
import type { SectionProps } from "@/types/dashboard"
import { siteBuilderAPI } from "@/lib/api"
import { toast } from "sonner"

interface MiTiendaProps extends SectionProps {}

interface ClientSite {
  clientId: string
  name: string
  description?: string
  style: string
  company: {
    name: string
    tagline: string
  }
  createdAt: string
  updatedAt: string
}

export function MiTienda({
  activeSection,
  setActiveSection,
  completedSections,
  onComplete,
}: MiTiendaProps) {
  const [sites, setSites] = useState<ClientSite[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSite, setSelectedSite] = useState<ClientSite | null>(null)
  const [editing, setEditing] = useState(false)

  // Cargar sitios web del usuario
  useEffect(() => {
    const loadSites = async () => {
      try {
        setLoading(true)
        const response = await siteBuilderAPI.listClientConfigurations()
        setSites(response.data || [])
      } catch (error: any) {
        console.error('Error al cargar sitios:', error)
        setError(error.response?.data?.message || 'Error al cargar los sitios web')
        toast.error('Error al cargar los sitios web')
      } finally {
        setLoading(false)
      }
    }

    loadSites()
  }, [])

  const filteredSites = sites.filter(site =>
    site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    site.company.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleEditSite = (site: ClientSite) => {
    setSelectedSite(site)
    setEditing(true)
  }

  const handleDeleteSite = async (clientId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este sitio web? Esta acción no se puede deshacer.')) {
      return
    }

    try {
      await siteBuilderAPI.deleteClientConfiguration(clientId)
      setSites(sites.filter(site => site.clientId !== clientId))
      toast.success('Sitio web eliminado exitosamente')
    } catch (error: any) {
      console.error('Error al eliminar sitio:', error)
      toast.error(error.response?.data?.message || 'Error al eliminar el sitio web')
    }
  }

  const handleViewSite = (clientId: string) => {
    window.open(`http://localhost:3002/api/v1/client-templates/${clientId}`, '_blank')
  }

  const handlePreviewSite = (clientId: string) => {
    window.open(`http://localhost:3002/api/v1/client-templates/${clientId}/preview`, '_blank')
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Cargando sitios web...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Store className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">
                Mi Tienda
              </CardTitle>
              <CardDescription>
                Gestiona tus sitios web creados
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Barra de búsqueda y acciones */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar sitios web..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button 
              onClick={() => window.location.href = '/dashboard'}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Crear Nuevo Sitio
            </Button>
          </div>

          {/* Lista de sitios web */}
          {filteredSites.length === 0 ? (
            <div className="text-center py-12">
              <Store className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {searchTerm ? 'No se encontraron sitios' : 'No tienes sitios web aún'}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm 
                  ? 'Intenta con otros términos de búsqueda'
                  : 'Crea tu primer sitio web para comenzar'
                }
              </p>
              {!searchTerm && (
                <Button 
                  onClick={() => window.location.href = '/dashboard'}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Crear Mi Primer Sitio
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSites.map((site) => (
                <Card key={site.clientId} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold mb-1">
                          {site.name}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {site.company.name}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {site.style}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {site.description || site.company.tagline}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span>Creado: {new Date(site.createdAt).toLocaleDateString()}</span>
                      <span>Actualizado: {new Date(site.updatedAt).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewSite(site.clientId)}
                        className="flex-1"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        Ver
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handlePreviewSite(site.clientId)}
                        className="flex-1"
                      >
                        <Globe className="w-3 h-3 mr-1" />
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditSite(site)}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteSite(site.clientId)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
