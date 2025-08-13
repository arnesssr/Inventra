# 📱 Applications Layer

This directory contains all user-facing applications for the Inventra system.

## Structure

```
apps/
├── web/                    # Main React web application
├── admin-dashboard/        # Administrative interface
└── mobile/                 # React Native mobile app (future)
```

## Applications

### Web Application (`web/`)
- **Technology**: React 18 + TypeScript + Vite
- **Purpose**: Main inventory management interface
- **Features**: Product management, inventory tracking, orders, suppliers
- **Port**: 3000 (development)

### Admin Dashboard (`admin-dashboard/`)
- **Technology**: React + TypeScript
- **Purpose**: System administration and configuration
- **Features**: User management, system settings, analytics
- **Port**: 3001 (development)

### Mobile Application (`mobile/`)
- **Technology**: React Native + TypeScript
- **Purpose**: Mobile inventory management
- **Status**: Future development
- **Features**: Barcode scanning, quick stock updates

## Development

### Prerequisites
- Node.js 18+
- npm or pnpm

### Getting Started
```bash
# Install all app dependencies
npm run install:apps

# Start web app
cd apps/web && npm run dev

# Start admin dashboard
cd apps/admin-dashboard && npm run dev
```

### Shared Dependencies
- UI components from `packages/ui-components`
- Types from `packages/shared-types`
- API client from `packages/api-client`

## Deployment

Each application can be deployed independently:
- Web app: Static hosting (Vercel, Netlify)
- Admin dashboard: Internal hosting
- Mobile app: App stores (future)