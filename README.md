# TaskCampus

TaskCampus es una aplicación web académica para organizar tareas, fechas de entrega, prioridades y avances por estudiante. Incluye autenticación, un dashboard personal y gestión completa de tareas con persistencia local en SQLite.

## Funcionalidades principales

- Registro e inicio de sesión con JWT.
- Rutas privadas y restauración de sesión.
- Creación, consulta, búsqueda, filtrado, edición, cambio de estado y eliminación de tareas.
- Dashboard con estadísticas y próximas entregas calculadas desde datos reales.
- Separación estricta de tareas por usuario.
- Light/Dark Mode persistente.
- Estados Loading, Empty, Error y Success.
- Interfaz responsive y accesible para móvil, tablet y escritorio.

## Capturas

Esta sección queda preparada para agregar capturas reales de Login, Dashboard y Tareas antes de la presentación. No se referencian imágenes que aún no existan en el repositorio.

## Stack tecnológico

| Área | Tecnologías |
| --- | --- |
| Frontend | React, Vite, React Router, Axios, CSS, Context API |
| Backend | Node.js, Express, JavaScript con módulos ES |
| Datos | SQLite con better-sqlite3 |
| Seguridad y validación | JWT, bcryptjs, express-validator |

## Requisitos previos

- Node.js 22 o una versión compatible.
- npm.
- Git.

## Instalación

Clona el repositorio y entra al proyecto:

```bash
git clone https://github.com/lorenzoquiche/taskcampus.git
cd taskcampus
```

Instala las dependencias de la raíz, el frontend y el backend:

```bash
npm install
npm install --prefix client
npm install --prefix server
```

### Variables de entorno

En Git Bash, macOS o Linux:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

En PowerShell:

```powershell
Copy-Item server/.env.example server/.env
Copy-Item client/.env.example client/.env
```

Configura los archivos locales sin publicarlos:

| Variable | Ubicación | Descripción |
| --- | --- | --- |
| `PORT` | `server/.env` | Puerto del backend; el ejemplo utiliza `3000`. |
| `CLIENT_URL` | `server/.env` | Origen autorizado por CORS; normalmente `http://localhost:5173`. |
| `JWT_SECRET` | `server/.env` | Secreto largo, aleatorio y privado para firmar tokens. Debe reemplazarse el texto del ejemplo. |
| `VITE_API_URL` | `client/.env` | URL base de la API; normalmente `http://localhost:3000/api`. |

Los archivos `.env` nunca deben subirse al repositorio.

## Ejecución

Desde la raíz, inicia frontend y backend simultáneamente:

```bash
npm run dev
```

Los scripts disponibles también permiten iniciar cada aplicación por separado:

```bash
npm run dev:client
npm run dev:server
```

- Frontend: http://localhost:5173
- API: http://localhost:3000/api
- Estado de la API: http://localhost:3000/api/health

SQLite se guarda en `server/data/taskcampus.db`. El directorio, la base, las tablas `users` y `tasks`, sus restricciones e índices se crean automáticamente al iniciar el backend.

## Rutas del frontend

| Ruta | Acceso | Pantalla |
| --- | --- | --- |
| `/login` | Pública | Inicio de sesión |
| `/register` | Pública | Registro |
| `/dashboard` | Protegida | Resumen y próximas entregas |
| `/tasks` | Protegida | Listado, búsqueda, filtros y acciones |
| `/tasks/new` | Protegida | Nueva tarea |
| `/tasks/:id/edit` | Protegida | Edición de una tarea real |
| Cualquier otra ruta | Pública | Página 404 |

## API

Todas las respuestas de error usan un mensaje comprensible y un arreglo `errors`.

### Autenticación

| Método | Endpoint | Descripción |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Registra un usuario y entrega un JWT. |
| `POST` | `/api/auth/login` | Valida credenciales y entrega un JWT. |
| `GET` | `/api/auth/me` | Devuelve el usuario autenticado; requiere Bearer token. |

### Tareas

Todos los endpoints requieren `Authorization: Bearer <token>`.

| Método | Endpoint | Descripción |
| --- | --- | --- |
| `GET` | `/api/tasks` | Lista las tareas propias. Admite `search`, `status` y `priority`. |
| `GET` | `/api/tasks/:id` | Consulta una tarea propia. |
| `POST` | `/api/tasks` | Crea una tarea para el usuario autenticado. |
| `PUT` | `/api/tasks/:id` | Actualiza una tarea propia. |
| `DELETE` | `/api/tasks/:id` | Elimina una tarea propia. |

El listado se ordena por fecha de entrega ascendente y fecha de creación descendente.

## Validaciones de tareas

- `title`: obligatorio, entre 3 y 100 caracteres.
- `course`: obligatorio, entre 2 y 80 caracteres.
- `description`: opcional, máximo 500 caracteres.
- `due_date`: fecha válida con formato `YYYY-MM-DD`.
- `priority`: `low`, `medium` o `high`.
- `status`: `pending`, `in_progress` o `completed`.
- Los identificadores de ruta deben ser enteros positivos.
- Los textos se recortan antes de guardarse.

## Seguridad

- Las contraseñas se protegen con bcryptjs y no se devuelven en la API.
- Los JWT expiran después de ocho horas y utilizan el ID del usuario como identificador.
- El middleware Bearer protege las rutas privadas.
- El backend obtiene el propietario desde el JWT y nunca confía en un `user_id` enviado por el cliente.
- Consultar, editar o eliminar una tarea ajena responde 404 sin revelar su existencia.
- CORS limita el origen al valor de `CLIENT_URL`.

## Experiencia de usuario

El tema claro u oscuro se aplica mediante `data-theme` y se conserva en `localStorage`. Si todavía no hay una selección, se utiliza la preferencia del sistema.

Las consultas y operaciones muestran estados Loading, Empty, Error y Success mediante componentes reutilizables. El layout adapta sidebar, tarjetas, filtros y formularios aproximadamente a 375 px, 768 px y 1280 px o más, conservando focus visible y navegación por teclado.

El prototipo que guía la implementación React está documentado en [`docs/prototype/README.md`](docs/prototype/README.md).

## Estructura principal

```text
taskcampus/
├── client/
│   └── src/
│       ├── api/          # Axios y servicio de tareas
│       ├── auth/         # Contexto y protección de rutas
│       ├── components/   # Componentes visuales reutilizables
│       ├── pages/        # Pantallas de autenticación, dashboard y tareas
│       └── theme/        # Contexto Light/Dark Mode
├── server/
│   └── src/
│       ├── controllers/  # Lógica de autenticación y tareas
│       ├── database/     # Conexión e inicialización SQLite
│       ├── middleware/   # JWT, validación y errores
│       ├── routes/       # Endpoints Express
│       └── validators/   # Reglas de entrada
├── docs/prototype/       # Guía UX/UI
└── package.json          # Ejecución conjunta con concurrently
```

## Prueba manual básica

1. Abre `/register`, crea una cuenta válida y confirma la redirección al dashboard.
2. Cierra sesión y entra nuevamente desde `/login`.
3. Selecciona **Nueva tarea**, completa los campos y guarda.
4. Comprueba la tarea en `/tasks` y utiliza búsqueda y filtros.
5. Selecciona **Editar**, modifica sus campos y guarda.
6. Usa **Completar** para cambiar su estado.
7. Usa **Eliminar** y confirma la operación.
8. Cierra sesión desde la navegación y confirma que las rutas privadas redirigen al login.

## Cumplimiento de los 15 requisitos

| # | Requisito | Estado | Evidencia real |
| --- | --- | --- | --- |
| 1 | Repositorio actualizado | Cumple | Las ramas de autenticación, UI y CRUD están integradas en el historial local mediante los Pull Requests 1, 2 y 3. |
| 2 | Frontend React ejecutándose | Cumple | `client/` utiliza React 19 y Vite; `npm run build` genera el bundle correctamente. |
| 3 | Diseño basado en prototipo UX/UI | Cumple | `docs/prototype/README.md` define paleta, espaciado, responsive, estados y wireframes que utiliza el CSS. |
| 4 | Componentes reutilizables | Cumple | `AppLayout`, `Sidebar`, `Button`, `Alert`, `TaskForm`, `EmptyState`, `StatCard` y otros componentes compartidos. |
| 5 | Mínimo cinco pantallas | Cumple | Login, Registro, Dashboard, Tareas, Nueva tarea, Editar tarea y 404. |
| 6 | Routing | Cumple | React Router define rutas públicas, privadas, dinámicas y fallback 404. |
| 7 | Consumo real del backend | Cumple | Axios consume autenticación y `/api/tasks`; no se utilizan servicios falsos. |
| 8 | CRUD desde interfaz | Cumple | La interfaz crea, lista, consulta para edición, actualiza, completa y elimina tareas. |
| 9 | Login y JWT | Cumple | Registro, login, persistencia del token, restauración de sesión, logout y middleware Bearer. |
| 10 | Validaciones | Cumple | express-validator valida usuarios, tareas, filtros e IDs; los formularios muestran validaciones y errores. |
| 11 | Dark Mode persistente | Cumple | `ThemeProvider` utiliza `localStorage`, preferencia del sistema y `data-theme`. |
| 12 | Responsive Design | Cumple | CSS adapta navegación, estadísticas, tarjetas, filtros y formularios a móvil, tablet y escritorio. |
| 13 | Estados Loading, Empty, Error y Success | Cumple | Componentes `LoadingSpinner`, `EmptyState` y `Alert`, más estados de guardado y procesamiento. |
| 14 | README con instalación y ejecución | Cumple | Este documento describe requisitos, entorno, instalación, scripts y URLs reales. |
| 15 | Evidencia de commits de integrantes actuales | Cumple | El historial contiene commits de Lorenzo Quiche y de Lukas (`LUKAS`/GitHub `Zaluk28`). |

## Integrantes y aportes

- **Lorenzo Quiche:** estructura inicial, autenticación JWT, integración, CRUD de tareas y documentación final.
- **Lukas — GitHub [`Zaluk28`](https://github.com/Zaluk28):** prototipo UX/UI, componentes reutilizables, dashboard, diseño responsive y Dark Mode.

## Evidencia

- [Repositorio](https://github.com/lorenzoquiche/taskcampus)
- [Commits de `main`](https://github.com/lorenzoquiche/taskcampus/commits/main)
- [Contributors](https://github.com/lorenzoquiche/taskcampus/graphs/contributors)
- [Pull Requests](https://github.com/lorenzoquiche/taskcampus/pulls?q=is%3Apr)

## Uso académico

TaskCampus es un proyecto académico desarrollado para fines educativos. No se declara una licencia de distribución adicional.
