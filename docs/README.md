# C4 Architecture Diagrams

This folder contains C4 architecture diagrams for the Delivery Delight project.

## Diagrams

### 1. Context Diagram (`c4-context.puml`)
The context diagram shows the system in its environment, including users and external systems.

**Key elements:**
- **Customer**: A customer who wants to order food from restaurants
- **Admin**: An administrator who manages the system
- **Delivery Delight**: The main system that allows customers to browse restaurants, view menus, add items to cart, and place orders
- **Payment Gateway**: External system that processes payments for orders
- **Email Service**: External system that sends order confirmations and notifications

### 2. Container Diagram (`c4-container.puml`)
The container diagram shows the high-level technical building blocks of the system.

**Key elements:**
- **Web Application**: React frontend application that provides the user interface
- **API Application**: NestJS backend application that provides REST API and handles business logic
- **Database**: SQLite database with Prisma ORM that stores all data

### 3. Component Diagram (`c4-component.puml`)
The component diagram shows the internal components of the API application.

**Key elements:**
- **Products Module**: Handles product-related operations
- **Shops Module**: Handles shop-related operations
- **Orders Module**: Handles order-related operations
- **Coupons Module**: Handles coupon-related operations
- **Prisma Module**: Provides database access through Prisma ORM

### 4. Code Diagram (`c4-code.puml`)
The code diagram shows the internal structure of the frontend application.

**Key elements:**
- **Pages**: React components for different pages (Index, Shops, ProductDetail, Cart, Orders, Coupons, Error, NotFound)
- **Components**: Reusable React components (Header, Footer, Layout, ProductCard, ShopCard, SearchBar, Filters, Preloader)
- **Store**: Zustand state management stores (cartStore, shopStore, viewedStore)
- **API**: HTTP client for API requests
- **Hooks**: Custom React hooks (useMobile, useToast)
- **Lib**: Utility functions
- **Types**: TypeScript type definitions

## How to View Diagrams

These diagrams are written in PlantUML format. You can view them using:

1. **PlantUML Online Server**: Upload the `.puml` files to [PlantUML Online Server](http://www.plantuml.com/plantuml)
2. **VS Code Extension**: Install the PlantUML extension for VS Code
3. **PlantUML CLI**: Install PlantUML locally and run `plantuml c4-context.puml`

## Diagram Relationships

- The **Context Diagram** provides the highest level view of the system
- The **Container Diagram** zooms into the Delivery Delight system from the context diagram
- The **Component Diagram** zooms into the API Application container
- The **Code Diagram** zooms into the Web Application container
