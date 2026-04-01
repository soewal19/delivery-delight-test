# Delivery Delight - Food Delivery App

## 🚀 Быстрый старт

### Локальная разработка

```bash
# Установите зависимости
npm install

# Запустите бэкенд
cd backend
npm install
npm run start:dev

# В новом терминале запустите фронтенд
cd frontend
npm install
npm run dev
```

Приложение будет доступно:
- **Фронтенд:** http://localhost:5173
- **Бэкенд:** http://localhost:3000
- **Swagger:** http://localhost:3000/api/docs

## 📦 Деплой

### Бэкенд на Render (рекомендуется)

**Почему Render?**
- ✅ Поддерживает WebSocket
- ✅ Поддерживает SQLite
- ✅ Бесплатный тир
- ✅ Авто-деплой из GitHub

**Инструкции:** Смотрите [RENDER_DEPLOY.md](RENDER_DEPLOY.md)

### Фронтенд на Vercel

**Инструкции:** Смотрите [GITHUB_SETUP.md](GITHUB_SETUP.md)

## 🌿 Ветки

### master (основная ветка)
- **База данных:** MongoDB Atlas
- **Деплой:** Render.com
- **Строка подключения:** `mongodb+srv://Admin2025:Pass321@cluster0.tavfxtx.mongodb.net/chates?retryWrites=true&w=majority&appName=Cluster`

### local (ветка для локальной разработки)
- **База данных:** SQLite
- **Деплой:** Локально
- **Строка подключения:** `file:./dev.db`

**Для локальной разработки переключитесь на ветку `local`:**
```bash
git checkout local
```

## 🏗️ Архитектура

### Бэкенд (NestJS)
- **Framework:** NestJS 10
- **Database:** SQLite (Prisma ORM)
- **WebSocket:** Socket.io
- **API Docs:** Swagger

### Фронтенд (React)
- **Framework:** React 18 + Vite
- **UI:** Tailwind CSS + shadcn/ui
- **State:** React Query
- **Router:** React Router 6

## 📁 Структура проекта

```
delivery-delight/
├── backend/                 # NestJS бэкенд
│   ├── src/
│   │   ├── coupons/        # Купоны
│   │   ├── events/         # WebSocket
│   │   ├── orders/         # Заказы
│   │   ├── products/       # Продукты
│   │   ├── shops/          # Магазины
│   │   └── users/          # Пользователи
│   ├── prisma/             # Схема БД
│   └── api/                # Vercel entry point
├── frontend/               # React фронтенд
│   ├── src/
│   │   ├── components/     # Компоненты
│   │   ├── pages/          # Страницы
│   │   └── api/            # API клиент
│   └── public/             # Статические файлы
└── docs/                   # Документация
```

## 🔧 Переменные окружения

### Бэкенд (master ветка - MongoDB)
```env
DATABASE_URL=mongodb+srv://Admin2025:Pass321@cluster0.tavfxtx.mongodb.net/chates?retryWrites=true&w=majority&appName=Cluster
NODE_ENV=production
PORT=10000
```

### Бэкенд (local ветка - SQLite)
```env
DATABASE_URL=file:./dev.db
NODE_ENV=production
PORT=10000
```

### Фронтенд
```env
VITE_API_URL=https://your-backend-url.com/api
```

## 📚 API Endpoints

### Магазины
- `GET /api/shops` - Все магазины
- `GET /api/shops/:id` - Магазин по ID

### Продукты
- `GET /api/products` - Все продукты
- `GET /api/products/:id` - Продукт по ID

### Заказы
- `POST /api/orders` - Создать заказ
- `GET /api/orders` - Все заказы
- `GET /api/orders/:id` - Заказ по ID

### Пользователи
- `GET /api/users/:email` - Пользователь по email
- `POST /api/users` - Создать/обновить пользователя
- `GET /api/users/:id/stats` - Статистика пользователя

### Купоны
- `GET /api/coupons` - Все купоны
- `GET /api/coupons/:code/validate` - Проверить купон

## 🛠️ Технологии

### Бэкенд
- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [Socket.io](https://socket.io/)
- [Swagger](https://swagger.io/)

### Фронтенд
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [React Query](https://tanstack.com/query)

## 📝 Лицензия

MIT
