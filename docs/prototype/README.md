# Prototipo visual de TaskCampus

Este prototipo define la guía visual y de interacción para la implementación React de TaskCampus. Busca una experiencia académica moderna, clara y profesional, centrada en lectura rápida, organización y accesibilidad.

## Fundamentos

- Paleta clara: fondo `#F5F7FB`, superficie `#FFFFFF`, texto `#172033`, texto secundario `#667085`, borde `#DFE4EE`.
- Paleta oscura: fondo `#0F1420`, superficie `#171E2C`, texto `#F1F5F9`, texto secundario `#AAB4C5`, borde `#30394C`.
- Acciones: índigo `#4F46E5`, turquesa `#0D9488`, éxito `#15803D`, advertencia `#B45309`, error `#B42318`.
- Tipografía: pila del sistema (`Inter`, `system-ui`, `Segoe UI`, sans-serif), con jerarquía compacta y legible.
- Espaciado: escala de 4, 8, 12, 16, 24, 32 y 48 px.
- Radios: 8, 14 y 20 px. Sombras suaves, reservadas para tarjetas y capas móviles.

## Componentes reutilizables

`AppLayout`, `Sidebar`, `Header`, `ThemeToggle`, `PageHeader`, `StatCard`, `Button`, `Alert`, `LoadingSpinner`, `EmptyState`, `AuthLayout` y `FormField`. Cada componente resuelve una responsabilidad y utiliza las variables del sistema visual.

## Responsive y accesibilidad

- Móvil (~375 px): navegación en panel lateral desplegable, tarjetas en una columna, acciones a ancho completo y objetivos táctiles mínimos de 44 px.
- Tablet (~768 px): panel móvil y estadísticas en dos columnas.
- Escritorio (≥1280 px): sidebar persistente, contenido centrado y cuatro estadísticas por fila.
- Focus visible, etiquetas permanentes, HTML semántico, contraste suficiente y reducción de movimiento mediante `prefers-reduced-motion`.

## Dark Mode

Los temas usan `data-theme="light"` y `data-theme="dark"` en el elemento raíz. La preferencia se guarda localmente; si no existe, se adopta la preferencia del sistema.

## Estados

- Loading: indicador compacto con texto que comunica la operación.
- Empty: icono, título, explicación y acción siguiente opcional.
- Error: alerta accesible con lenguaje comprensible y color semántico.
- Success: confirmación con verde semántico, preparada para mensajes posteriores del CRUD.

## Wireframes textuales

### Login

Marca y selector de tema arriba; título y explicación; correo y contraseña; error accesible; acción principal; enlace a registro. En escritorio se acompaña con un panel de identidad visual.

### Registro

Misma estructura del login para mantener consistencia; nombre, correo y contraseña con requisitos visibles; acción principal y enlace de regreso.

### Dashboard

Sidebar y encabezado; saludo personalizado; botón “Nueva tarea”; fila adaptable de Total, Pendientes, En progreso y Completadas; tarjeta amplia de próximas entregas con estado vacío hasta integrar datos reales.

### Lista de tareas

Dentro de `AppLayout`: encabezado con título, filtros futuros y acción para crear. El contenido será tabla o tarjetas adaptables con estados loading, empty y error. Johan implementará los datos y acciones.

### Nueva tarea

Dentro de `AppLayout`: encabezado de contexto y formulario en una superficie centrada, con acciones Guardar y Cancelar. No se define todavía lógica CRUD.

### Editar tarea

Comparte el formulario de nueva tarea, precargado por el futuro servicio. Debe distinguir claramente el modo edición y conservar navegación de regreso.

Este documento es la referencia del prototipo y guía directamente la implementación React actual y sus futuras extensiones.
