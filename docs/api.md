# API Documentation

## Base URL
```
http://localhost:5000 (Development)
https://backendpms-wvoo.onrender.com (Production)
```

## Authentication
All API requests require an Authorization header with a Bearer token:
```
Authorization: Bearer {token}
```

## Endpoints

### Products
- `GET /api/products` - List all products
- `POST /api/products` - Create product
- `GET /api/products/:id` - Get product details
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `POST /api/products/:id/publish` - Publish product

### Inventory
- `GET /api/inventory` - Get inventory status
- `POST /api/inventory/adjust` - Adjust stock
- `GET /api/inventory/movements` - List stock movements

### Orders
- `GET /api/orders` - List orders
- `POST /api/orders` - Create order
- `PUT /api/orders/:id/status` - Update order status

### WebSocket Events
```typescript
interface WebSocketEvents {
  'inventory_update': { productId: string; currentStock: number }
  'order_created': { orderId: string; status: string }
  'product_published': { productId: string }
}
```

## Rate Limits
- 60 requests per minute per client
- Burst up to 100 requests
