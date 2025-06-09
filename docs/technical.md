# Technical Documentation

## Setup & Installation
```bash
npm install
npm run dev
```

## Environment Variables
```env
# Required Environment Variables
VITE_API_URL=                     # Backend API URL
VITE_CLERK_PUBLISHABLE_KEY=       # Clerk authentication
VITE_SOCKET_PATH=                 # WebSocket path

# Security Configuration
VITE_SECURITY_SIGNATURE_SECRET=   # HMAC signing secret
VITE_SECURITY_TIMESTAMP_TOLERANCE=# Timestamp validity window
VITE_SECURITY_NONCE_TIMEOUT=      # Nonce expiration time

# Rate Limiting
VITE_RATE_LIMIT_WINDOW=          # Rate limit window in ms
VITE_RATE_LIMIT_MAX_REQUESTS=    # Max requests per window

# Monitoring
VITE_ENABLE_REQUEST_LOGGING=     # Enable request logging
VITE_ENABLE_PERFORMANCE_METRICS= # Enable performance tracking
```

## Build Process
```bash
npm run build
npm run preview
```

## Testing
```bash
npm run test        # Run tests
npm run test:watch  # Watch mode
```

## Code Organization

### Core Concepts
1. Services for external communication
2. Stores for state management
3. Components for UI
4. Hooks for shared logic

### File Structure
```
src/
├── components/      # Reusable UI components
├── features/        # Feature-specific code
├── services/        # External services
├── stores/          # State management
├── hooks/          # Custom hooks
├── types/          # TypeScript definitions
└── utils/          # Utility functions
```

## Development Guidelines
1. Use TypeScript for type safety
2. Follow ESLint rules
3. Write tests for critical features
4. Document complex logic
