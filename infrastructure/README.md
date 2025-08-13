# 🏗️ Infrastructure

**Simplified infrastructure for the monolith architecture** - only what's actually needed.

## 📁 Structure

```
infrastructure/
├── docker/                    # Container configurations
│   ├── backend.Dockerfile     # Backend API container
│   ├── frontend.Dockerfile    # Frontend React app container
│   └── nginx.conf             # Nginx configuration for frontend
├── database/                  # Database setup
│   └── init.sql              # PostgreSQL schema and sample data
├── monitoring/               # Optional monitoring stack
│   ├── docker-compose.monitoring.yml
│   └── prometheus.yml
└── README.md
```

## 🚀 Usage

### **Basic Development (Required)**
```bash
# Main application stack
docker-compose up -d
```
This starts:
- PostgreSQL database
- Redis cache
- Backend API
- Frontend React app

### **With Monitoring (Optional)**
```bash
# Add monitoring stack when needed
docker-compose -f docker-compose.yml -f infrastructure/monitoring/docker-compose.monitoring.yml up -d
```
This adds:
- Prometheus (metrics collection)
- Grafana (visualization)
- Node Exporter (system metrics)

## 🎯 **Why This Approach?**

### ✅ **What We Kept (Essential)**:
- **Docker containers** - Still need containerization
- **Database schema** - PostgreSQL setup and migrations
- **Nginx config** - Frontend serving and routing
- **Basic monitoring** - Optional, only when needed

### ❌ **What We Removed (Excessive)**:
- **11 separate Dockerfiles** - Now just 2 (backend + frontend)
- **Kubernetes manifests** - Overkill for single service
- **Terraform modules** - Premature for simple setup
- **Complex service mesh** - Not needed for monolith

## 🔧 **Configuration**

### **Environment Variables**
```bash
# Database
DATABASE_URL=postgresql://inventr:inventr_password@postgres:5432/inventr
REDIS_URL=redis://redis:6379

# Backend
NODE_ENV=production
JWT_SECRET=your-secret-here
PORT=8000

# Frontend
VITE_API_URL=http://localhost:8000/api
```

### **Ports**
- **3000** - Frontend (React app)
- **8000** - Backend (API server)
- **5432** - PostgreSQL
- **6379** - Redis
- **9090** - Prometheus (optional)
- **3001** - Grafana (optional)

## 📊 **Monitoring (Optional)**

Only add monitoring when you need it:

```bash
# Start with monitoring
docker-compose -f docker-compose.yml -f infrastructure/monitoring/docker-compose.monitoring.yml up -d

# Access dashboards
open http://localhost:3001  # Grafana (admin/admin)
open http://localhost:9090  # Prometheus
```

## 🔄 **Migration Path**

When you need to scale:

1. **Extract specific modules** to separate services
2. **Add service-specific Dockerfiles** in `infrastructure/docker/services/`
3. **Add Kubernetes manifests** in `infrastructure/k8s/`
4. **Implement service mesh** when you have 5+ services

## 🛡️ **Security**

- **Multi-stage Docker builds** for smaller images
- **Non-root users** in containers
- **Health checks** for all services
- **Security headers** in Nginx
- **Secrets management** via environment variables

---

**Philosophy**: Start simple, add complexity only when needed. This infrastructure grows with your application.