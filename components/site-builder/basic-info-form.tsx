'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ColorPicker } from '@/components/ui/color-picker';
import { BasicInfoFormData } from '@/types/site-builder';
import { STYLE_OPTIONS, DEFAULT_THEME, getThemeByStyle, validateBasicInfo, generateClientId } from '@/utils/site-builder-helpers';
import { useSiteBuilder } from '@/hooks/use-site-builder';
import { siteBuilderAPI, imageAPI } from '@/lib/api';
import { toast } from 'sonner';
import { Upload, X, AlertCircle, CheckCircle, Globe, Link } from 'lucide-react';

interface BasicInfoFormProps {
  onNext: (data: BasicInfoFormData) => void;
  initialData?: BasicInfoFormData;
}

export const BasicInfoForm = ({ onNext, initialData }: BasicInfoFormProps) => {
  const { clientId, setClientId } = useSiteBuilder();
  
  const [formData, setFormData] = useState<BasicInfoFormData>({
    company: {
      name: initialData?.company?.name || '',
      tagline: initialData?.company?.tagline || '',
      description: initialData?.company?.description || '',
      logo: initialData?.company?.logo || '',
      favicon: initialData?.company?.favicon || ''
    },
    domain: {
      type: initialData?.domain?.type || 'subdominio',
      subdomain: initialData?.domain?.subdomain || '',
      customDomain: initialData?.domain?.customDomain || ''
    },
    style: initialData?.style || 'moderno',
    theme: initialData?.theme || DEFAULT_THEME
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [faviconPreview, setFaviconPreview] = useState<string>('');
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingFavicon, setUploadingFavicon] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      company: {
        ...prev.company,
        [field]: value
      }
    }));

    setTouchedFields(prev => ({ ...prev, [field]: true }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleDomainChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      domain: {
        ...prev.domain,
        [field]: value
      }
    }));

    // Si se está cambiando el subdominio, actualizar el clientId
    if (field === 'subdomain' && value.trim()) {
      const cleanSubdomain = value.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
      if (cleanSubdomain) {
        // Actualizar el clientId en el store global
        setClientId(cleanSubdomain);
      }
    }

    // Si se está cambiando el dominio propio, actualizar el clientId
    if (field === 'customDomain' && value.trim()) {
      const cleanDomain = value.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
      if (cleanDomain) {
        // Actualizar el clientId en el store global
        setClientId(cleanDomain);
      }
    }

    setTouchedFields(prev => ({ ...prev, [field]: true }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleThemeChange = (path: string, value: string) => {
    setFormData(prev => {
      const newTheme = { ...prev.theme };
      const keys = path.split('.');
      let current: any = newTheme;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      
      return {
        ...prev,
        theme: newTheme
      };
    });
  };

  const handleStyleChange = (style: string) => {
    setFormData(prev => ({
      ...prev,
      style: style as any,
      theme: getThemeByStyle(style)
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'favicon') => {
    const file = event.target.files?.[0];
    
    console.log('=== DEBUGGING FILE UPLOAD ===');
    console.log('Event:', event);
    console.log('Files:', event.target.files);
    console.log('File:', file);
    
    if (!file) {
      console.log('No file selected');
      toast.error('No se seleccionó ningún archivo');
      return;
    }

    console.log('Archivo seleccionado:', {
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: file.lastModified
    });

    // Validar tipo de archivo
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml', 'image/x-icon'];
    console.log('Tipo de archivo:', file.type);
    console.log('Tipos permitidos:', allowedTypes);
    console.log('¿Tipo válido?', allowedTypes.includes(file.type));
    
    if (!allowedTypes.includes(file.type)) {
      toast.error('Tipo de archivo no válido. Solo se permiten imágenes (JPEG, PNG, SVG, ICO)');
      return;
    }

    // Validar tamaño (máximo 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB
    console.log('Tamaño del archivo:', file.size, 'bytes');
    console.log('Tamaño máximo:', maxSize, 'bytes');
    console.log('¿Tamaño válido?', file.size <= maxSize);
    
    if (file.size > maxSize) {
      toast.error('El archivo es demasiado grande. Máximo 2MB');
      return;
    }

    try {
      // Crear URL temporal para preview
      const fileUrl = URL.createObjectURL(file);
      console.log('URL creada:', fileUrl);
      
      if (type === 'logo') {
        setLogoFile(file);
        setLogoPreview(fileUrl);
        toast.success('Logo cargado correctamente');
        console.log('Logo cargado exitosamente:', file.name);
      } else {
        setFaviconFile(file);
        setFaviconPreview(fileUrl);
        toast.success('Favicon cargado correctamente');
        console.log('Favicon cargado exitosamente:', file.name);
      }
    } catch (error) {
      console.error('Error al procesar archivo:', error);
      toast.error('Error al procesar el archivo');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (Object.keys(errors).length > 0) {
      toast.error('Por favor, corrige los errores en el formulario');
      return;
    }

    setSubmitting(true);
    
    try {
      // Procesar archivos si existen
      let logoUrl = formData.company.logo;
      let faviconUrl = formData.company.favicon;
      
      // Subir logo si se seleccionó uno nuevo
      if (logoFile) {
        try {
          // Crear un archivo renombrado para el logo
          const logoExtension = logoFile.name.split('.').pop() || '';
          const renamedLogoFile = new File([logoFile], `logo.${logoExtension}`, { type: logoFile.type });
          
          const logoResponse = await imageAPI.uploadImage(clientId || '', renamedLogoFile, 'logos');
          logoUrl = logoResponse.data.url || logoResponse.data.imageUrl;
          console.log('Logo subido:', logoUrl);
        } catch (error: any) {
          console.error('Error al subir logo:', error);
          toast.error('Error al subir el logo');
          setSubmitting(false);
          return;
        }
      }
      
      // Subir favicon si se seleccionó uno nuevo
      if (faviconFile) {
        try {
          // Crear un archivo renombrado para el favicon
          const faviconExtension = faviconFile.name.split('.').pop() || '';
          const renamedFaviconFile = new File([faviconFile], `favicon.${faviconExtension}`, { type: faviconFile.type });
          
          const faviconResponse = await imageAPI.uploadImage(clientId || '', renamedFaviconFile, 'favicons');
          faviconUrl = faviconResponse.data.url || faviconResponse.data.imageUrl;
          console.log('Favicon subido:', faviconUrl);
        } catch (error: any) {
          console.error('Error al subir favicon:', error);
          toast.error('Error al subir el favicon');
          setSubmitting(false);
          return;
        }
      }

      // Preparar datos para enviar
      const basicInfo = {
        ...formData,
        company: {
          ...formData.company,
          logo: logoUrl,
          favicon: faviconUrl
        }
      };

      console.log('Enviando información básica:', basicInfo);
      
      toast.success('Información básica guardada correctamente');
      
      if (onNext) {
        onNext(basicInfo);
      }
    } catch (error: any) {
      console.error('Error al guardar información básica:', error);
      toast.error('Error al guardar la información básica');
    } finally {
      setSubmitting(false);
    }
  };

  const setLoading = (loading: boolean) => {
    // Esta función se puede implementar si es necesaria
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Información Básica de tu Sitio Web
        </h2>
        <p className="text-gray-600">
          Configura los datos básicos de tu empresa y el estilo visual de tu sitio web.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Información de la Empresa */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Información de la Empresa</CardTitle>
            <CardDescription className="text-sm text-gray-600">
              Datos básicos que aparecerán en tu sitio web
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-sm font-medium">Nombre de la Empresa *</Label>
                <Input
                  id="companyName"
                  value={formData.company.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Mi Empresa S.A."
                  className="w-full"
                  required
                />
                {errors.name && touchedFields.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="tagline" className="text-sm font-medium">Slogan o Tagline</Label>
                <Input
                  id="tagline"
                  value={formData.company.tagline}
                  onChange={(e) => handleInputChange('tagline', e.target.value)}
                  placeholder="Tu slogan aquí"
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">Descripción</Label>
              <Textarea
                id="description"
                value={formData.company.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe brevemente tu empresa y servicios..."
                rows={4}
                className="w-full"
              />
            </div>

            {/* Logo y Favicon */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Logo */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Logo de la Empresa</h4>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                  {logoPreview ? (
                    <div className="space-y-2">
                      <img src={logoPreview} alt="Logo preview" className="max-h-20 mx-auto rounded shadow-sm" />
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setLogoPreview('');
                            setLogoFile(null);
                            toast.success('Logo eliminado');
                          }}
                          className="flex-1"
                        >
                          <X className="w-4 h-4 mr-1" />
                          Eliminar
                        </Button>
                        <Label htmlFor="logo-upload" className="cursor-pointer flex-1">
                          <Button type="button" variant="outline" size="sm" className="w-full">
                            <Upload className="w-4 h-4 mr-1" />
                            Cambiar
                          </Button>
                        </Label>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="w-16 h-16 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                        <Upload className="w-6 h-6 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Subir Logo</p>
                        <p className="text-xs text-gray-500 mt-1">JPEG, PNG, SVG - Máximo 2MB</p>
                      </div>
                      <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/svg+xml"
                        onChange={(e) => handleFileChange(e, 'logo')}
                        className="hidden"
                        id="logo-upload"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const input = document.getElementById('logo-upload') as HTMLInputElement;
                          if (input) {
                            input.click();
                            console.log('Input clickeado manualmente');
                          } else {
                            console.error('Input no encontrado');
                          }
                        }}
                        className="w-full hover:bg-blue-50 hover:border-blue-400"
                      >
                        <Upload className="w-4 h-4 mr-1" />
                        Seleccionar Archivo
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Favicon */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Favicon</h4>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                  {faviconPreview ? (
                    <div className="space-y-2">
                      <img src={faviconPreview} alt="Favicon preview" className="max-h-16 mx-auto rounded shadow-sm" />
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setFaviconPreview('');
                            setFaviconFile(null);
                            toast.success('Favicon eliminado');
                          }}
                          className="flex-1"
                        >
                          <X className="w-4 h-4 mr-1" />
                          Eliminar
                        </Button>
                        <Label htmlFor="favicon-upload" className="cursor-pointer flex-1">
                          <Button type="button" variant="outline" size="sm" className="w-full">
                            <Upload className="w-4 h-4 mr-1" />
                            Cambiar
                          </Button>
                        </Label>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="w-12 h-12 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                        <Upload className="w-4 h-4 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Subir Favicon</p>
                        <p className="text-xs text-gray-500 mt-1">ICO, PNG, SVG - Máximo 2MB</p>
                      </div>
                      <input
                        type="file"
                        accept="image/x-icon,image/png,image/svg+xml"
                        onChange={(e) => handleFileChange(e, 'favicon')}
                        className="hidden"
                        id="favicon-upload"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const input = document.getElementById('favicon-upload') as HTMLInputElement;
                          if (input) {
                            input.click();
                            console.log('Input clickeado manualmente');
                          } else {
                            console.error('Input no encontrado');
                          }
                        }}
                        className="w-full hover:bg-blue-50 hover:border-blue-400"
                      >
                        <Upload className="w-4 h-4 mr-1" />
                        Seleccionar Archivo
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configuración de Dominio */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Configuración de Dominio
            </CardTitle>
            <CardDescription className="text-sm text-gray-600">
              Elige cómo quieres que se acceda a tu sitio web
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Label className="text-sm font-medium">Tipo de Dominio</Label>
              <RadioGroup
                value={formData.domain.type}
                onValueChange={(value) => handleDomainChange('type', value)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="subdominio" id="subdominio" />
                  <Label htmlFor="subdominio" className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Link className="w-4 h-4" />
                      <span>Subdominio de Vendes</span>
                    </div>
                    <p className="text-sm text-gray-500">micomercio.vendes.com</p>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="propio" id="propio" />
                  <Label htmlFor="propio" className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <span>Dominio Propio</span>
                    </div>
                    <p className="text-sm text-gray-500">micomercio.com</p>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Campo de Subdominio - Solo visible cuando se selecciona subdominio */}
            {formData.domain.type === 'subdominio' && (
              <div className="space-y-2">
                <Label htmlFor="subdomain" className="text-sm font-medium">Subdominio *</Label>
                <div className="flex items-center">
                  <Input
                    id="subdomain"
                    value={formData.domain.subdomain}
                    onChange={(e) => handleDomainChange('subdomain', e.target.value)}
                    placeholder="micomercio"
                    className="rounded-r-none"
                  />
                  <div className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md text-gray-600">
                    .vendes.com
                  </div>
                </div>
                {errors.subdomain && touchedFields.subdomain && (
                  <p className="text-red-500 text-sm">{errors.subdomain}</p>
                )}
                <p className="text-sm text-gray-500">
                  Solo letras minúsculas, números y guiones. Ejemplo: mi-empresa
                </p>
                
                {/* Mostrar la URL completa */}
                {formData.domain.subdomain && (
                  <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm font-medium text-blue-800 mb-1">
                      URL de tu sitio web:
                    </p>
                    <p className="text-sm text-blue-600 font-mono bg-white px-2 py-1 rounded border">
                      https://{formData.domain.subdomain}.vendes.com
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      Esta será la dirección donde estará disponible tu sitio web.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Campo de Dominio Propio - Solo visible cuando se selecciona dominio propio */}
            {formData.domain.type === 'propio' && (
              <div className="space-y-2">
                <Label htmlFor="customDomain" className="text-sm font-medium">Dominio Propio *</Label>
                <div className="flex items-center">
                  <Input
                    id="customDomain"
                    value={formData.domain.customDomain}
                    onChange={(e) => handleDomainChange('customDomain', e.target.value)}
                    placeholder="micomercio"
                    className="rounded-r-none"
                  />
                  <div className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md text-gray-600">
                    .com
                  </div>
                </div>
                {errors.customDomain && touchedFields.customDomain && (
                  <p className="text-red-500 text-sm">{errors.customDomain}</p>
                )}
                <p className="text-sm text-gray-500">
                  Solo letras minúsculas, números y guiones. Asegúrate de que el dominio esté registrado.
                </p>
                
                {/* Mostrar la URL completa donde estará disponible la página */}
                {formData.domain.customDomain && (
                  <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm font-medium text-blue-800 mb-1">
                      URL donde estará disponible tu página web:
                    </p>
                    <p className="text-sm text-blue-600 font-mono bg-white px-2 py-1 rounded border">
                      https://{formData.domain.customDomain}.com
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      Esta será la dirección donde los visitantes podrán acceder a tu sitio web.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Mostrar el ID del cliente generado */}
            {clientId && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm font-medium text-green-800 mb-1">
                  ID del Cliente Generado:
                </p>
                <p className="text-sm text-green-600 font-mono bg-white px-2 py-1 rounded border">
                  {clientId}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  Este ID se usará para identificar tu sitio web en el sistema.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Estilo Visual */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Estilo Visual</CardTitle>
            <CardDescription className="text-sm text-gray-600">
              Elige el estilo que mejor represente tu marca
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {STYLE_OPTIONS.map((style) => (
                <div
                  key={style.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.style === style.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleStyleChange(style.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg ${style.gradient}`}></div>
                    <div>
                      <h4 className="font-medium text-gray-900">{style.name}</h4>
                      <p className="text-sm text-gray-600">{style.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Personalización de Colores */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Personalización de Colores</CardTitle>
            <CardDescription className="text-sm text-gray-600">
              Personaliza los colores de tu sitio web
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Colores Principales */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Colores Principales</h4>
                
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">Color Principal</Label>
                    <ColorPicker
                      value={formData.theme.colors.primary}
                      onChange={(color) => handleThemeChange('colors.primary', color)}
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Color Secundario</Label>
                    <ColorPicker
                      value={formData.theme.colors.secondary}
                      onChange={(color) => handleThemeChange('colors.secondary', color)}
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Color de Acento</Label>
                    <ColorPicker
                      value={formData.theme.colors.accent}
                      onChange={(color) => handleThemeChange('colors.accent', color)}
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Color de Fondo</Label>
                    <ColorPicker
                      value={formData.theme.colors.background}
                      onChange={(color) => handleThemeChange('colors.background', color)}
                    />
                  </div>
                </div>
              </div>

              {/* Colores de Texto */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Colores de Texto</h4>
                
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">Color de Texto Principal</Label>
                    <ColorPicker
                      value={formData.theme.colors.foreground}
                      onChange={(color) => handleThemeChange('colors.foreground', color)}
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Color de Texto Secundario</Label>
                    <ColorPicker
                      value={formData.theme.colors.accentForeground}
                      onChange={(color) => handleThemeChange('colors.accentForeground', color)}
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Color de Fondo de Tarjetas</Label>
                    <ColorPicker
                      value={formData.theme.colors.primaryForeground}
                      onChange={(color) => handleThemeChange('colors.primaryForeground', color)}
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Color de Bordes</Label>
                    <ColorPicker
                      value={formData.theme.colors.secondaryForeground}
                      onChange={(color) => handleThemeChange('colors.secondaryForeground', color)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Vista Previa de Colores */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
              <h5 className="font-medium text-gray-900 mb-3">Vista Previa de Colores</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div 
                  className="p-4 rounded-lg shadow-sm"
                  style={{ 
                    backgroundColor: formData.theme.colors.primaryForeground,
                    border: `1px solid ${formData.theme.colors.secondaryForeground}`
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="w-8 h-8 rounded-full"
                      style={{ backgroundColor: formData.theme.colors.primary }}
                    ></div>
                    <div>
                      <h6 style={{ color: formData.theme.colors.foreground }} className="font-semibold">Título Principal</h6>
                      <p style={{ color: formData.theme.colors.accentForeground }} className="text-sm">Descripción secundaria</p>
                    </div>
                  </div>
                  <div 
                    className="px-3 py-2 rounded text-center text-sm font-medium"
                    style={{ 
                      backgroundColor: formData.theme.colors.primary,
                      color: formData.theme.colors.primaryForeground
                    }}
                  >
                    Botón Principal
                  </div>
                </div>

                <div 
                  className="p-4 rounded-lg shadow-sm"
                  style={{ 
                    backgroundColor: formData.theme.colors.background,
                    border: `1px solid ${formData.theme.colors.secondaryForeground}`
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="w-8 h-8 rounded-full"
                      style={{ backgroundColor: formData.theme.colors.secondary }}
                    ></div>
                    <div>
                      <h6 style={{ color: formData.theme.colors.foreground }} className="font-semibold">Elemento Secundario</h6>
                      <p style={{ color: formData.theme.colors.accentForeground }} className="text-sm">Información adicional</p>
                    </div>
                  </div>
                  <div 
                    className="px-3 py-2 rounded text-center text-sm font-medium"
                    style={{ 
                      backgroundColor: formData.theme.colors.accent,
                      color: formData.theme.colors.accentForeground
                    }}
                  >
                    Botón Secundario
                  </div>
                </div>

                <div 
                  className="p-4 rounded-lg shadow-sm"
                  style={{ 
                    backgroundColor: formData.theme.colors.background,
                    border: `1px solid ${formData.theme.colors.secondaryForeground}`
                  }}
                >
                  <div className="text-center">
                    <h6 style={{ color: formData.theme.colors.foreground }} className="font-semibold mb-2">Contenido</h6>
                    <p style={{ color: formData.theme.colors.accentForeground }} className="text-sm mb-3">
                      Este es un ejemplo de cómo se verá el texto en tu sitio web con los colores seleccionados.
                    </p>
                    <div className="flex gap-2 justify-center">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: formData.theme.colors.primary }}
                      ></div>
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: formData.theme.colors.secondary }}
                      ></div>
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: formData.theme.colors.accent }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botones de acción */}
        <div className="flex justify-end space-x-4">
          <Button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {submitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Guardando...
              </>
            ) : (
              'Continuar'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
