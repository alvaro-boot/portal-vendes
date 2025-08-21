# Sistema de Autoregistro - Portal Vendes

## Descripción

El sistema de autoregistro permite a los usuarios crear cuentas en el portal de Vendes de forma automática. Todas las credenciales se almacenan en un enum y permiten iniciar sesión en el sistema.

## Características

### 🔐 Autenticación y Registro
- **Registro automático**: Los usuarios pueden crear cuentas con nombres, correo, teléfono, documento y contraseña
- **Inicio de sesión**: Autenticación con credenciales registradas
- **Validaciones**: Verificación de contraseñas, emails únicos, documentos únicos y longitud mínima
- **Hasheo de contraseñas**: Las contraseñas se almacenan de forma segura

### 📊 Enum de Usuarios
- **UsuariosRegistrados**: Enum que contiene todos los emails de usuarios registrados
- **Usuarios predefinidos**: demo@vendes.com, admin@vendes.com, test@vendes.com
- **Expansión automática**: El enum se actualiza automáticamente con nuevos registros

### 👑 Sistema de Roles
- **Roles disponibles**: admin, cliente
- **Claves de administrador**: 1, 2, 3, 4
- **Asignación automática**: Los usuarios que ingresen una clave válida obtienen rol de admin
- **Por defecto**: Los usuarios se registran como clientes
- **Restricciones por rol**:
  - **Administradores**: Pueden crear múltiples páginas web y acceder a todas las funcionalidades
  - **Clientes**: Solo pueden crear una página web por cuenta

### 🛡️ Seguridad
- **Contraseñas hasheadas**: Uso de función de hasheo personalizada
- **Validación de sesiones**: Cookies seguras con httpOnly
- **Middleware de protección**: Rutas protegidas automáticamente
- **Validación de documentos únicos**: Evita duplicados de documentos de identidad
- **API de autenticación**: Endpoint seguro para obtener usuario actual
- **Gestión de sesiones**: Cookies persistentes con expiración automática

## Estructura de Archivos

```
portal-vendes/
├── types/dashboard.ts          # Tipos TypeScript para usuarios y autenticación
├── lib/users.ts               # Lógica de gestión de usuarios y enum
├── lib/auth.ts                # Funciones de autenticación y sesión
├── app/login/
│   ├── page.tsx              # Página de login/registro
│   └── actions.ts            # Acciones de autenticación
├── app/admin/usuarios/
│   └── page.tsx              # Panel de administración de usuarios
├── app/api/auth/me/
│   └── route.ts              # API para obtener usuario actual
├── hooks/use-current-user.ts  # Hook para obtener usuario actual
└── constants/portal.ts        # Enlaces de navegación incluyendo admin
```

## Tipos de Datos

### Usuario
```typescript
interface Usuario {
  id: string
  email: string
  password: string
  nombres: string
  telefono: string
  documento: string
  fechaRegistro: Date
  estado: "activo" | "inactivo"
  rol: "admin" | "cliente"
}
```

### Enum UsuariosRegistrados
```typescript
enum UsuariosRegistrados {
  DEMO = "demo@vendes.com",
  ADMIN = "admin@vendes.com",
  TEST = "test@vendes.com"
}
```

## Funcionalidades

### 1. Registro de Usuario
- Formulario con validaciones completas
- Verificación de contraseñas coincidentes
- Validación de email único
- Validación de documento único
- Validación de formato de teléfono
- Hasheo automático de contraseña
- **Selección de rol** (admin/cliente) con radio buttons
- **Clave de administrador requerida** si se selecciona rol admin (1, 2, 3, 4)
- Inicio de sesión automático post-registro

### 2. Inicio de Sesión
- Autenticación con email y contraseña
- Verificación de estado de usuario
- Creación de sesión segura
- Redirección automática

### 3. Panel de Administración
- Vista de todos los usuarios registrados
- Estadísticas del sistema
- Visualización del enum actual
- Información detallada de cada usuario
- Visualización de nuevos registros

### 4. Restricciones por Rol
- **Usuarios Clientes**:
  - Solo pueden crear una página web
  - En "Mi Tienda" solo ven su página web creada
  - No pueden acceder al Constructor de Sitios si ya tienen una página
  - **No tienen acceso a la opción "Usuarios"** en el menú lateral
- **Usuarios Administradores**:
  - Pueden crear múltiples páginas web
  - Acceso completo a todas las funcionalidades
  - Pueden gestionar usuarios y páginas web
  - **Tienen acceso completo a todas las opciones** del menú lateral

## Usuarios Predefinidos

| Email | Contraseña | Nombres | Teléfono | Documento | Rol |
|-------|------------|---------|----------|-----------|-----|
| demo@vendes.com | demo123 | Usuario Demo | 3001234567 | 12345678 | Cliente |
| admin@vendes.com | admin123 | Administrador Sistema | 3009876543 | 87654321 | Admin |
| test@vendes.com | test123 | Usuario Test | 3005555555 | 55555555 | Cliente |

## Flujo de Uso

### Para Usuarios Nuevos
1. Acceder a `/login`
2. Hacer clic en "¿No tienes cuenta? Regístrate"
3. Completar formulario con:
   - Nombres completos
   - Correo electrónico
   - Número de teléfono
   - Número de documento
   - Contraseña y confirmación
   - **Tipo de cuenta**: Cliente o Administrador
   - **Clave de administrador** (solo si selecciona Administrador): 1, 2, 3 o 4
4. Inicio de sesión automático

### Para Usuarios Existentes
1. Acceder a `/login`
2. Ingresar email y contraseña
3. Inicio de sesión automático

### Para Administradores
1. Iniciar sesión con credenciales de admin
2. Acceder a "Usuarios" en el sidebar
3. Ver panel de administración en `/admin/usuarios`
4. Crear múltiples páginas web sin restricciones
5. Gestionar todas las funcionalidades del sistema

### Restricciones por Rol
- **Clientes**: Solo pueden crear una página web. Una vez creada, no pueden crear más.
- **Administradores**: Sin restricciones, pueden crear múltiples páginas web.

## Configuración

### Variables de Entorno
```env
NODE_ENV=development|production
```

### Cookies de Sesión
- **Nombre**: `vd_session`
- **Duración**: 24 horas
- **Seguridad**: httpOnly, secure en producción

## Seguridad

### Validaciones Implementadas
- ✅ Longitud mínima de contraseña (6 caracteres)
- ✅ Verificación de contraseñas coincidentes
- ✅ Emails únicos en el sistema
- ✅ Documentos únicos en el sistema
- ✅ Formato de teléfono (7-15 dígitos)
- ✅ Formato de documento (5-20 dígitos)
- ✅ Nombres obligatorios
- ✅ Hasheo de contraseñas
- ✅ Verificación de estado de usuario
- ✅ Cookies seguras

### Consideraciones de Producción
- Implementar bcryptjs para hasheo más seguro
- Agregar rate limiting para registros
- Implementar verificación de email
- Agregar logs de auditoría
- Configurar base de datos persistente
- Implementar validación de documentos oficiales

## API Endpoints

### POST /login
```typescript
// Login
{
  email: string
  password: string
}
```

### POST /register
```typescript
// Registro
{
  email: string
  password: string
  confirmPassword: string
  nombres: string
  telefono: string
  documento: string
  rolSeleccionado: "admin" | "cliente"
  claveAdmin?: string  // Requerido si rolSeleccionado === "admin"
}
```

## Desarrollo

### Agregar Nuevo Usuario al Enum
```typescript
// En lib/users.ts
export enum UsuariosRegistrados {
  DEMO = "demo@vendes.com",
  ADMIN = "admin@vendes.com",
  TEST = "test@vendes.com",
  NUEVO = "nuevo@vendes.com"  // Agregar aquí
}
```

### Modificar Validaciones
```typescript
// En lib/users.ts - función registrarUsuario
if (datos.password.length < 8) {  // Cambiar longitud mínima
  return { success: false, error: "La contraseña debe tener al menos 8 caracteres" }
}

// Validar formato de teléfono
if (!/^\d{10}$/.test(datos.telefono.replace(/\s/g, ''))) {  // Solo 10 dígitos
  return { success: false, error: "El teléfono debe tener exactamente 10 dígitos" }
}
```

## Campos del Formulario

### Campos Obligatorios
1. **Nombres completos**: Texto libre, obligatorio
2. **Correo electrónico**: Formato email válido, único en el sistema
3. **Número de teléfono**: 7-15 dígitos numéricos
4. **Número de documento**: 5-20 dígitos numéricos, único en el sistema
5. **Contraseña**: Mínimo 6 caracteres
6. **Confirmar contraseña**: Debe coincidir con la contraseña
7. **Tipo de cuenta**: Cliente o Administrador (selección obligatoria)

### Campos Condicionales
8. **Clave de administrador**: 1, 2, 3 o 4 (requerida solo si selecciona Administrador)

### Validaciones Específicas
- **Teléfono**: Solo números, espacios se eliminan automáticamente
- **Documento**: Solo números, espacios se eliminan automáticamente
- **Email**: Formato estándar de email, se convierte a minúsculas
- **Nombres**: Se eliminan espacios en blanco al inicio y final

## Restricciones y Límites

### Usuarios Clientes
- **Límite de páginas web**: 1 página por cuenta
- **Constructor de Sitios**: Solo accesible si no tienen página web creada
- **Mi Tienda**: Solo muestra su página web creada
- **Asignación automática**: La página web se asigna automáticamente al completar la creación
- **Menú lateral**: No ven la opción "Usuarios"

### Usuarios Administradores
- **Límite de páginas web**: Sin límite
- **Constructor de Sitios**: Acceso completo
- **Mi Tienda**: Acceso completo a todas las funcionalidades
- **Panel de administración**: Acceso completo
- **Menú lateral**: Acceso completo a todas las opciones

## Sistema de Autenticación

### Gestión de Sesiones
- **Cookies de sesión**: `vd_session` con ID del usuario
- **Duración**: 24 horas automática
- **Seguridad**: httpOnly, secure en producción
- **Persistencia**: Se mantiene entre recargas de página

### API de Autenticación
- **Endpoint**: `GET /api/auth/me`
- **Función**: Obtiene información del usuario actual
- **Seguridad**: Verifica cookies de sesión
- **Respuesta**: Usuario completo sin contraseña

### Hook useCurrentUser
- **Función**: Gestiona el estado del usuario actual
- **Carga automática**: Al montar el componente
- **Actualización**: Función `refrescarUsuario()` disponible
- **Estados**: loading, usuario, permisos calculados

## Control de Acceso por Rol

### Opciones de Navegación Disponibles

| Opción | Clientes | Administradores |
|--------|----------|-----------------|
| Constructor de Sitios | ⚠️ (Solo si no tienen página) | ✅ |
| Mi Tienda | ✅ | ✅ |
| Analítica | ✅ | ✅ |
| Ajustes | ✅ | ✅ |
| Usuarios | ❌ | ✅ |
| Centro de Ayuda | ✅ | ✅ |

### Lógica de Filtrado
- **Hook `useCurrentUser`**: Determina las opciones disponibles según el rol
- **API `/api/auth/me`**: Obtiene la información del usuario actual desde las cookies
- **Componente `PortalShell`**: Filtra dinámicamente las opciones del menú
- **Estado de carga**: Muestra skeleton mientras se determina el rol
- **Persistencia**: Las restricciones se aplican en cada carga de página
- **Actualización dinámica**: La información se refresca automáticamente después de cambios

## Próximas Mejoras

- [ ] Integración con base de datos real
- [ ] Verificación de email por correo
- [ ] Recuperación de contraseña
- [ ] Roles y permisos avanzados
- [ ] Logs de auditoría
- [ ] Rate limiting
- [ ] Autenticación de dos factores
- [ ] Validación de documentos oficiales (CC, CE, etc.)
- [ ] Formato de teléfono internacional
- [ ] Verificación de teléfono por SMS
