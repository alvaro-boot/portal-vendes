# Sistema de Subida y Renombrado de Imágenes

## Descripción

Este sistema automáticamente renombra las imágenes antes de enviarlas al backend, organizándolas por categorías y asignándoles nombres descriptivos según su función.

## Categorías de Imágenes

### 1. **Logos** (`logos`)
- **Nombre del archivo**: `logo.{extensión}`
- **Ejemplo**: `logo.png`, `logo.svg`
- **Uso**: Logotipos de empresas

### 2. **Favicons** (`favicons`)
- **Nombre del archivo**: `favicon.{extensión}`
- **Ejemplo**: `favicon.ico`, `favicon.png`
- **Uso**: Iconos de pestaña del navegador

### 3. **Banners/Hero Backgrounds** (`hero-backgrounds`)
- **Nombre del archivo**: `banner.{extensión}`
- **Ejemplo**: `banner.jpg`, `banner.png`
- **Uso**: Imágenes de fondo de la sección hero

### 4. **Imágenes de About** (`about-images`)
- **Nombre del archivo**: `about.{extensión}`
- **Ejemplo**: `about.jpg`, `about.png`
- **Uso**: Imágenes de la sección "Acerca de"

### 5. **Imágenes de Productos** (`product-images`)
- **Nombre del archivo**: `product-{número}.{extensión}`
- **Ejemplo**: `product-1.jpg`, `product-2.png`
- **Uso**: Imágenes de productos individuales

### 6. **Imágenes de Testimonios** (`testimonial-images`)
- **Nombre del archivo**: `testimonial-{número}.{extensión}`
- **Ejemplo**: `testimonial-1.jpg`, `testimonial-2.png`
- **Uso**: Fotos de clientes en testimonios

### 7. **Fondos de Servicios** (`services-backgrounds`)
- **Nombre del archivo**: `services-bg.{extensión}`
- **Ejemplo**: `services-bg.jpg`, `services-bg.png`
- **Uso**: Imágenes de fondo de la sección de servicios

### 8. **Fondos de Contacto** (`contact-backgrounds`)
- **Nombre del archivo**: `contact-bg.{extensión}`
- **Ejemplo**: `contact-bg.jpg`, `contact-bg.png`
- **Uso**: Imágenes de fondo de la sección de contacto

### 9. **Fondos de Testimonios** (`testimonials-backgrounds`)
- **Nombre del archivo**: `testimonials-bg.{extensión}`
- **Ejemplo**: `testimonials-bg.jpg`, `testimonials-bg.png`
- **Uso**: Imágenes de fondo de la sección de testimonios

## Implementación

### Función Principal de Renombrado

```typescript
// En lib/api.ts
renameFileByCategory: (file: File, category: string): File => {
  const extension = file.name.split('.').pop() || '';
  let newFileName = '';
  
  switch (category) {
    case 'logos':
      newFileName = `logo.${extension}`;
      break;
    case 'favicons':
      newFileName = `favicon.${extension}`;
      break;
    case 'hero-backgrounds':
      newFileName = `banner.${extension}`;
      break;
    // ... más casos
  }
  
  return new File([file], newFileName, { type: file.type });
}
```

### Uso en Formularios

```typescript
// En basic-info-form.tsx
const logoResponse = await imageAPI.uploadImage(clientId, renamedLogoFile, 'logos');
const faviconResponse = await imageAPI.uploadImage(clientId, renamedFaviconFile, 'favicons');
```

### Uso en Editor de Secciones

```typescript
// En section-data-editor.tsx
const specificFileName = getSpecificFileName(fieldName, file.name);
const renamedFile = new File([file], specificFileName, { type: file.type });
const response = await imageAPI.uploadImage(clientId, renamedFile, category);
```

## Ventajas del Sistema

1. **Organización**: Los archivos se organizan automáticamente por categorías
2. **Nombres descriptivos**: Cada archivo tiene un nombre que indica su función
3. **Consistencia**: Todos los archivos siguen el mismo patrón de nomenclatura
4. **Facilidad de mantenimiento**: Es fácil identificar qué archivo es qué
5. **Evita conflictos**: Los nombres únicos evitan sobrescrituras accidentales

## Estructura de Archivos en el Backend

```
/storage/images/{clientId}/
├── logos/
│   └── logo.png
├── favicons/
│   └── favicon.ico
├── hero-backgrounds/
│   └── banner.jpg
├── product-images/
│   ├── product-1.jpg
│   ├── product-2.png
│   └── product-3.jpg
├── testimonial-images/
│   ├── testimonial-1.jpg
│   └── testimonial-2.png
└── ...
```

## Logs y Debugging

El sistema incluye logs detallados para facilitar el debugging:

```typescript
console.log('Subiendo imagen:', {
  originalName: imageFile.name,
  newName: renamedFile.name,
  category: category,
  size: imageFile.size,
  type: imageFile.type
});
```

## Configuración

Las categorías y límites están definidos en `constants/dashboard.ts`:

```typescript
export const FILE_LIMITS = {
  MAX_IMAGE_SIZE: 2 * 1024 * 1024, // 2MB
  ALLOWED_IMAGE_TYPES: ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"],
  LOGO_DIMENSIONS: "200x200px",
  BANNER_DIMENSIONS: "1200x400px",
}
```
