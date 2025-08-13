# 🔧 Backend Services

This directory contains all microservices that power the Inventra system.

## Architecture

Each service is independently deployable and follows domain-driven design principles.

## Services

### Core Services

#### API Gateway (`api-gateway/`)
- **Purpose**: Request routing, authentication, rate limiting
- **Technology**: Node.js + Express/Fastify
- **Port**: 8000
- **Dependencies**: Redis (rate limiting), Auth service

#### Auth Service (`auth-service/`)
- **Purpose**: Authentication, authorization, user management
- **Technology**: Node.js + JWT
- **Port**: 8001
- **Database**: PostgreSQL (users, roles, permissions)

### Business Services

#### Product Service (`product-service/`)
- **Purpose**: Product catalog management
- **Technology**: Node.js + Express
- **Port**: 8002
- **Database**: PostgreSQL (products, categories, variants)
- **Features**: CRUD operations, search, categorization

#### Inventory Service (`inventory-service/`)
- **Purpose**: Stock tracking, inventory management
- **Technology**: Node.js + Express
- **Port**: 8003
- **Database**: PostgreSQL (stock levels, movements, locations)
- **Features**: Stock updates, low stock alerts, movements tracking

#### Order Service (`order-service/`)
- **Purpose**: Order processing and fulfillment
- **Technology**: Node.js + Express
- **Port**: 8004
- **Database**: PostgreSQL (orders, order items, status)
- **Features**: Order creation, status updates, fulfillment

#### Supplier Service (`supplier-service/`)
- **Purpose**: Supplier relationship management
- **Technology**: Node.js + Express
- **Port**: 8005
- **Database**: PostgreSQL (suppliers, contacts, terms)
- **Features**: Supplier CRUD, contact management, purchase orders

### Support Services

#### Notification Service (`notification-service/`)
- **Purpose**: Real-time notifications and alerts
- **Technology**: Node.js + Socket.io
- **Port**: 8006
- **Database**: Redis (temporary notifications)
- **Features**: Real-time updates, email notifications, push notifications

#### Audit Service (`audit-service/`)
- **Purpose**: Activity logging and audit trails
- **Technology**: Node.js + Express
- **Port**: 8007
- **Database**: PostgreSQL (audit logs, events)
- **Features**: Activity tracking, compliance reporting

#### Webhook Service (`webhook-service/`)
- **Purpose**: External integrations and webhooks
- **Technology**: Node.js + Express
- **Port**: 8008
- **Features**: Webhook management, external API integrations

#### File Service (`file-service/`)
- **Purpose**: File uploads and storage
- **Technology**: Node.js + Express + Multer
- **Port**: 8009
- **Storage**: AWS S3 / Local filesystem
- **Features**: Image uploads, file management, CDN integration

#### Analytics Service (`analytics-service/`)
- **Purpose**: Reports and business intelligence
- **Technology**: Node.js + Express
- **Port**: 8010
- **Database**: PostgreSQL (aggregated data)
- **Features**: Dashboard data, reports, metrics

## Development

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL
- Redis

### Getting Started
```bash
# Start all services with Docker Compose
docker-compose up -d

# Or start individual services
cd services/product-service && npm run dev
```

### Service Communication
- **Synchronous**: HTTP/REST APIs
- **Asynchronous**: Message queues (Redis/RabbitMQ)
- **Real-time**: WebSocket connections

### Database Strategy
- **Per-service databases**: Each service owns its data
- **Shared types**: Common schemas in packages/shared-types
- **Migrations**: Database migrations per service

## Deployment

### Container Strategy
- Each service has its own Dockerfile
- Multi-stage builds for optimization
- Health checks included

### Orchestration
- Kubernetes manifests in `infrastructure/kubernetes/`
- Helm charts for complex deployments
- Auto-scaling configurations

### Monitoring
- Prometheus metrics
- Distributed tracing with Jaeger
- Centralized logging with ELK stack