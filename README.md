# StreetFood - Sistema de Gesti�n de Restaurante

Aplicaci�n web front-end para la gesti�n completa de un restaurante. Construida con HTML, CSS y JavaScript puro, sin dependencias externas ni backend.

## Funcionalidades

### 1. Autenticaci�n de Usuarios
- Registro e inicio de sesi�n con tres roles:
  - **Administrador**: acceso completo a todas las funcionalidades
  - **Mesero**: gesti�n de pedidos y reservas
  - **Cliente**: visualizaci�n de men�, pedidos y reservas propias
- Sesiones persistentes en localStorage

### 2. Men� Digital con CRUD
- Visualizaci�n de platos en tarjetas con imagen, descripci�n y precio
- 12 platos de ejemplo organizados en 4 categor�as (Entradas, Platos Fuertes, Bebidas, Postres)
- Filtro por categor�a y b�squeda en tiempo real
- Panel de administraci�n para crear, editar y eliminar platos y categor�as

### 3. Pedidos en Tiempo Real
- Carrito de compras con cantidades editables (+/-), eliminaci�n de �tems y total din�mico
- Confirmaci�n de pedidos con nombre de cliente y n�mero de mesa
- Flujo de estados: Pendiente � Preparando � Listo � Entregado
- Filtro de pedidos por estado
- Botones de acci�n para avanzar el estado del pedido (meseros y administradores)

### 4. Reservas por Fecha y Hora
- Formulario de reserva con nombre, fecha, hora y n�mero de personas
- Listado de reservas ordenadas por fecha
- Cancelaci�n de reservas
- Clientes ven solo sus propias reservas

### 5. Cierre de Caja y Reportes
- Estad�sticas del d�a: ventas totales, pedidos, platos vendidos, ticket promedio
- Estado de caja (abierta/cerrada) con bot�n para abrir y cerrar
- Bloqueo de pedidos cuando la caja est� cerrada
- Tabla detallada de pedidos del d�a
- Resumen al cerrar caja

## Tecnolog�as

- **HTML5** - Estructura sem�ntica
- **CSS3** - Dise�o responsivo con tema oscuro, animaciones y grid
- **JavaScript ES6** - L�gica completa del frontend
- **localStorage** - Persistencia de datos en el navegador
- **Font Awesome 6** - Iconograf�a
- **Google Fonts (Poppins)** - Tipograf�a

Sin frameworks, sin backend, sin dependencias npm.

## C�mo usar

1. Abre `index.html` en cualquier navegador moderno
2. Inicia sesi�n con uno de los usuarios de prueba o reg�strate

### Usuarios de prueba

| Rol    | Correo                 | Contrase�a |
|--------|------------------------|------------|
| Admin  | admin@streetfood.com   | admin123   |
| Mesero | mesero@streetfood.com  | mesero123  |
| Cliente| cliente@streetfood.com | cliente123 |

## Estructura del proyecto

```
TallerRestaurante/
+-- index.html              # Punto de entrada (SPA)
+-- css/
|   +-- styles.css          # Estilos y dise�o responsivo
+-- js/
|   +-- script.js           # L�gica de la aplicaci�n
+-- README.md               # Documentaci�n
+-- CHANGELOG.md             # Historial de versiones
+-- .gitignore              # Archivos ignorados por git
```

## Roles y permisos

| Acci�n                     | Admin | Mesero | Cliente |
|----------------------------|-------|--------|---------|
| Ver men�                   | Si    | Si     | Si      |
| Filtrar/buscar platos      | Si    | Si     | Si      |
| Tomar pedidos              | Si    | Si     | No      |
| Ver todos los pedidos      | Si    | Propios| Propios |
| Avanzar estado de pedido   | Si    | Si     | No      |
| Crear reservas             | Si    | Si     | Si      |
| Ver reservas               | Si    | Si     | Propias |
| CRUD platos/categor�as     | Si    | No     | No      |
| Reportes y cierre de caja  | Si    | No     | No      |

## Licencia

Proyecto educativo - Taller de Desarrollo Web.
