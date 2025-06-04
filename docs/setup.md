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

### Backend
1. Install dependencies:
```bash
pnpm install
```

2. Environment variables:
```env
PORT=8000
DATABASE_URL=<supabase-url>
SUPABASE_KEY=<supabase-key>
CLOUDINARY_CLOUD_NAME=<cloud-name>
CLOUDINARY_API_KEY=<api-key>
CLOUDINARY_API_SECRET=<api-secret>
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
