# Delivery Delight 🍔🍕🥤

Современное веб-приложение для доставки еды, построенное на стеке **React + NestJS + MongoDB**.

## Особенности
- 🛍️ Просмотр магазинов и фильтрация по рейтингу.
- 📦 Просмотр товаров с пагинацией, сортировкой и категориями.
- 🛒 Удобная корзина с сохранением в LocalStorage.
- 🎫 Система купонов на скидку.
- 📝 История заказов с возможностью повторного заказа.
- 📱 Полностью адаптивный интерфейс (Mobile First).
- 🚀 Подготовлено для деплоя на **Vercel** с использованием **Serverless Functions**.

## Технологический стек

### Frontend
- **React 18** + **Vite**
- **TypeScript**
- **Zustand** (Управление состоянием)
- **TanStack Query** (Кеширование и запросы)
- **Tailwind CSS** + **Shadcn/UI** (Стили и компоненты)
- **Framer Motion** (Анимации)

### Backend
- **NestJS** (Node.js framework)
- **Prisma ORM** (Работа с базой данных)
- **MongoDB** (База данных)
- **Swagger** (Документация API)
- **Class Validator** (Валидация входящих данных)

## Структура проекта
- `/src` — Исходный код фронтенда (Vite + React).
- `/backend` — Исходный код бэкенда (NestJS).
- `/backend/prisma` — Схема базы данных Prisma.
- `/backend/api` — Точка входа для Vercel Serverless Functions.

## Быстрый старт

### Требования
- Node.js 20+
- MongoDB (локально или MongoDB Atlas)

### Настройка бэкенда
1. Перейдите в папку `backend`:
   ```bash
   cd backend
   ```
2. Установите зависимости:
   ```bash
   npm install
   ```
3. Создайте файл `.env` и добавьте строку подключения к MongoDB:
   ```env
   DATABASE_URL="mongodb+srv://user:pass@cluster.mongodb.net/delivery?retryWrites=true&w=majority"
   ```
4. Сгенерируйте клиент Prisma:
   ```bash
   npx prisma generate
   ```
5. Запустите сидирование базы данных:
   ```bash
   npm run prisma:seed
   ```
6. Запустите бэкенд:
   ```bash
   npm run start:dev
   ```

### Настройка фронтенда
1. В корневой папке установите зависимости:
   ```bash
   npm install
   ```
2. Создайте файл `.env` (необязательно, по умолчанию используется `http://localhost:3000/api`):
   ```env
   VITE_API_URL="http://localhost:3000/api"
   ```
3. Запустите фронтенд:
   ```bash
   npm run dev
   ```

## Деплой на Vercel
Проект полностью настроен для деплоя на Vercel через одну команду или интеграцию с GitHub.
Файл `vercel.json` в корне проекта управляет маршрутизацией и сборкой обоих частей приложения.
