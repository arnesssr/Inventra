# 📦 Inventr - Inventory Management System

A simplified, modern inventory management system built with TypeScript, React, and Node.js.

## 🚀 Quick Start

```bash
# Clone and setup
git clone <repo-url>
cd Inventr

# Start with Docker (Recommended)
docker-compose up -d

# Or run locally
npm install
npm run dev
```

## 🏗️ Architecture

**Simplified Monolith Architecture** (instead of complex microservices):

```
├── backend/           # Single Node.js API server
│   ├── src/modules/   # Feature modules (auth, products, orders, etc.)
│   └── src/shared/    # Shared utilities
├── apps/web/          # React frontend
│   ├── components/    # UI components
│   ├── pages/         # Page components
│   └── store/         # Zustand state management
└── packages/          # Shared packages (minimal)
```

## 🔧 Tech Stack

### Backend
- **Node.js + Express** - Single API server
- **PostgreSQL** - Primary database
- **Redis** - Caching and sessions
- **TypeScript** - Type safety

### Frontend
- **React + Vite** - Fast development
- **Zustand** - Simplified state management
- **Tailwind CSS** - Styling
- **React Query** - Server state management

## 🎯 Key Features

- **Product Management** - Add, edit, track products
- **Inventory Tracking** - Real-time stock levels
- **Order Processing** - Order lifecycle management
- **Supplier Management** - Vendor relationships
- **Audit Trail** - Change tracking
- **Notifications** - Real-time updates
- **Reports** - Analytics and insights

## 📊 Why This Architecture?

### ✅ Benefits of Simplified Monolith:
- **Faster Development** - No network calls between services
- **Easier Debugging** - Single codebase to trace
- **ACID Transactions** - Database consistency guaranteed
- **Simple Deployment** - One service to deploy
- **Lower Latency** - No inter-service communication overhead

### 🔄 Migration Path:
When you need to scale specific features:
1. Extract high-load modules to separate services
2. Use database per service pattern
3. Implement event-driven communication
4. Add service mesh for complex scenarios

## 🛠️ Configuration

Environment variables:
```bash
# Backend
DATABASE_URL=postgresql://user:pass@localhost:5432/inventr
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-here

# Frontend  
VITE_API_URL=http://localhost:8000/api
VITE_WS_URL=ws://localhost:8000
```

## 🔒 Security

- JWT authentication
- Request validation with Zod
- SQL injection protection
- CORS configuration
- Rate limiting
- Helmet security headers

---

**Note**: This architecture prioritizes simplicity and development velocity. Extract services only when you have clear scaling needs and the team experience to manage distributed systems.