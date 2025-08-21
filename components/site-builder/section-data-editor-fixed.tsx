'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { SectionConfiguration } from '@/types/site-builder';
import { useSiteBuilder } from '@/hooks/use-site-builder';
import { siteBuilderAPI, imageAPI } from '@/lib/api';
import { toast } from 'sonner';
import { ChevronLeft, ChevronRight, Loader2, Upload, X, Plus, Trash2 } from 'lucide-react';

interface SectionDataEditorProps {
  clientId: string;
  onNext: (sections: SectionConfiguration[]) => void;
  initialData?: { sections: SectionConfiguration[] };
}

export const SectionDataEditor = ({ clientId, onNext, initialData }: SectionDataEditorProps) => {
  const { setLoading, setError } = useSiteBuilder();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [sectionData, setSectionData] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [sections, setSections] = useState<SectionConfiguration[]>(initialData?.sections || []);
  
  // Estados para manejo de archivos
  const [imageFiles, setImageFiles] = useState<Record<string, File>>({});
  const [imagePreviews, setImagePreviews] = useState<Record<string, string>>({});
  const [uploadingImages, setUploadingImages] = useState<Record<string, boolean>>({});
  
  // Estados para productos individuales
  const [products, setProducts] = useState<any[]>(sectionData.products || []);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: ''
  });
  
  // Estados para testimonios individuales
  const [testimonials, setTestimonials] = useState<any[]>(sectionData.testimonials || []);
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    role: '',
    content: '',
    image: '',
    rating: 5
  });

  const enabledSections = sections.filter(s => s.enabled);
  const currentSection = enabledSections[currentSectionIndex];

  // Función para obtener el nombre legible de la sección
  const getSectionDisplayName = (sectionId: string): string => {
    switch (sectionId) {
      case 'hero':
        return 'Sección Hero';
      case 'about':
        return 'Sobre Nosotros';
      case 'products':
        return 'Productos';
      case 'services':
        return 'Servicios';
      case 'testimonials':
        return 'Testimonios';
      case 'contact':
        return 'Contacto';
      case 'gallery':
        return 'Galería';
      default:
        return sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
    }
  };

  // Cargar datos existentes de la sección actual
  useEffect(() => {
    if (currentSection?.data) {
      setSectionData(currentSection.data);
      // Cargar productos si es la sección de productos
      if (currentSection.id === 'products') {
        const productsData = currentSection.data.products || [];
        setProducts(productsData);
        console.log('Productos cargados de sectionData:', productsData);
        
        // Cargar productos dinámicamente desde el backend
        loadProductsFromBackend();
      }
      // Cargar testimonios si es la sección de testimonios
      if (currentSection.id === 'testimonials') {
        const testimonialsData = currentSection.data.testimonials || [];
        setTestimonials(testimonialsData);
        console.log('Testimonios cargados de sectionData:', testimonialsData);
      }
    } else {
      setSectionData({});
      // Solo limpiar productos y testimonios si no es la sección correspondiente
      if (currentSection?.id !== 'products') {
        setProducts([]);
      }
      if (currentSection?.id !== 'testimonios') {
        setTestimonials([]);
      }
    }
    // Limpiar archivos al cambiar sección
    setImageFiles({});
    setImagePreviews({});
    setUploadingImages({});
    // Limpiar formulario de nuevo producto
    setNewProduct({
      name: '',
      description: '',
      price: '',
      image: '',
      category: ''
    });
    // Limpiar formulario de nuevo testimonio
    setNewTestimonial({
      name: '',
      role: '',
      content: '',
      image: '',
      rating: 5
    });
  }, [currentSection]);

  // Función para cargar productos desde el backend
  const loadProductsFromBackend = async () => {
    try {
      setLoadingProducts(true);
      console.log('Cargando productos dinámicamente desde el backend...');
      const response = await siteBuilderAPI.getClientProducts(clientId);
      
      if (response.data && response.data.products) {
        const backendProducts = response.data.products;
        console.log('Productos cargados del backend:', backendProducts);
        
        // Combinar productos del backend con los locales
        const existingProducts = products;
        const combinedProducts = [...existingProducts];
        
        // Agregar productos del backend que no existan localmente
        backendProducts.forEach((backendProduct: any) => {
          const exists = existingProducts.find(p => p.id === backendProduct.id);
          if (!exists) {
            combinedProducts.push(backendProduct);
          }
        });
        
        setProducts(combinedProducts);
        
        // Actualizar sectionData con los productos combinados
        const updatedSectionData = {
          ...sectionData,
          products: combinedProducts
        };
        setSectionData(updatedSectionData);
        
        console.log('Productos combinados:', combinedProducts);
        toast.success(`Cargados ${backendProducts.length} productos del backend`);
      }
    } catch (error: any) {
      console.error('Error al cargar productos del backend:', error);
      toast.error('Error al cargar productos del backend');
    } finally {
      setLoadingProducts(false);
    }
  };

  // Función para validar archivos de imagen
  const validateImageFile = (file: File): string | null => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (!validTypes.includes(file.type)) {
      return 'El archivo debe ser una imagen válida (JPG, PNG, SVG)';
    }

    if (file.size > maxSize) {
      return 'El archivo no puede ser mayor a 2MB';
    }

    return null;
  };

  // Función para manejar la selección de archivos
  const handleFileSelect = (file: File | null, fieldName: string) => {
    if (!file) {
      setImageFiles(prev => {
        const newFiles = { ...prev };
        delete newFiles[fieldName];
        return newFiles;
      });
      setImagePreviews(prev => {
        const newPreviews = { ...prev };
        delete newPreviews[fieldName];
        return newPreviews;
      });
      return;
    }

    const validationError = validateImageFile(file);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    // Crear preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = e.target?.result as string;
      setImageFiles(prev => ({ ...prev, [fieldName]: file }));
      setImagePreviews(prev => ({ ...prev, [fieldName]: preview }));
    };
    reader.readAsDataURL(file);
  };

  // Función para subir imagen
  const uploadImage = async (file: File, fieldName: string): Promise<string> => {
    const category = getImageCategory(fieldName);
    
    try {
      const response = await imageAPI.uploadImage(clientId, file, category);
      return response.data.url || response.data.imageUrl;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || `Error al subir imagen`);
    }
  };

  // Función para determinar la categoría de imagen
  const getImageCategory = (fieldName: string): string => {
    switch (fieldName) {
      case 'hero-background':
        return 'hero-backgrounds';
      case 'about-image':
        return 'about-images';
      case 'product-image':
        return 'product-images';
      case 'testimonial-image':
        return 'testimonial-images';
      case 'services-background':
        return 'services-backgrounds';
      case 'contact-background':
        return 'contact-backgrounds';
      case 'testimonials-background':
        return 'testimonials-backgrounds';
      case 'new-testimonial-image':
        return 'testimonial-images';
      default:
        if (fieldName.startsWith('product-') && fieldName.endsWith('-image')) {
          return 'product-images';
        }
        if (fieldName.startsWith('testimonial-') && fieldName.endsWith('-image')) {
          return 'testimonial-images';
        }
        return 'general';
    }
  };

  // Funciones para manejar productos
  const addProduct = () => {
    if (!newProduct.name.trim()) {
      toast.error('El nombre del producto es obligatorio');
      return;
    }
    
    const product = {
      id: Date.now().toString(),
      ...newProduct,
      price: newProduct.price ? parseFloat(newProduct.price) : 0
    };
    
    const updatedProducts = [...products, product];
    setProducts(updatedProducts);
    setNewProduct({
      name: '',
      description: '',
      price: '',
      image: '',
      category: ''
    });
    
    // Actualizar sectionData
    const updatedSectionData = {
      ...sectionData,
      products: updatedProducts
    };
    setSectionData(updatedSectionData);
    
    console.log('Producto agregado:', product);
    console.log('Productos actualizados:', updatedProducts);
    console.log('SectionData actualizado:', updatedSectionData);
    
    toast.success('Producto agregado');
  };

  const removeProduct = (productId: string) => {
    const updatedProducts = products.filter(p => p.id !== productId);
    setProducts(updatedProducts);
    const updatedSectionData = {
      ...sectionData,
      products: updatedProducts
    };
    setSectionData(updatedSectionData);
    
    console.log('Producto eliminado:', productId);
    console.log('Productos actualizados:', updatedProducts);
    console.log('SectionData actualizado:', updatedSectionData);
    
    toast.success('Producto eliminado');
  };

  const updateProduct = (productId: string, field: string, value: string) => {
    const updatedProducts = products.map(p => 
      p.id === productId ? { ...p, [field]: value } : p
    );
    setProducts(updatedProducts);
    const updatedSectionData = {
      ...sectionData,
      products: updatedProducts
    };
    setSectionData(updatedSectionData);
    
    console.log('Producto actualizado:', productId, field, value);
    console.log('Productos actualizados:', updatedProducts);
    console.log('SectionData actualizado:', updatedSectionData);
  };

  // Funciones para manejar testimonios
  const addTestimonial = () => {
    if (!newTestimonial.name.trim() || !newTestimonial.content.trim()) {
      toast.error('El nombre y contenido del testimonio son obligatorios');
      return;
    }
    
    const testimonial = {
      id: Date.now().toString(),
      ...newTestimonial
    };
    
    setTestimonials([...testimonials, testimonial]);
    setNewTestimonial({
      name: '',
      role: '',
      content: '',
      image: '',
      rating: 5
    });
    
    // Actualizar sectionData
    setSectionData({
      ...sectionData,
      testimonials: [...testimonials, testimonial]
    });
    
    toast.success('Testimonio agregado');
  };

  const removeTestimonial = (testimonialId: string) => {
    const updatedTestimonials = testimonials.filter(t => t.id !== testimonialId);
    setTestimonials(updatedTestimonials);
    setSectionData({
      ...sectionData,
      testimonials: updatedTestimonials
    });
    toast.success('Testimonio eliminado');
  };

  const updateTestimonial = (testimonialId: string, field: string, value: string | number) => {
    const updatedTestimonials = testimonials.map(t => 
      t.id === testimonialId ? { ...t, [field]: value } : t
    );
    setTestimonials(updatedTestimonials);
    setSectionData({
      ...sectionData,
      testimonials: updatedTestimonials
    });
  };

  // Componente reutilizable para upload de imagen
  const ImageUploadField = ({ 
    fieldName, 
    label, 
    description, 
    currentValue, 
    onValueChange 
  }: {
    fieldName: string;
    label: string;
    description?: string;
    currentValue: string;
    onValueChange: (value: string) => void;
  }) => {
    const preview = imagePreviews[fieldName];
    const uploading = uploadingImages[fieldName];

    return (
      <div>
        <Label>{label}</Label>
        <div className="mt-2">
          {preview ? (
            <div className="relative inline-block">
              <img 
                src={preview} 
                alt={`${label} preview`} 
                className="w-32 h-24 object-cover border rounded-lg"
              />
              <button
                onClick={() => handleFileSelect(null, fieldName)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
              <Upload className="mx-auto h-6 w-6 text-gray-400 mb-2" />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileSelect(e.target.files?.[0] || null, fieldName)}
                className="hidden"
                id={`${fieldName}-upload`}
              />
              <label
                htmlFor={`${fieldName}-upload`}
                className="cursor-pointer text-sm text-gray-600 hover:text-gray-800"
              >
                <span className="font-medium text-blue-600 hover:text-blue-500">
                  Subir imagen
                </span>
                <span className="text-gray-500"> o arrastra aquí</span>
              </label>
              {description && (
                <p className="text-xs text-gray-500 mt-1">{description}</p>
              )}
            </div>
          )}
          {uploading && (
            <div className="mt-2 flex items-center text-sm text-blue-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
              Subiendo imagen...
            </div>
          )}
        </div>
        
        {/* Campo de URL como alternativa */}
        <div className="mt-3">
          <Label htmlFor={`${fieldName}-url`}>URL de imagen (alternativa)</Label>
          <Input
            id={`${fieldName}-url`}
            type="url"
            value={currentValue}
            onChange={(e) => onValueChange(e.target.value)}
            placeholder="https://ejemplo.com/imagen.jpg"
            className="mt-1"
          />
        </div>
      </div>
    );
  };

  // Generar formulario dinámico basado en el tipo de sección
  const renderSectionForm = (section: SectionConfiguration) => {
    switch (section.id) {
      case 'hero':
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="hero-title">Título principal *</Label>
              <Input
                id="hero-title"
                type="text"
                value={sectionData.title || ''}
                onChange={(e) => setSectionData({ ...sectionData, title: e.target.value })}
                placeholder="Título de bienvenida"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="hero-subtitle">Subtítulo</Label>
              <Input
                id="hero-subtitle"
                type="text"
                value={sectionData.subtitle || ''}
                onChange={(e) => setSectionData({ ...sectionData, subtitle: e.target.value })}
                placeholder="Descripción breve"
                className="mt-1"
              />
            </div>
            
            <ImageUploadField
              fieldName="hero-background"
              label="Imagen de fondo"
              description="PNG, JPG • Máximo 2MB • Recomendado: 1200x600px"
              currentValue={sectionData.backgroundImage || ''}
              onValueChange={(value) => setSectionData({ ...sectionData, backgroundImage: value })}
            />

            <div>
              <Label htmlFor="hero-cta-text">Texto del botón</Label>
              <Input
                id="hero-cta-text"
                type="text"
                value={sectionData.ctaText || ''}
                onChange={(e) => setSectionData({ ...sectionData, ctaText: e.target.value })}
                placeholder="Ver más"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="hero-cta-url">URL del botón</Label>
              <Input
                id="hero-cta-url"
                type="url"
                value={sectionData.ctaUrl || ''}
                onChange={(e) => setSectionData({ ...sectionData, ctaUrl: e.target.value })}
                placeholder="https://ejemplo.com"
                className="mt-1"
              />
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="about-title">Título *</Label>
              <Input
                id="about-title"
                type="text"
                value={sectionData.title || ''}
                onChange={(e) => setSectionData({ ...sectionData, title: e.target.value })}
                placeholder="Sobre Nosotros"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="about-content">Contenido *</Label>
              <Textarea
                id="about-content"
                value={sectionData.content?.[0] || ''}
                onChange={(e) => setSectionData({ 
                  ...sectionData, 
                  content: [e.target.value] 
                })}
                placeholder="Describe tu empresa, misión, visión..."
                rows={6}
                className="mt-1"
              />
            </div>
            
            <ImageUploadField
              fieldName="about-image"
              label="Imagen de la empresa"
              description="PNG, JPG • Máximo 2MB • Recomendado: 600x400px"
              currentValue={sectionData.image || ''}
              onValueChange={(value) => setSectionData({ ...sectionData, image: value })}
            />
          </div>
        );

      case 'products':
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="products-title">Título de la sección *</Label>
              <Input
                id="products-title"
                type="text"
                value={sectionData.title || ''}
                onChange={(e) => setSectionData({ ...sectionData, title: e.target.value })}
                placeholder="Nuestros Productos"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="products-subtitle">Subtítulo</Label>
              <Input
                id="products-subtitle"
                type="text"
                value={sectionData.subtitle || ''}
                onChange={(e) => setSectionData({ ...sectionData, subtitle: e.target.value })}
                placeholder="Descubre nuestra colección"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="products-description">Descripción</Label>
              <Textarea
                id="products-description"
                value={sectionData.description || ''}
                onChange={(e) => setSectionData({ ...sectionData, description: e.target.value })}
                placeholder="Describe tus productos o servicios..."
                rows={4}
                className="mt-1"
              />
            </div>
            
            {/* Lista de productos existentes */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <Label className="text-base font-medium">Productos ({products.length})</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={loadProductsFromBackend}
                  disabled={loadingProducts}
                  className="flex items-center gap-2"
                >
                  {loadingProducts ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Loader2 className="h-4 w-4" />
                  )}
                  {loadingProducts ? 'Cargando...' : 'Recargar del Backend'}
                </Button>
              </div>
              
              {products.length > 0 && (
                <div className="space-y-4">
                  {products.map((product, index) => (
                    <Card key={product.id} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label className="text-sm">Nombre</Label>
                              <Input
                                value={product.name}
                                onChange={(e) => updateProduct(product.id, 'name', e.target.value)}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label className="text-sm">Precio</Label>
                              <Input
                                type="number"
                                value={product.price}
                                onChange={(e) => updateProduct(product.id, 'price', e.target.value)}
                                className="mt-1"
                                placeholder="0.00"
                              />
                            </div>
                          </div>
                          <div>
                            <Label className="text-sm">Descripción</Label>
                            <Textarea
                              value={product.description}
                              onChange={(e) => updateProduct(product.id, 'description', e.target.value)}
                              className="mt-1"
                              rows={2}
                            />
                          </div>
                          <div>
                            <Label className="text-sm">Categoría</Label>
                            <Input
                              value={product.category}
                              onChange={(e) => updateProduct(product.id, 'category', e.target.value)}
                              className="mt-1"
                              placeholder="Ej: Electrónicos"
                            />
                          </div>
                          
                          <ImageUploadField
                            fieldName={`product-${product.id}-image`}
                            label="Imagen del producto"
                            description="PNG, JPG • Máximo 2MB • Recomendado: 400x300px"
                            currentValue={product.image || ''}
                            onValueChange={(value) => updateProduct(product.id, 'image', value)}
                          />
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeProduct(product.id)}
                          className="ml-3 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Formulario para agregar nuevo producto */}
            <Card className="p-4 border-dashed">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-blue-600" />
                  <Label className="text-base font-medium">Agregar Nuevo Producto</Label>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sm">Nombre del producto *</Label>
                    <Input
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="mt-1"
                      placeholder="Ej: Laptop Gaming"
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Precio</Label>
                    <Input
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      className="mt-1"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm">Descripción</Label>
                  <Textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    className="mt-1"
                    rows={3}
                    placeholder="Describe las características del producto..."
                  />
                </div>
                
                <div>
                  <Label className="text-sm">Categoría</Label>
                  <Input
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="mt-1"
                    placeholder="Ej: Electrónicos"
                  />
                </div>
                
                <ImageUploadField
                  fieldName="new-product-image"
                  label="Imagen del producto"
                  description="PNG, JPG • Máximo 2MB • Recomendado: 400x300px"
                  currentValue={newProduct.image || ''}
                  onValueChange={(value) => setNewProduct({ ...newProduct, image: value })}
                />
                
                <Button
                  onClick={addProduct}
                  className="w-full"
                  disabled={!newProduct.name.trim()}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Producto
                </Button>
              </div>
            </Card>
          </div>
        );

      case 'services':
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="services-title">Título de la sección *</Label>
              <Input
                id="services-title"
                type="text"
                value={sectionData.title || ''}
                onChange={(e) => setSectionData({ ...sectionData, title: e.target.value })}
                placeholder="Nuestros Servicios"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="services-subtitle">Subtítulo</Label>
              <Input
                id="services-subtitle"
                type="text"
                value={sectionData.subtitle || ''}
                onChange={(e) => setSectionData({ ...sectionData, subtitle: e.target.value })}
                placeholder="Lo que ofrecemos"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="services-description">Descripción</Label>
              <Textarea
                id="services-description"
                value={sectionData.description || ''}
                onChange={(e) => setSectionData({ ...sectionData, description: e.target.value })}
                placeholder="Describe los servicios que ofreces..."
                rows={4}
                className="mt-1"
              />
            </div>
            
            <ImageUploadField
              fieldName="services-background"
              label="Imagen de fondo para servicios"
              description="PNG, JPG • Máximo 2MB • Recomendado: 1200x400px"
              currentValue={sectionData.backgroundImage || ''}
              onValueChange={(value) => setSectionData({ ...sectionData, backgroundImage: value })}
            />
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="contact-title">Título de la sección *</Label>
              <Input
                id="contact-title"
                type="text"
                value={sectionData.title || ''}
                onChange={(e) => setSectionData({ ...sectionData, title: e.target.value })}
                placeholder="Contáctanos"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="contact-email">Email de contacto</Label>
              <Input
                id="contact-email"
                type="email"
                value={sectionData.email || ''}
                onChange={(e) => setSectionData({ ...sectionData, email: e.target.value })}
                placeholder="info@empresa.com"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="contact-phone">Teléfono</Label>
              <Input
                id="contact-phone"
                type="tel"
                value={sectionData.phone || ''}
                onChange={(e) => setSectionData({ ...sectionData, phone: e.target.value })}
                placeholder="+34 123 456 789"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="contact-address">Dirección</Label>
              <Textarea
                id="contact-address"
                value={sectionData.address || ''}
                onChange={(e) => setSectionData({ ...sectionData, address: e.target.value })}
                placeholder="Dirección de la empresa..."
                rows={3}
                className="mt-1"
              />
            </div>
            
            <ImageUploadField
              fieldName="contact-background"
              label="Imagen de fondo para contacto"
              description="PNG, JPG • Máximo 2MB • Recomendado: 1200x400px"
              currentValue={sectionData.backgroundImage || ''}
              onValueChange={(value) => setSectionData({ ...sectionData, backgroundImage: value })}
            />
          </div>
        );

      case 'testimonials':
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="testimonials-title">Título de la sección *</Label>
              <Input
                id="testimonials-title"
                type="text"
                value={sectionData.title || ''}
                onChange={(e) => setSectionData({ ...sectionData, title: e.target.value })}
                placeholder="Lo que dicen nuestros clientes"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="testimonials-subtitle">Subtítulo</Label>
              <Input
                id="testimonials-subtitle"
                type="text"
                value={sectionData.subtitle || ''}
                onChange={(e) => setSectionData({ ...sectionData, subtitle: e.target.value })}
                placeholder="Testimonios de clientes satisfechos"
                className="mt-1"
              />
            </div>
            
            {/* Lista de testimonios existentes */}
            {testimonials.length > 0 && (
              <div>
                <Label className="text-base font-medium">Testimonios Agregados ({testimonials.length})</Label>
                <div className="space-y-4 mt-3">
                  {testimonials.map((testimonial, index) => (
                    <Card key={testimonial.id} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label className="text-sm">Nombre *</Label>
                              <Input
                                value={testimonial.name}
                                onChange={(e) => updateTestimonial(testimonial.id, 'name', e.target.value)}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label className="text-sm">Cargo/Rol</Label>
                              <Input
                                value={testimonial.role}
                                onChange={(e) => updateTestimonial(testimonial.id, 'role', e.target.value)}
                                className="mt-1"
                                placeholder="Ej: CEO, Cliente"
                              />
                            </div>
                          </div>
                          <div>
                            <Label className="text-sm">Testimonio *</Label>
                            <Textarea
                              value={testimonial.content}
                              onChange={(e) => updateTestimonial(testimonial.id, 'content', e.target.value)}
                              className="mt-1"
                              rows={3}
                              placeholder="Lo que dice el cliente..."
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label className="text-sm">Calificación (1-5)</Label>
                              <Input
                                type="number"
                                min="1"
                                max="5"
                                value={testimonial.rating}
                                onChange={(e) => updateTestimonial(testimonial.id, 'rating', parseInt(e.target.value))}
                                className="mt-1"
                              />
                            </div>
                          </div>
                          
                          <ImageUploadField
                            fieldName={`testimonial-${testimonial.id}-image`}
                            label="Foto del cliente"
                            description="PNG, JPG • Máximo 2MB • Recomendado: 200x200px"
                            currentValue={testimonial.image || ''}
                            onValueChange={(value) => updateTestimonial(testimonial.id, 'image', value)}
                          />
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeTestimonial(testimonial.id)}
                          className="ml-3 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Formulario para agregar nuevo testimonio */}
            <Card className="p-4 border-dashed">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-blue-600" />
                  <Label className="text-base font-medium">Agregar Nuevo Testimonio</Label>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sm">Nombre del cliente *</Label>
                    <Input
                      value={newTestimonial.name}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                      className="mt-1"
                      placeholder="Ej: María García"
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Cargo/Rol</Label>
                    <Input
                      value={newTestimonial.role}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
                      className="mt-1"
                      placeholder="Ej: CEO, Cliente"
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm">Testimonio *</Label>
                  <Textarea
                    value={newTestimonial.content}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, content: e.target.value })}
                    className="mt-1"
                    rows={3}
                    placeholder="Lo que dice el cliente sobre tu servicio..."
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sm">Calificación (1-5)</Label>
                    <Input
                      type="number"
                      min="1"
                      max="5"
                      value={newTestimonial.rating}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, rating: parseInt(e.target.value) })}
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <ImageUploadField
                  fieldName="new-testimonial-image"
                  label="Foto del cliente"
                  description="PNG, JPG • Máximo 2MB • Recomendado: 200x200px"
                  currentValue={newTestimonial.image || ''}
                  onValueChange={(value) => setNewTestimonial({ ...newTestimonial, image: value })}
                />
                
                <Button
                  onClick={addTestimonial}
                  className="w-full"
                  disabled={!newTestimonial.name.trim() || !newTestimonial.content.trim()}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Testimonio
                </Button>
              </div>
            </Card>
            
            <ImageUploadField
              fieldName="testimonials-background"
              label="Imagen de fondo para testimonios"
              description="PNG, JPG • Máximo 2MB • Recomendado: 1200x400px"
              currentValue={sectionData.backgroundImage || ''}
              onValueChange={(value) => setSectionData({ ...sectionData, backgroundImage: value })}
            />
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <div className="text-gray-500 mb-4">
              <span className="text-4xl">⚙️</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Configuración automática
            </h3>
            <p className="text-gray-600">
              Esta sección se configurará automáticamente con valores por defecto.
            </p>
          </div>
        );
    }
  };

  const handleNext = async () => {
    try {
      setSaving(true);
      setError(null);

      // Subir imágenes si hay archivos
      const updatedData = { ...sectionData };
      const imageFields = Object.keys(imageFiles);
      
      for (const fieldName of imageFields) {
        const file = imageFiles[fieldName];
        if (file) {
          setUploadingImages(prev => ({ ...prev, [fieldName]: true }));
          try {
            const imageUrl = await uploadImage(file, fieldName);
            // Mapear el nombre del campo al campo correcto en sectionData
            const dataField = getDataFieldName(fieldName);
            updatedData[dataField] = imageUrl;
            toast.success('Imagen subida correctamente');
          } catch (error: any) {
            toast.error(error.message);
            return;
          } finally {
            setUploadingImages(prev => ({ ...prev, [fieldName]: false }));
          }
        }
      }

      // Asegurar que los productos se incluyan en los datos de la sección
      if (currentSection.id === 'products') {
        updatedData.products = products;
        console.log('Productos incluidos en sectionData:', products);
        
        // Guardar productos en el backend
        try {
          await siteBuilderAPI.saveClientProducts(clientId, products);
          console.log('Productos guardados en el backend');
        } catch (error: any) {
          console.error('Error al guardar productos en el backend:', error);
          toast.error('Error al guardar productos en el backend');
        }
      }

      // Asegurar que los testimonios se incluyan en los datos de la sección
      if (currentSection.id === 'testimonials') {
        updatedData.testimonials = testimonials;
        console.log('Testimonios incluidos en sectionData:', testimonials);
      }

      // Actualizar la sección actual con los nuevos datos
      const updatedSections = sections.map(s => 
        s.id === currentSection.id 
          ? { ...s, data: updatedData }
          : s
      );

      // Actualizar el estado local
      setSections(updatedSections);

      // Ir a la siguiente sección o completar
      if (currentSectionIndex < enabledSections.length - 1) {
        setCurrentSectionIndex(currentSectionIndex + 1);
        toast.success('Sección configurada');
      } else {
        // Pasar todas las secciones actualizadas al siguiente paso
        onNext(updatedSections);
        toast.success('¡Todas las secciones configuradas!');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Error al guardar la sección';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  // Función para mapear nombres de campos de imagen a campos de datos
  const getDataFieldName = (fieldName: string): string => {
    switch (fieldName) {
      case 'hero-background':
        return 'backgroundImage';
      case 'about-image':
        return 'image';
      case 'product-image':
        return 'featuredImage';
      case 'testimonial-image':
        return 'backgroundImage';
      case 'services-background':
        return 'backgroundImage';
      case 'contact-background':
        return 'backgroundImage';
      case 'new-product-image':
        return 'image';
      case 'testimonials-background':
        return 'backgroundImage';
      case 'new-testimonial-image':
        return 'image';
      default:
        if (fieldName.startsWith('product-') && fieldName.endsWith('-image')) {
          return 'image';
        }
        if (fieldName.startsWith('testimonial-') && fieldName.endsWith('-image')) {
          return 'image';
        }
        return fieldName;
    }
  };

  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

  if (!currentSection) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 mb-4">
          <span className="text-4xl">⚠️</span>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No hay secciones habilitadas
        </h3>
        <p className="text-gray-600">
          Primero debes seleccionar las secciones que quieres incluir en tu sitio.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">

      {/* Barra de progreso */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progreso: {currentSectionIndex + 1} de {enabledSections.length}</span>
          <span>{Math.round(((currentSectionIndex + 1) / enabledSections.length) * 100)}%</span>
        </div>
        <Progress value={((currentSectionIndex + 1) / enabledSections.length) * 100} className="h-2" />
      </div>

      {/* Header de la sección actual */}
      <div className="mb-6">
        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            {currentSectionIndex + 1}
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Configurando: {getSectionDisplayName(currentSection.id)}
            </h2>
            <p className="text-sm text-gray-600">
              Personaliza el contenido de esta sección
            </p>
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          {renderSectionForm(currentSection)}
        </CardContent>
      </Card>

      <div className="mt-8 flex justify-between">
        <Button
          onClick={handlePrevious}
          variant="outline"
          disabled={currentSectionIndex === 0}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Anterior
        </Button>

        <Button
          onClick={handleNext}
          disabled={saving || Object.values(uploadingImages).some(Boolean)}
        >
          {saving || Object.values(uploadingImages).some(Boolean) ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Guardando...
            </>
          ) : currentSectionIndex === enabledSections.length - 1 ? (
            'Finalizar'
          ) : (
            <>
              Siguiente
              <ChevronRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
