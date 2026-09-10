# TaskCampus

TaskCampus es una aplicación web para gestionar tareas académicas en un solo lugar.

## Stack tecnológico

- Frontend: React, Vite y JavaScript
- Backend: Node.js, Express y JavaScript

## Estructura

- `client/`: aplicación frontend.
- `server/`: API backend.

## Requisitos previos

- Node.js
- npm

## Instalación

Desde la raíz del proyecto, instala las dependencias de cada aplicación:

```bash
npm install
npm install --prefix client
npm install --prefix server
```

Copia los archivos de variables de entorno de ejemplo y ajusta sus valores si es necesario:

```bash
cp client/.env.example client/.env
cp server/.env.example server/.env
```

## Ejecución

Inicia frontend y backend simultáneamente desde la raíz:

```bash
npm run dev
```

También puedes iniciarlos por separado con `npm run dev:client` y `npm run dev:server`.

- Frontend: http://localhost:5173
- API: http://localhost:3000/api
- Estado de la API: http://localhost:3000/api/health

## Integrantes

- Lorenzo
- Lukas
- Johan
