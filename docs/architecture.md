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
