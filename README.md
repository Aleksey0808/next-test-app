# Next Test App

## RU

Приложение для управления приходами и товарами.  
Frontend построен на `Next.js + Redux Toolkit`, backend на `Node.js + Express + Socket.io`.

### Что есть в проекте

- экран `Orders` с деталями прихода
- экран `Products` с фильтрацией и удалением
- экран `Groups` с графиком на `Recharts`
- экран `Settings` с формой, валидацией, JWT и загрузкой аватара
- экран `Users` с картой
- глобальный поиск
- переключение языка `RU / EN`
- realtime-счётчик вкладок через `Socket.io`
- unit tests через `Vitest`

### Стек

- `Next.js 16`
- `React 19`
- `TypeScript`
- `Redux Toolkit`
- `Axios`
- `Express`
- `Socket.io`
- `Multer`
- `jsonwebtoken`
- `Recharts`

### Установка

```bash
npm install
```

### Локальный запуск

```bash
npm run dev
```

После запуска:

- frontend: `http://localhost:3000`
- backend: `http://localhost:4000`

### Полезные команды

```bash
npm run build
npm run start
npm run start:server
npm run test
npm run lint
```

### Docker

В проекте есть:

- `Dockerfile.frontend`
- `Dockerfile.backend`
- `docker-compose.yml`
- `.dockerignore`

### Deploy

Проект подготовлен для деплоя на `Render` как две отдельные `Web Service`:

- `frontend` из `Dockerfile.frontend`
- `backend` из `Dockerfile.backend`

-ссылка frontend: https://next-test-frontend-admin.onrender.com
-ссылка backend: https://next-test-backend-admin.onrender.com

Для frontend используются:

- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_SOCKET_URL`

Для backend используются:

- `PORT`
- `CLIENT_ORIGIN`
- `SERVER_PUBLIC_URL`
- `JWT_SECRET`

Пример env есть в `.env.example`.

### REST API

- `GET /api/orders`
- `GET /api/orders/:id`
- `GET /api/products`
- `GET /api/orders/:id/products`
- `DELETE /api/orders/:id`
- `DELETE /api/products/:id`
- `POST /api/upload/avatar`
- `POST /api/auth/login`
- `GET /api/sessions`
- `GET /api/health`

### База данных

Файл схемы БД для `MySQL Workbench`:

- `database/schema.sql`

### Важно

- backend хранит данные в памяти, поэтому после полного перезапуска сервера данные могут сброситься
- на `Render Free` загруженные файлы не хранятся постоянно между redeploy/restart

---

## EN

Inventory management app built with `Next.js + Redux Toolkit` on the frontend and `Node.js + Express + Socket.io` on the backend.

### Features

- `Orders` page with order details
- `Products` page with filtering and deletion
- `Groups` page with a `Recharts` chart
- `Settings` page with form validation, JWT, and avatar upload
- `Users` page with a map
- global search
- `RU / EN` language switcher
- realtime active tabs counter via `Socket.io`
- unit tests with `Vitest`

### Stack

- `Next.js 16`
- `React 19`
- `TypeScript`
- `Redux Toolkit`
- `Axios`
- `Express`
- `Socket.io`
- `Multer`
- `jsonwebtoken`
- `Recharts`

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

After startup:

- frontend: `http://localhost:3000`
- backend: `http://localhost:4000`

### Useful commands

```bash
npm run build
npm run start
npm run start:server
npm run test
npm run lint
```

### Docker

The project includes:

- `Dockerfile.frontend`
- `Dockerfile.backend`
- `docker-compose.yml`
- `.dockerignore`

### Deploy

The app is prepared for deployment on `Render` as two separate `Web Services`:

- `frontend` from `Dockerfile.frontend`
- `backend` from `Dockerfile.backend`

-link frontend: https://next-test-frontend-admin.onrender.com
-link backend: https://next-test-backend-admin.onrender.com

Frontend env vars:

- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_SOCKET_URL`

Backend env vars:

- `PORT`
- `CLIENT_ORIGIN`
- `SERVER_PUBLIC_URL`
- `JWT_SECRET`

See `.env.example` for an example.

### REST API

- `GET /api/orders`
- `GET /api/orders/:id`
- `GET /api/products`
- `GET /api/orders/:id/products`
- `DELETE /api/orders/:id`
- `DELETE /api/products/:id`
- `POST /api/upload/avatar`
- `POST /api/auth/login`
- `GET /api/sessions`
- `GET /api/health`

### Database schema

MySQL Workbench schema file:

- `database/schema.sql`

### Notes

- backend data is stored in memory, so a full server restart resets it
- on `Render Free`, uploaded files are not persistent across redeploys/restarts
