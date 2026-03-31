# Деплой бэкенда на Render

## Преимущества Render для этого проекта:
- ✅ **Поддерживает WebSocket** — ваш AppGateway будет работать
- ✅ **Поддерживает SQLite** — не нужно менять БД
- ✅ **Бесплатный тир** — 750 часов/месяц
- ✅ **Авто-деплой** — при пуше в GitHub
- ✅ **SSL сертификат** — HTTPS включен

## Шаги по деплою:

### 1. Создайте аккаунт на Render
Перейдите на https://render.com и зарегистрируйтесь (можно через GitHub)

### 2. Создайте новый Web Service
1. Нажмите **"New +"** → **"Web Service"**
2. Выберите **"Build and deploy from a Git repository"**
3. Нажмите **"Next"**

### 3. Подключите GitHub репозиторий
1. Нажмите **"Connect GitHub"** (если еще не подключен)
2. Выберите репозиторий: `soewal19/delivery-delight`
3. Нажмите **"Connect"**

### 4. Настройте сервис
Заполните следующие поля:

| Поле | Значение |
|------|----------|
| **Name** | `delivery-delight-backend` |
| **Region** | Выберите ближайший к вам (например, Frankfurt) |
| **Branch** | `master` |
| **Root Directory** | `backend` |
| **Runtime** | `Node` |
| **Build Command** | `npm install && npx prisma generate && npx prisma migrate deploy` |
| **Start Command** | `npm run start:prod` |
| **Plan** | `Free` |

### 5. Добавьте переменные окружения
Нажмите **"Advanced"** и добавьте:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | `file:./dev.db` |
| `NODE_ENV` | `production` |
| `PORT` | `10000` |

### 6. Создайте сервис
Нажмите **"Create Web Service"**

Render начнет деплой. Это займет 2-5 минут.

## После деплоя:

### 1. Скопируйте URL бэкенда
После успешного деплоя вы получите URL вида:
```
https://delivery-delight-backend.onrender.com
```

### 2. Проверьте работу API
Откройте в браузере:
- API: `https://delivery-delight-backend.onrender.com/api/shops`
- Swagger: `https://delivery-delight-backend.onrender.com/api/docs`

### 3. Обновите фронтенд
Если фронтенд уже развернут, обновите переменную окружения:
- **Vercel:** `VITE_API_URL` = `https://delivery-delight-backend.onrender.com/api`
- **Render:** `VITE_API_URL` = `https://delivery-delight-backend.onrender.com/api`

## Автоматический деплой

Render автоматически деплоит при пуше в ветку `master`:
1. Сделайте изменения в коде
2. Закоммитьте: `git commit -m "your changes"`
3. Запушьте: `git push origin master`
4. Render автоматически обновит бэкенд

## Мониторинг

В панели Render вы можете:
- Смотреть логи в реальном времени
- Мониторить использование ресурсов
- Настроить алерты
- Перезапустить сервис вручную

## Проблемы и решения

### Проблема: Деплой не начинается
**Решение:** Проверьте что:
- Root Directory = `backend`
- Build Command правильный
- В репозитории есть папка `backend`

### Проблема: Ошибка "Cannot find module"
**Решение:** Убедитесь что Build Command включает `npm install`

### Проблема: Ошибка Prisma
**Решение:** Убедитесь что Build Command включает `npx prisma generate`

### Проблема: WebSocket не работает
**Решение:** 
- Проверьте что используете HTTPS (не HTTP)
- Проверьте CORS настройки в [`main.ts`](backend/src/main.ts)

## Итоговые URL:

- **Бэкенд (Render):** https://delivery-delight-backend.onrender.com
- **Swagger:** https://delivery-delight-backend.onrender.com/api/docs
- **Фронтенд:** (зависит от вашего деплоя)

## Полезные ссылки:

- [Render Documentation](https://docs.render.com)
- [Render Free Plan](https://render.com/docs/free)
- [Prisma on Render](https://docs.render.com/deploy-prisma)
