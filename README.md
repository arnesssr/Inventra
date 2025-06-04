# Inventra Frontend (PMS)

Product Management System for Inventra

## Documentation

- [Architecture](./docs/architecture.md)
- [Setup Guide](./docs/setup.md)
- [Todo List](./docs/todo.md)

## Immediate Changes Required

### PMS (Frontend)

1. ProductService Updates
```typescript
// src/services/productService.ts
- Add createProduct
- Add updateProduct
- Add publishProduct
- Add uploadImage
```

2. ProductStore Updates
```typescript
// src/store/productStore.ts
- Add optimistic updates
- Add publish state
- Add rollback functionality
```

3. Form Updates
```typescript
// src/pages/products/ProductForm.tsx
- Add image upload
- Add publish button
- Add validation
```

### Backend

1. Complete API Implementation
```typescript
// Already created:
- POST /api/pms/products
- PUT /api/pms/products/:id
- POST /api/pms/products/:id/publish
- POST /api/pms/products/images
```

2. Service Implementation
```typescript
// Already set up:
- imageService.ts
- productPublishService.ts
- imageUploadMiddleware.ts
```

3. Database Setup
```sql
-- Need to create:
- products_internal
- products_public
- categories
- images
```

## Getting Started

1. Install dependencies:
```bash
pnpm install
```

2. Set up environment variables (see setup guide)

3. Start development server:
```bash
pnpm dev
```