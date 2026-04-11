# Next Test App

## RU

Веб-приложение для управления приходами и товарами. Проект собран на `Next.js` с `Redux Toolkit` на клиенте и небольшим `Node.js + Express` backend для REST API, загрузки изображений, JWT и realtime-счётчика активных вкладок через `Socket.io`.

### Что есть в проекте

- экран `Orders` со списком приходов
- раскрытие выбранного прихода с деталями и товарами
- удаление приходов и товаров через модальные окна
- экран `Products` со списком товаров и фильтром по типу
- экран `Groups` с графиком распределения товаров по типам
- экран `Settings` с формой пользователя, валидацией и загрузкой аватара
- экран `Users` с картой Киева
- глобальный поиск
- переключение языка `RU / EN`
- `JWT`-авторизация в тестовом формате
- `WebSocket`-счётчик активных вкладок
- `localStorage` для хранения части клиентского состояния
- unit tests через `Vitest`

### Стек

#### Frontend
- `Next.js 16`
- `React 19`
- `TypeScript`
- `Redux Toolkit`
- `Axios`
- `Recharts`

#### Backend
- `Node.js`
- `Express`
- `Socket.io`
- `Multer`
- `jsonwebtoken`

### Структура проекта

```txt
src/
  app/                  маршруты Next.js
  components/           переиспользуемые компоненты
  store/                Redux store и slice
  services/             axios instance и API-функции
  utils/                переводы и вспомогательные данные
  helpers/              helper-функции
  lib/                  утилиты и тесты
  types/                общие типы TypeScript
server/
  index.mjs             backend сервер
  data.mjs              тестовые данные
uploads/                загруженные изображения
public/                 статические файлы
database/
  schema.sql            схема базы данных для MySQL Workbench
```

### Установка

#### 1. Клонировать проект

```bash
git clone <repo-url>
cd next-test-app
```

#### 2. Установить зависимости

```bash
npm install
```

### Запуск проекта

#### Режим разработки

```bash
npm run dev
```

После запуска будут доступны:

- frontend: `http://localhost:3000`
- backend: `http://localhost:4000`

#### Отдельный запуск frontend

```bash
npm run dev:client
```

#### Отдельный запуск backend

```bash
npm run dev:server
```

### Production запуск

#### Сборка frontend

```bash
npm run build
```

#### Запуск production frontend

```bash
npm run start
```

#### Запуск backend

```bash
npm run start:server
```

### Тесты

```bash
npm run test
```

### Линтинг

```bash
npm run lint
```

### REST API

Основные backend routes:

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

### JWT

В проекте реализован упрощённый сценарий JWT:

- форма настроек отправляет `name` и `email` на backend
- backend создаёт токен через `jsonwebtoken`
- токен сохраняется на клиенте в `localStorage`
- `axios` использует токен в запросах через `Authorization`

### WebSocket

Счётчик активных вкладок реализован через `Socket.io`:

- при открытии новой вкладки счётчик увеличивается
- при закрытии вкладки уменьшается
- значение обновляется в реальном времени в `TopMenu`

### Web Storage

В проекте используется `localStorage` для:

- аватара пользователя
- языка интерфейса
- данных формы настроек
- JWT токена

### i18n

Реализовано простое переключение языка без сторонней библиотеки:

- языки: `ru`, `en`
- тексты хранятся в `src/utils/translations.ts`
- текущий язык хранится в Redux и `localStorage`

### Charts

На экране `Groups` реализован график на `Recharts`, который показывает количество товаров по типам.

### Maps

На экране `Users` добавлена встроенная карта Киева.

### Файл схемы БД

В проекте есть SQL-схема базы данных:

- `database/schema.sql`

Этот файл можно открыть в `MySQL Workbench` как SQL script.

### Примечание

Данные backend сейчас хранятся в памяти сервера и в тестовом файле `server/data.mjs`. Это значит:

- изменения сохраняются во время работы сервера
- после полного перезапуска backend данные могут вернуться к исходному состоянию

---

## EN

A web application for managing orders and products. The project is built with `Next.js` and `Redux Toolkit` on the client side, plus a lightweight `Node.js + Express` backend for REST API, image uploads, JWT, and a realtime active-tabs counter via `Socket.io`.

### Features

- `Orders` screen with a list of incoming orders
- expandable order details with related products
- deleting orders and products via modal dialogs
- `Products` screen with a product list and type filter
- `Groups` screen with a chart showing product distribution by type
- `Settings` screen with a user form, validation, and avatar upload
- `Users` screen with a Kyiv map
- global search
- language switcher `RU / EN`
- simplified `JWT` authentication flow
- `WebSocket` active browser tabs counter
- `localStorage` for client-side persistence
- unit tests with `Vitest`

### Stack

#### Frontend
- `Next.js 16`
- `React 19`
- `TypeScript`
- `Redux Toolkit`
- `Axios`
- `Recharts`

#### Backend
- `Node.js`
- `Express`
- `Socket.io`
- `Multer`
- `jsonwebtoken`

### Project structure

```txt
src/
  app/                  Next.js routes
  components/           reusable components
  store/                Redux store and slice
  services/             axios instance and API functions
  utils/                translations and utility data
  helpers/              helper functions
  lib/                  utility functions and tests
  types/                shared TypeScript types
server/
  index.mjs             backend server
  data.mjs              demo data
uploads/                uploaded images
public/                 static files
database/
  schema.sql            database schema for MySQL Workbench
```

### Installation

#### 1. Clone the repository

```bash
git clone <repo-url>
cd next-test-app
```

#### 2. Install dependencies

```bash
npm install
```

### Running the project

#### Development mode

```bash
npm run dev
```

After startup the project will be available at:

- frontend: `http://localhost:3000`
- backend: `http://localhost:4000`

#### Run frontend only

```bash
npm run dev:client
```

#### Run backend only

```bash
npm run dev:server
```

### Production mode

#### Build frontend

```bash
npm run build
```

#### Start production frontend

```bash
npm run start
```

#### Start backend

```bash
npm run start:server
```

### Tests

```bash
npm run test
```

### Linting

```bash
npm run lint
```

### REST API

Main backend routes:

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

### JWT

The project uses a simplified JWT flow:

- the settings form sends `name` and `email` to the backend
- the backend creates a token using `jsonwebtoken`
- the token is stored in client-side `localStorage`
- `axios` sends the token in the `Authorization` header

### WebSocket

The active browser tabs counter is implemented with `Socket.io`:

- opening a new tab increases the counter
- closing a tab decreases the counter
- the value updates in real time in `TopMenu`

### Web Storage

The project uses `localStorage` for:

- user avatar
- interface language
- settings form data
- JWT token

### i18n

A simple custom language switcher is implemented without an external i18n library:

- supported languages: `ru`, `en`
- translations are stored in `src/utils/translations.ts`
- the current language is stored in Redux and `localStorage`

### Charts

The `Groups` screen contains a `Recharts` chart showing product counts by type.

### Maps

The `Users` screen includes an embedded map centered on Kyiv.

### Database schema file

The project includes a SQL database schema file:

- `database/schema.sql`

This file can be opened in `MySQL Workbench` as an SQL script.

### Note

Backend data is currently stored in server memory and in the demo file `server/data.mjs`. This means:

- changes are preserved while the backend process is running
- after a full backend restart, data may return to the initial state

