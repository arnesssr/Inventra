# 🔧 Development Guide

## Prerequisites

### Required Software
- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher (or pnpm/yarn)
- **Docker**: 20.10.0 or higher
- **Docker Compose**: 2.0.0 or higher
- **Git**: 2.30.0 or higher

### Optional Tools
- **Kubernetes**: For local K8s development (minikube/kind)
- **Terraform**: For infrastructure management
- **VS Code**: Recommended IDE with extensions

## Project Setup

### 1. Clone Repository
```bash
git clone https://github.com/arnesssr/Inventra.git
cd Inventra
```

### 2. Install Dependencies
```bash
# Install root dependencies and all workspace packages
npm run install:all

# Or install individually
npm install
npm install --workspaces
```

### 3. Environment Setup
```bash
# Copy environment templates
cp environments/local/.env.example environments/local/.env

# Edit environment variables
nano environments/local/.env
```

### 4. Start Infrastructure
```bash
# Start databases and supporting services
npm run docker:up

# Wait for services to be healthy
docker-compose -f infrastructure/docker/docker-compose.yml ps
```

### 5. Run Database Migrations
```bash
# Run initial migrations
npm run migrate:dev

# Seed test data (optional)
cd infrastructure/databases && npm run seed:dev
```

## Development Workflow

### Starting Development
```bash
# Start all services in development mode
npm run dev

# Or start individual components
npm run dev:web          # Frontend only
npm run dev:services     # Backend services only
```

### Working with Services

#### Frontend Development
```bash
cd apps/web
npm run dev              # Start dev server
npm run build            # Build for production
npm run test             # Run tests
npm run lint             # Lint code
```

#### Backend Service Development
```bash
cd services/product-service
npm run dev              # Start with hot reload
npm run build            # Build TypeScript
npm run test             # Run unit tests
npm run test:watch       # Watch mode
```

#### Package Development
```bash
cd packages/shared-types
npm run build            # Build package
npm run dev              # Watch mode
```

## Code Standards

### TypeScript Configuration
- Strict mode enabled
- Path mapping for clean imports
- Consistent tsconfig across packages

### ESLint Rules
- TypeScript ESLint recommended
- React hooks rules
- Import order enforcement
- Consistent code style

### Prettier Configuration
- 2-space indentation
- Single quotes
- Trailing commas
- Line length: 80 characters

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/your-feature-name
```

## Testing Strategy

### Unit Tests
- **Framework**: Jest + Testing Library
- **Coverage**: Minimum 80%
- **Location**: `__tests__` folders or `.test.ts` files

```bash
# Run all tests
npm run test

# Run tests for specific package
cd packages/shared-utils && npm test

# Run with coverage
npm run test -- --coverage
```

### Integration Tests
- **Location**: `testing/integration/`
- **Database**: Test database with migrations
- **API Testing**: Supertest for HTTP endpoints

```bash
# Run integration tests
cd testing/integration && npm test
```

### End-to-End Tests
- **Framework**: Playwright
- **Location**: `testing/e2e/`
- **Environment**: Staging-like setup

```bash
# Run e2e tests
npm run test:e2e
```

## Database Development

### Migrations
```bash
# Create new migration
cd infrastructure/databases
npm run migration:create -- add_product_table

# Run migrations
npm run migrate:dev        # Development
npm run migrate:prod       # Production

# Rollback migration
npm run migrate:rollback
```

### Schema Changes
1. Create migration file
2. Update TypeScript types
3. Update service models
4. Test migration up/down

### Seeding Data
```bash
# Seed development data
npm run seed:dev

# Seed specific data
npm run seed:products
```

## API Development

### Service Structure
```
services/product-service/
├── src/
│   ├── controllers/       # HTTP request handlers
│   ├── services/          # Business logic
│   ├── models/            # Data models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── types/             # Service-specific types
│   └── index.ts           # Entry point
├── tests/                 # Unit tests
├── Dockerfile             # Container definition
└── package.json           # Dependencies
```

### API Standards
- RESTful endpoints
- Consistent error responses
- Request/response validation
- OpenAPI documentation

### Example Controller
```typescript
// src/controllers/productController.ts
import { Request, Response } from 'express';
import { productService } from '../services/productService';
import { CreateProductRequest } from '../types';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const productData: CreateProductRequest = req.body;
    const product = await productService.create(productData);
    
    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};
```

## Frontend Development

### Component Structure
```
apps/web/src/
├── components/            # Reusable components
├── features/              # Feature-specific components
├── pages/                 # Page components
├── hooks/                 # Custom hooks
├── services/              # API services
├── types/                 # Component types
└── utils/                 # Utility functions
```

### State Management
- **UI State**: Zustand (minimal)
- **Server State**: React Query
- **Form State**: React Hook Form

### Example Component
```typescript
// components/ProductCard.tsx
import { Product } from '@inventra/shared-types';
import { Button } from '@inventra/ui-components';

interface ProductCardProps {
  product: Product;
  onEdit: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onEdit 
}) => {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600">{product.description}</p>
      <Button onClick={() => onEdit(product.id)}>
        Edit Product
      </Button>
    </div>
  );
};
```

## Docker Development

### Building Images
```bash
# Build all service images
npm run docker:build

# Build specific service
docker build -f infrastructure/docker/services/product-service.Dockerfile services/product-service -t inventra/product-service
```

### Local Development
```bash
# Start all services
docker-compose -f infrastructure/docker/docker-compose.yml up -d

# View logs
docker-compose logs -f product-service

# Execute commands in container
docker-compose exec product-service npm run migrate
```

### Debugging in Docker
```bash
# Start service with debug port
docker-compose -f infrastructure/docker/docker-compose.debug.yml up product-service

# Attach debugger to port 9229
```

## Monitoring & Debugging

### Local Monitoring
- **Prometheus**: http://localhost:9090
- **Grafana**: http://localhost:3001 (admin/admin)
- **Redis Commander**: http://localhost:8081

### Logging
```typescript
// Use structured logging
import { logger } from '../utils/logger';

logger.info('Product created', {
  productId: product.id,
  userId: req.user.id,
  timestamp: new Date().toISOString()
});
```

### Health Checks
```typescript
// Add health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

## Troubleshooting

### Common Issues

#### Port Conflicts
```bash
# Check what's using a port
lsof -i :8000

# Kill process
kill -9 <PID>
```

#### Database Connection Issues
```bash
# Check PostgreSQL status
docker-compose ps postgres

# View database logs
docker-compose logs postgres

# Connect to database
docker-compose exec postgres psql -U inventra -d inventra
```

#### Node Modules Issues
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Clean workspace packages
npm run clean
npm run install:all
```

### Performance Issues
- Use Node.js profiler
- Monitor memory usage
- Check database query performance
- Analyze bundle size

## VS Code Setup

### Recommended Extensions
- TypeScript and JavaScript Language Features
- ESLint
- Prettier
- Docker
- GitLens
- Thunder Client (API testing)

### Workspace Settings
```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### Debug Configuration
```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Product Service",
  "program": "${workspaceFolder}/services/product-service/src/index.ts",
  "outFiles": ["${workspaceFolder}/services/product-service/dist/**/*.js"],
  "runtimeArgs": ["-r", "ts-node/register"]
}
```