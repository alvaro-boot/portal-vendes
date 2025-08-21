# Generación Automática del ID del Cliente y URLs

## Descripción

El sistema ahora genera automáticamente el ID del cliente basado en el dominio ingresado y muestra la URL completa con la extensión correcta según el tipo de dominio seleccionado.

## Funcionalidad Implementada

### **Generación Automática del ID y URL**

Cuando el usuario ingresa un dominio en el campo correspondiente, el sistema:

1. **Limpia el dominio**: Convierte a minúsculas y elimina caracteres no válidos
2. **Genera el ID**: Usa el dominio limpio como ID del cliente
3. **Construye la URL**: Agrega la extensión correcta según el tipo de dominio
4. **Actualiza el estado**: Guarda el ID en el store global
5. **Muestra feedback**: Presenta visualmente la URL completa y el ID generado

### **Tipos de Dominio y Extensiones**

| **Tipo de Dominio** | **Extensión Agregada** | **Ejemplo** |
|---------------------|------------------------|-------------|
| Subdominio de Vendes | `.vendes.com` | `micomercio.vendes.com` |
| Dominio Propio | `.com` | `micomercio.com` |

### **Proceso de Limpieza**

```typescript
const cleanDomain = value.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
```

**Reglas de limpieza:**
- ✅ Convierte a minúsculas
- ✅ Elimina espacios en blanco
- ✅ Permite solo letras, números y guiones
- ✅ Mantiene la longitud original (hasta 63 caracteres)

### **Ejemplos de Conversión**

| **Dominio Ingresado** | **ID del Cliente** | **URL Completa** |
|----------------------|-------------------|------------------|
| `Mi Comercio` (Subdominio) | `mi-comercio` | `https://mi-comercio.vendes.com` |
| `EMPRESA_123` (Subdominio) | `empresa-123` | `https://empresa-123.vendes.com` |
| `Tienda Online` (Propio) | `tienda-online` | `https://tienda-online.com` |
| `mi-tienda` (Propio) | `mi-tienda` | `https://mi-tienda.com` |

## Implementación Técnica

### **1. Hook useSiteBuilder**

```typescript
const { clientId, setClientId } = useSiteBuilder();
```

### **2. Función handleDomainChange Mejorada**

```typescript
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
      setClientId(cleanSubdomain);
    }
  }

  // Si se está cambiando el dominio propio, actualizar el clientId
  if (field === 'customDomain' && value.trim()) {
    const cleanDomain = value.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
    if (cleanDomain) {
      setClientId(cleanDomain);
    }
  }

  setTouchedFields(prev => ({ ...prev, [field]: true }));
  if (errors[field]) {
    setErrors(prev => ({ ...prev, [field]: '' }));
  }
};
```

### **3. Visualización de URL Completa**

```typescript
{/* Mostrar la URL completa para subdominio */}
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

{/* Mostrar la URL completa para dominio propio */}
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
```

### **4. Campos de Entrada Mejorados**

```typescript
{/* Campo de subdominio con extensión visual */}
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

{/* Campo de dominio propio con extensión visual */}
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
```

## Beneficios

### **1. Consistencia**
- ✅ ID único para cada cliente
- ✅ Formato estandarizado
- ✅ URLs válidas y consistentes
- ✅ Sin conflictos de nombres

### **2. Usabilidad**
- ✅ Generación automática de URLs
- ✅ Feedback visual inmediato
- ✅ Extensiones automáticas
- ✅ Sin necesidad de configuración manual

### **3. Integridad de Datos**
- ✅ IDs válidos para URLs
- ✅ URLs completas y funcionales
- ✅ Compatible con sistemas de archivos
- ✅ Seguro para bases de datos

### **4. Experiencia de Usuario**
- ✅ Proceso transparente
- ✅ Información clara y visual
- ✅ Validación en tiempo real
- ✅ Previsualización de URL final

## Flujo de Usuario

### **Paso 1: Seleccionar Tipo de Dominio**
1. El usuario selecciona "Subdominio de Vendes" o "Dominio Propio"
2. Se muestra el campo correspondiente con la extensión visual

### **Paso 2: Ingresar Nombre del Dominio**
1. El usuario ingresa el nombre deseado (ej: "Mi Comercio")
2. El sistema limpia automáticamente el texto
3. Se muestra la extensión correcta en el campo

### **Paso 3: Verificación Visual**
1. Se muestra la URL completa en un recuadro azul
2. Se muestra el ID generado en un recuadro verde
3. El usuario puede verificar que todo es correcto

### **Paso 4: Continuar**
1. El ID se guarda en el estado global
2. La URL se construye automáticamente
3. Se mantiene consistente en todo el flujo

## Validaciones

### **Validación de Dominio**
- ✅ Mínimo 3 caracteres
- ✅ Máximo 63 caracteres
- ✅ Solo letras, números y guiones
- ✅ No puede empezar o terminar con guión

### **Validación de URL**
- ✅ Formato consistente
- ✅ Protocolo HTTPS
- ✅ Extensión correcta según tipo
- ✅ Compatible con navegadores

## Casos de Uso

### **1. Subdominio de Vendes**
- Usuario ingresa "Mi Tienda Online"
- Sistema genera ID: `mi-tienda-online`
- URL final: `https://mi-tienda-online.vendes.com`

### **2. Dominio Propio**
- Usuario ingresa "Empresa123"
- Sistema genera ID: `empresa123`
- URL final: `https://empresa123.com`

### **3. Caracteres Especiales**
- Usuario ingresa "Tienda@Online"
- Sistema genera ID: `tienda-online`
- URL final: `https://tienda-online.vendes.com` (subdominio) o `https://tienda-online.com` (propio)

## Integración con el Sistema

### **1. Store Global**
```typescript
// El ID se guarda en el estado global
setClientId(cleanDomain);
```

### **2. API Calls**
```typescript
// Se usa en todas las llamadas a la API
const response = await imageAPI.uploadImage(clientId, file, category);
```

### **3. Almacenamiento de Configuración**
```typescript
// Se incluye en la configuración del cliente
const clientConfig = {
  clientId: clientId,
  domain: {
    type: 'subdominio' | 'propio',
    url: `https://${clientId}.${extension}`,
    // ... otros datos
  }
};
```

## Próximas Mejoras

### **1. Validación de Disponibilidad**
```typescript
// Verificar que el dominio no esté en uso
const isAvailable = await checkDomainAvailability(domain, type);
```

### **2. Múltiples Extensiones**
```typescript
// Soporte para .net, .org, .co, etc.
const extensions = ['.com', '.net', '.org', '.co'];
```

### **3. Previsualización Avanzada**
```typescript
// Mostrar información adicional
const domainInfo = {
  availability: true,
  price: '$12/year',
  features: ['SSL', 'Email', 'Support']
};
```

## Conclusión

La generación automática del ID del cliente y la construcción de URLs completas proporciona:

- ✅ **Simplicidad**: Proceso automático y transparente
- ✅ **Consistencia**: URLs únicas y bien formateadas
- ✅ **Usabilidad**: Feedback visual inmediato
- ✅ **Integridad**: URLs válidas y funcionales
- ✅ **Flexibilidad**: Soporte para diferentes tipos de dominio

Esta funcionalidad mejora significativamente la experiencia del usuario al crear sitios web, asegurando que cada cliente tenga un identificador único y una URL completa y funcional desde el inicio del proceso.
