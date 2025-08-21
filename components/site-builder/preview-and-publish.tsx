'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSiteBuilder } from '@/hooks/use-site-builder';
import { siteBuilderAPI } from '@/lib/api';
import { ensureAllSections } from '@/utils/site-builder-helpers';
import { asignarPaginaWeb } from '@/lib/users';
import { useCurrentUser } from '@/hooks/use-current-user';
import { toast } from 'sonner';
import { Loader2, ExternalLink, Eye, Globe, CheckCircle, Copy } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface PreviewAndPublishProps {
  clientId: string;
  onNext?: () => void;
}

export const PreviewAndPublish = ({ clientId, onNext }: PreviewAndPublishProps) => {
  const { basicInfo, selectedSections, setLoading, setError } = useSiteBuilder();
  const { usuario, esCliente, refrescarUsuario } = useCurrentUser();
  
  console.log('=== PREVIEW AND PUBLISH RENDERIZADO ===');
  console.log('ClientId:', clientId);
  console.log('BasicInfo:', basicInfo);
  console.log('SelectedSections:', selectedSections);
  const [previewHtml, setPreviewHtml] = useState<string>('');
  const [loading, setLocalLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);
  const [siteUrl, setSiteUrl] = useState<string>('');
  const [availableSections, setAvailableSections] = useState<any[]>([]);
  
  console.log('Estado del botón - publishing:', publishing, 'published:', published, 'disabled:', publishing || published);

  // Cargar previsualización solo después de publicar
  const loadPreview = async (clientId: string) => {
    try {
      setLocalLoading(true);
      const response = await siteBuilderAPI.previewClientTemplate(clientId);
      setPreviewHtml(response.data);
      setSiteUrl(`https://${clientId}.tudominio.com`);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Error al cargar previsualización';
      setError(errorMessage);
      toast.error(errorMessage);
      // Fallback: mostrar mensaje de error en iframe
      setPreviewHtml(`
        <html>
          <head><title>Error de Carga</title></head>
          <body style="display: flex; align-items: center; justify-content: center; height: 100vh; font-family: Arial, sans-serif;">
            <div style="text-align: center; color: #666;">
              <h2>Error al cargar la previsualización</h2>
              <p>${errorMessage}</p>
              <p>Verifica que el servidor esté funcionando en http://localhost:3002</p>
            </div>
          </body>
        </html>
      `);
    } finally {
      setLocalLoading(false);
    }
  };

  // Mostrar mensaje inicial
  useEffect(() => {
    setPreviewHtml(`
      <html>
        <head><title>Preparando Previsualización</title></head>
        <body style="display: flex; align-items: center; justify-content: center; height: 100vh; font-family: Arial, sans-serif;">
          <div style="text-align: center; color: #666;">
            <h2>Preparando tu sitio web</h2>
            <p>Haz clic en "Publicar Sitio" para crear tu sitio web y ver la previsualización</p>
          </div>
        </body>
      </html>
    `);
    setLocalLoading(false);
  }, []);

  const handlePublish = async () => {
    try {
      setPublishing(true);
      
      console.log('=== INICIANDO PUBLICACIÓN ===');
      console.log('ClientId:', clientId);
      console.log('BasicInfo:', basicInfo);
      console.log('SelectedSections:', selectedSections);
      console.log('AvailableSections:', availableSections);
      
      // Cargar secciones disponibles si no están cargadas
      if (availableSections.length === 0) {
        try {
          console.log('Cargando secciones disponibles...');
          const response = await siteBuilderAPI.getAvailableSections();
          setAvailableSections(response.data.sections);
          console.log('Secciones disponibles cargadas:', response.data.sections);
        } catch (error) {
          console.warn('No se pudieron cargar las secciones disponibles, usando las seleccionadas');
        }
      }
      
      // Verificar que tenemos toda la información necesaria
      if (!basicInfo) {
        console.error('BasicInfo está vacío:', basicInfo);
        throw new Error('Información básica incompleta. Completa el paso 2.');
      }
      
      if (!selectedSections.length) {
        console.error('SelectedSections está vacío:', selectedSections);
        throw new Error('No hay secciones seleccionadas. Completa el paso 1.');
      }

      // Asegurar que todas las secciones estén incluidas
      const allSections = availableSections.length > 0 
        ? ensureAllSections(selectedSections, availableSections)
        : selectedSections;
      
      // Crear el cliente con toda la información completa
      const clientConfig = {
        clientId,
        name: basicInfo.company.name,
        description: `Sitio web de ${basicInfo.company.name}`,
        style: basicInfo.style,
        sections: allSections,
        company: {
          name: basicInfo.company.name,
          tagline: basicInfo.company.tagline,
          description: basicInfo.company.description,
          logo: basicInfo.company.logo || '',
          favicon: basicInfo.company.favicon || '',
        },
        theme: basicInfo.theme
      };
      
      console.log('=== CONFIGURACIÓN DEL CLIENTE ===');
      console.log('ClientConfig completo:', JSON.stringify(clientConfig, null, 2));
      
      // Crear el cliente en la API
      console.log('Enviando petición para crear cliente...');
      const response = await siteBuilderAPI.createClientConfiguration(clientConfig);
      console.log('Respuesta de creación del cliente:', response.data);
      
      // Simular proceso de publicación
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setPublished(true);
      
             // Si es un usuario cliente, asignar la página web al usuario
       if (esCliente && usuario) {
         try {
           const asignado = asignarPaginaWeb(usuario.email, clientId);
           if (asignado) {
             toast.success('¡Sitio web creado y asignado a tu cuenta exitosamente!');
             // Refrescar la información del usuario para actualizar las opciones de navegación
             await refrescarUsuario();
           } else {
             toast.success('¡Sitio web creado y publicado exitosamente!');
           }
         } catch (error) {
           console.error('Error al asignar página web al usuario:', error);
           toast.success('¡Sitio web creado y publicado exitosamente!');
         }
       } else {
         toast.success('¡Sitio web creado y publicado exitosamente!');
       }
      
      // Cargar la previsualización después de crear el cliente
      await loadPreview(clientId);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Error al crear el sitio';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setPublishing(false);
    }
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(siteUrl);
      toast.success('URL copiada al portapapeles');
    } catch (error) {
      toast.error('Error al copiar URL');
    }
  };

  const handleOpenSite = () => {
    window.open(`http://localhost:3002/api/v1/client-templates/${clientId}`, '_blank');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-purple-600" />
          <p className="text-gray-600">Generando previsualización...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel de control */}
          <div className="space-y-6">
            {published && (
              <div className="flex justify-center">
                <Badge className="bg-[#551BB3] text-white flex items-center gap-1 px-4 py-2">
                  <CheckCircle className="h-4 w-4" />
                  Sitio Publicado
                </Badge>
              </div>
            )}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Información del Sitio
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">ID del Cliente</Label>
                <p className="text-sm text-gray-600 font-mono bg-gray-100 p-2 rounded mt-1">
                  {clientId}
                </p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700">URL del Sitio</Label>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-sm text-gray-600 font-mono bg-gray-100 p-2 rounded flex-1">
                    {siteUrl}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyUrl}
                    className="flex items-center gap-1"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Estado</Label>
                <div className="mt-1">
                  {published ? (
                    <Badge className="bg-[#551BB3] text-white">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Publicado
                    </Badge>
                  ) : (
                    <Badge variant="outline">
                      Borrador
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Acciones</CardTitle>
            </CardHeader>
                         <CardContent className="space-y-3">
               <Button
                 onClick={handleOpenSite}
                 variant="outline"
                 className="w-full flex items-center gap-2"
               >
                 <Eye className="h-4 w-4" />
                 Ver sitio completo
               </Button>
               
               <Button
                 onClick={() => {
                   console.log('=== BOTÓN PUBLICAR CLICKEADO ===');
                   console.log('Estado del botón - publishing:', publishing, 'published:', published);
                   handlePublish();
                 }}
                 disabled={publishing || published}
                 className="w-full flex items-center gap-2"
               >
                {publishing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Publicando...
                  </>
                ) : published ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    Ya publicado
                  </>
                ) : (
                  <>
                    <Globe className="h-4 w-4" />
                    Publicar Sitio
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Próximos Pasos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600">Personaliza más el contenido desde el panel de administración</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600">Configura tu dominio personalizado</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600">Optimiza para SEO y rendimiento</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Previsualización */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Previsualización del Sitio
              </CardTitle>
              <CardDescription>
                Vista previa de cómo se verá tu sitio web
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden bg-white">
                {/* Barra de herramientas del navegador simulada */}
                <div className="bg-gray-100 border-b px-4 py-2 flex items-center gap-2">
                  <div className="flex gap-1">
                                    <div className="w-3 h-3 bg-[#551BB3] rounded-full"></div>
                <div className="w-3 h-3 bg-[#551BB3] rounded-full"></div>
                <div className="w-3 h-3 bg-[#551BB3] rounded-full"></div>
                  </div>
                  <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-gray-500 mx-4">
                    {siteUrl}
                  </div>
                  <ExternalLink className="h-3 w-3 text-gray-400" />
                </div>
                
                {/* Iframe con previsualización */}
                <iframe
                  srcDoc={previewHtml}
                  className="w-full h-[600px] border-0"
                  title="Previsualización del sitio"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mensaje de éxito */}
      {published && (
                        <Card className="mt-6 vendes-border-primary bg-[#551BB3]/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 vendes-text-secondary" />
              <div>
                <h3 className="font-semibold vendes-text-dark">¡Sitio web publicado exitosamente!</h3>
                <p className="vendes-text-neutral text-sm">
                  Tu sitio web ya está disponible en línea. Puedes compartir la URL con tus clientes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
