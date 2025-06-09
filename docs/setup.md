# Setup Guide

## Prerequisites
- Node.js 18+
- pnpm
- Visual Studio Code

## Environment Setup

### PMS (Frontend)
1. Install dependencies:
```bash
pnpm install
```

2. Environment variables:
```env
VITE_API_URL=<backend-url>
VITE_API_KEY=<api-key>
```

### Backend  ---for more information about backend, see [https://github.com/arnesssr/Backendpms/tree/main/docs](docs/backend.md)
1. Install dependencies:
```bash
pnpm install
```

2. Environment variables:
```env
# Authentication (Clerk)
VITE_CLERK_PUBLISHABLE_KEY=       # Clerk public key
VITE_CLERK_SECRET_KEY=            # Clerk secret key

# API Configuration
VITE_API_URL=                     # Backend API URL
VITE_STOREFRONT_URL=              # Storefront URL
VITE_API_KEY=                     # API authentication key

# WebSocket Configuration
VITE_WS_URL=                      # WebSocket URL
VITE_SOCKET_PATH=                 # Socket.io path
VITE_SOCKET_TIMEOUT=              # Connection timeout
VITE_SOCKET_RECONNECTION=         # Enable reconnection
VITE_SOCKET_RECONNECTION_ATTEMPTS=# Max reconnection attempts

# Security Configuration
VITE_SECURITY_SIGNATURE_SECRET=   # Request signing secret
VITE_SECURITY_TIMESTAMP_TOLERANCE=# Timestamp validity window
VITE_SECURITY_NONCE_TIMEOUT=      # Nonce expiration time

# Rate Limiting (Frontend)
VITE_RATE_LIMIT_WINDOW=          # Rate limit window in ms
VITE_RATE_LIMIT_MAX_REQUESTS=    # Max requests per window

# Monitoring
VITE_ENABLE_REQUEST_LOGGING=     # Enable request logging
VITE_ENABLE_PERFORMANCE_METRICS= # Enable performance metrics

# Webhook Configuration
VITE_WEBHOOK_SECRET=             # Webhook verification secret
```

## Development Workflow

### Running Locally
1. Start backend:
```bash
pnpm dev
```

2. Start PMS:
```bash
pnpm dev
```

### Testing
```bash
pnpm test
```

## Deployment
1. Build:
```bash
pnpm build
```

2. Deploy frontend to Vercel
3. Deploy backend to Railway/Heroku
