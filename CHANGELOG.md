# Changelog

## [2.0.0] - 2026-05-10
### Añadido
- Módulo de autenticación con 3 roles: administrador, mesero, cliente
- CRUD de platos y categorías desde panel de administración
- Flujo de estados de pedidos: pendiente → preparando → listo → entregado
- Filtro de pedidos por estado y por rol (cliente ve solo los suyos)
- Módulo de reservas con fecha, hora y número de personas
- Reportes de ventas del día con estadísticas (total, pedidos, platos, ticket promedio)
- Cierre y apertura de caja con bloqueo de pedidos cuando está cerrada
- Auto-completado del nombre del cliente en reservas
- Archivos organizados en carpetas css/ y js/
- README.md completo con documentación, usuarios demo y tabla de roles
- LICENSE.txt (MIT)
- .gitignore

### Cambiado
- Refactorización completa del frontend a ~800 líneas de JavaScript
- Diseño responsivo mejorado (tablet y móvil)
- Sidebar dinámico según el rol del usuario

## [1.2.0] - 2026-05-10
- Se añadieron nuevas vistas para pedidos, reserva y reportes en la plataforma web
- Ajustes en colores de botones, fondos y elementos interactivos.

## [1.1.0] - 2026-05-10
- Actualización de la paleta visual para mejorar la experiencia de usuario.

## [1.0.0] - 2026-05-10
- Se agrega la estructura base del proyecto Restaurante virtual streetFood
