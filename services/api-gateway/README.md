# API Gateway Service

The API Gateway serves as the single entry point for all client requests to the Inventra microservices architecture. It handles routing, authentication, rate limiting, and load balancing.

## Features

- **Request Routing**: Routes requests to appropriate microservices
- **Authentication**: JWT-based authentication middleware
- **Rate Limiting**: Protects services from abuse
- **Load Balancing**: Distributes requests across service instances
- **Monitoring**: Prometheus metrics and health checks
- **Security**: CORS, Helmet, and other security middleware

## Environment Variables

```env
PORT=8000
NODE_ENV=development
JWT_SECRET=your-jwt-secret
ALLOWED_ORIGINS=http://localhost:3000

# Service URLs
AUTH_SERVICE_URL=http://localhost:8001
PRODUCT_SERVICE_URL=http://localhost:8002
INVENTORY_SERVICE_URL=http://localhost:8003
ORDER_SERVICE_URL=http://localhost:8004
SUPPLIER_SERVICE_URL=http://localhost:8005
NOTIFICATION_SERVICE_URL=http://localhost:8006
AUDIT_SERVICE_URL=http://localhost:8007
WEBHOOK_SERVICE_URL=http://localhost:8008
FILE_SERVICE_URL=http://localhost:8009
ANALYTICS_SERVICE_URL=http://localhost:8010
```

## API Routes

- `GET /health` - Health check endpoint
- `GET /metrics` - Prometheus metrics
- `/api/auth/*` - Authentication service routes
- `/api/products/*` - Product service routes (authenticated)
- `/api/inventory/*` - Inventory service routes (authenticated)
- `/api/orders/*` - Order service routes (authenticated)
- `/api/suppliers/*` - Supplier service routes (authenticated)
- `/api/notifications/*` - Notification service routes (authenticated)
- `/api/audit/*` - Audit service routes (authenticated)
- `/api/webhooks/*` - Webhook service routes
- `/api/files/*` - File service routes (authenticated)
- `/api/analytics/*` - Analytics service routes (authenticated)

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Run linting
npm run lint
```

## Docker

```bash
# Build Docker image
npm run docker:build

# Run Docker container
npm run docker:run
```

## Architecture

The API Gateway uses Express.js with the following middleware stack:

1. **Security**: Helmet, CORS
2. **Rate Limiting**: Express rate limit
3. **Logging**: Morgan + Winston
4. **Metrics**: Prometheus client
5. **Authentication**: JWT verification
6. **Proxy**: HTTP proxy middleware for service routing
7. **Error Handling**: Centralized error handling

## Monitoring

- Health check endpoint: `/health`
- Metrics endpoint: `/metrics`
- Structured logging with Winston
- Request/response metrics with Prometheus