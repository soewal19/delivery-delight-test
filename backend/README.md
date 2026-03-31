# Food Delivery Backend

## Accomplished Level: Advanced (Base + Middle + Advanced)

## Stack
- **Runtime:** Node.js 20
- **Framework:** NestJS
- **ORM:** Prisma
- **Database:** SQLite
- **Docs:** Swagger (OpenAPI)

## C4 Architecture

### Context Diagram
```
[User] --> [Food Delivery App (React SPA)]
[Food Delivery App] --> [Food Delivery API (NestJS)]
[Food Delivery API] --> [SQLite Database]
```

### Container Diagram
```
┌─────────────────────────────────────────────┐
│              Food Delivery System            │
│                                              │
│  ┌──────────┐    ┌──────────┐  ┌──────────┐ │
│  │  React   │───>│  NestJS  │──│  SQLite  │ │
│  │  SPA     │    │  API     │  │  DB      │ │
│  │ :80      │    │ :3000    │  │          │ │
│  └──────────┘    └──────────┘  └──────────┘ │
└─────────────────────────────────────────────┘
```

### Component Diagram (API)
```
┌────────────────────────────────────────┐
│            NestJS API                  │
│                                        │
│  ┌────────────┐  ┌──────────────────┐  │
│  │ ShopsModule│  │ ProductsModule   │  │
│  └────────────┘  └──────────────────┘  │
│  ┌────────────┐  ┌──────────────────┐  │
│  │OrdersModule│  │ CouponsModule    │  │
│  └────────────┘  └──────────────────┘  │
│  ┌────────────────────────────────────┐│
│  │        PrismaModule (Global)      ││
│  └────────────────────────────────────┘│
└────────────────────────────────────────┘
```

## Quick Start

```bash
npm install
npx prisma migrate dev --name init
npm run prisma:seed
npm run start:dev
```

Swagger: http://localhost:3000/api/docs

## Docker

```bash
docker-compose up -d --build
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/shops | List shops (filter by rating) |
| GET | /api/shops/:id | Shop details with products |
| GET | /api/products | Products (paginated, filtered, sorted) |
| GET | /api/products/:id | Product details |
| POST | /api/orders | Create order |
| GET | /api/orders | Find orders by email/phone |
| GET | /api/orders/:id | Order details |
| GET | /api/coupons | List active coupons |
| GET | /api/coupons/:code/validate | Validate coupon |

## CI/CD

GitHub Actions pipeline in `.github/workflows/ci.yml` — builds and tests on push/PR to main.
