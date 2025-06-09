# Architecture

## System Overview
```
PMS (Frontend) → Backend → Supabase
```

## Data Flow
1. UI -> ProductStore (optimistic update) -> Local State
2. ProductService -> API -> Backend -> Database
3. Store Update (confirm/rollback)

## Components

### Frontend (PMS)
- **UI Layer**: Product creation/editing forms
- **Store Layer**: Optimistic updates and state management
- **Service Layer**: API communication

### Backend
- **API Layer**: Express routes and controllers
- **Service Layer**: Business logic and data transformation
- **Storage Layer**: Database operations and image handling

## Integration Points

### PMS to Backend
- Product CRUD operations
- Image uploads
- Category management
- Publishing workflow

### Backend to Supabase
- Data persistence
- Public/Private table management
- Real-time updates

## Storage Strategy
1. **Images**: Cloudinary
2. **Product Data**: 
   - Private tables (PMS management)
   - Public tables (Storefront consumption)

## Security
- API Key authentication
- Request validation
- Error handling and logging

# Architecture Documentation

## Overview
Inventra Frontend is built with React and TypeScript, following a modular architecture.

## Core Components

### Services Layer
```
/src/services/
├── api/              # API communication
├── websocket/        # Real-time updates
├── security/         # Security features
└── monitoring/       # System monitoring
```

### State Management
- Zustand for global state
- React Query for server state
- Context for theme/auth

### Features
```
/src/features/
├── products/         # Product management
├── inventory/        # Stock management
├── orders/          # Order processing
└── analytics/       # Reporting & metrics
```

## Security
- Request signing
- Rate limiting
- CORS configuration
- Token management

## Real-time Updates
- WebSocket connection
- Event sourcing
- State synchronization
- Conflict resolution

## Monitoring
- Request logging
- Performance tracking
- Error reporting
- Analytics integration

# Request Handling Architecture

## Outgoing Requests
1. API Requests
- Handled by apiService using axios
- Includes request signing
- Rate limiting applied
- Request queueing for concurrent requests
- Response caching layer

2. WebSocket Communication
- Real-time updates via Socket.IO
- Auto-reconnection
- Event-based messaging
- State synchronization

## Incoming Requests
1. Webhook Endpoints
- /api/webhook for PMS notifications
- Signature verification
- Event-based processing
- Security middleware integration

## Security Measures
1. Request Signing
- HMAC signature generation
- Timestamp validation
- Nonce checking
- Rate limiting

2. Authentication
- Clerk authentication
- Token management
- Session handling

## Request Flow
```
Outgoing:
Request -> Rate Limiter -> Security Middleware -> Queue -> API/WebSocket

Incoming:
Webhook -> Signature Verification -> Event Processing -> State Update
```
