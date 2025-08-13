# 📚 Shared Packages

This directory contains reusable libraries and components shared across applications and services.

## Packages

### Shared Types (`shared-types/`)
- **Purpose**: Common TypeScript interfaces and types
- **Technology**: TypeScript
- **Exports**: Product, Order, Inventory, User types
- **Usage**: Imported by all apps and services

### Shared Utils (`shared-utils/`)
- **Purpose**: Common utility functions
- **Technology**: TypeScript
- **Exports**: Date utils, validation helpers, formatters
- **Usage**: Business logic utilities

### UI Components (`ui-components/`)
- **Purpose**: Reusable React components
- **Technology**: React + TypeScript + Tailwind CSS
- **Exports**: Buttons, Forms, Tables, Modals
- **Usage**: Frontend applications

### API Client (`api-client/`)
- **Purpose**: HTTP client with type safety
- **Technology**: TypeScript + Axios/Fetch
- **Exports**: Typed API methods
- **Usage**: Frontend applications

### Validation Schemas (`validation-schemas/`)
- **Purpose**: Data validation rules
- **Technology**: Zod/Joi schemas
- **Exports**: Validation schemas for all entities
- **Usage**: Both frontend and backend validation

### Constants (`constants/`)
- **Purpose**: Shared constants and enums
- **Technology**: TypeScript
- **Exports**: Status codes, error messages, configurations
- **Usage**: All applications and services

## Development

### Package Structure
Each package follows this structure:
```
package-name/
├── src/
│   ├── index.ts          # Main exports
│   ├── types.ts          # Type definitions
│   └── utils.ts          # Utility functions
├── package.json          # Package configuration
├── tsconfig.json         # TypeScript config
└── README.md             # Package documentation
```

### Building Packages
```bash
# Build all packages
npm run build:packages

# Build specific package
cd packages/shared-types && npm run build
```

### Publishing
```bash
# Publish to npm registry (if needed)
npm run publish:packages
```

### Versioning
- Semantic versioning (semver)
- Automated version bumps
- Changelog generation

## Usage

### In Applications
```typescript
// Import shared types
import { Product, Order } from '@inventra/shared-types';

// Import UI components
import { Button, Modal } from '@inventra/ui-components';

// Import API client
import { productApi } from '@inventra/api-client';
```

### In Services
```typescript
// Import shared types
import { ProductCreateRequest } from '@inventra/shared-types';

// Import validation schemas
import { productSchema } from '@inventra/validation-schemas';

// Import utilities
import { formatDate } from '@inventra/shared-utils';
```

## Best Practices

1. **Single Responsibility**: Each package has one clear purpose
2. **No Circular Dependencies**: Packages should not depend on each other
3. **Semantic Versioning**: Follow semver for breaking changes
4. **Documentation**: Each package has comprehensive README
5. **Testing**: Unit tests for all utility functions
6. **TypeScript**: Full type safety across all packages