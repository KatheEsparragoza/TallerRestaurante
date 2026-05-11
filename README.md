# StreetFood - Sistema de Gestión de Restaurante 

Aplicación web front-end para la gestión completa de un restaurante. Construida con HTML, CSS y JavaScript puro, sin dependencias externas ni backend.

## Funcionalidades

### 1. Autenticación de Usuarios
- Registro e inicio de sesión con tres roles:
  - **Administrador**: acceso completo a todas las funcionalidades
  - **Mesero**: gestión de pedidos y reservas
  - **Cliente**: visualización de menú, pedidos y reservas propias
- Sesiones persistentes en localStorage

### 2. Menú Digital con CRUD
- Visualización de platos en tarjetas con imagen, descripción y precio
- 12 platos de ejemplo organizados en 4 categorías (Entradas, Platos Fuertes, Bebidas, Postres)
- Filtro por categoría y búsqueda en tiempo real
- Panel de administración para crear, editar y eliminar platos y categorías

### 3. Pedidos en Tiempo Real
- Carrito de compras con cantidades editables (+/-), eliminación de ítems y total dinámico
- Confirmación de pedidos con nombre de cliente y número de mesa
- Flujo de estados: Pendiente | Preparando | Listo | Entregado
- Filtro de pedidos por estado
- Botones de acción para avanzar el estado del pedido (meseros y administradores)

### 4. Reservas por Fecha y Hora
- Formulario de reserva con nombre, fecha, hora y número de personas
- Listado de reservas ordenadas por fecha
- Cancelación de reservas
- Clientes ven solo sus propias reservas

### 5. Cierre de Caja y Reportes
- Estadísticas del día: ventas totales, pedidos, platos vendidos, ticket promedio
- Estado de caja (abierta/cerrada) con botón para abrir y cerrar
- Bloqueo de pedidos cuando la caja está cerrada
- Tabla detallada de pedidos del día
- Resumen al cerrar caja

## Tecnologías

- **HTML5** - Estructura semántica
- **CSS3** - Diseño responsivo con tema oscuro, animaciones y grid
- **JavaScript ES6** - Lógica completa del frontend
- **localStorage** - Persistencia de datos en el navegador
- **Font Awesome 6** - Iconografía
- **Google Fonts (Poppins)** - Tipografía

Sin frameworks, sin backend, sin dependencias npm.

## Cómo usar

1. Abre `index.html` en cualquier navegador moderno
2. Inicia sesión con uno de los usuarios de prueba o registrate

### Usuarios de prueba

| Rol    | Correo                 | Contraseña |
|--------|------------------------|------------|
| Admin  | admin@streetfood.com   | admin123   |
| Mesero | mesero@streetfood.com  | mesero123  |
| Cliente| cliente@streetfood.com | cliente123 |

## Estructura del proyecto

```
TallerRestaurante/
+-- index.html              # Punto de entrada (SPA)
+-- css/
|   +-- styles.css          # Estilos y diseño responsivo
+-- js/
|   +-- script.js           # Lógica de la aplicación
+-- README.md               # Documentación
+-- CHANGELOG.md             # Historial de versiones
+-- .gitignore              # Archivos ignorados por git
```

## Roles y permisos

| Acción                      | Admin | Mesero | Cliente |
|-----------------------------|-------|--------|---------|
| Ver menú                    | Si    | Si     | Si      |
| Filtrar/buscar platos       | Si    | Si     | Si      |
| Tomar pedidos               | Si    | Si     | No      |
| Ver todos los pedidos       | Si    | Propios| Propios |
| Avanzar estado de pedido    | Si    | Si     | No      |
| Crear reservas              | Si    | Si     | Si      |
| Ver reservas                | Si    | Si     | Propias |
| CRUD platos/categorías      | Si    | No     | No      |
| Reportes y cierre de caja   | Si    | No     | No      |

## Licencia

Proyecto educativo - Taller de Desarrollo Web.
