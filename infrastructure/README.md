# 🏗️ Infrastructure - Smart & Scalable

**Right-sized infrastructure that grows with your needs** - Essential components without premature complexity.

## 🎯 **Philosophy: Progressive Infrastructure**

```
Simple Start → Proven Need → Targeted Scaling
     ↓              ↓              ↓
  Monolith    →  Extract Hot   →  Full Microservices
  (Day 1)        Paths (Month 6)   (Year 2+)
```

## 📁 **Current Structure**

```
infrastructure/
├── docker/                    # Production-ready containers
│   ├── backend.Dockerfile     # Multi-stage Node.js API (security hardened)
│   ├── frontend.Dockerfile    # Optimized React build with Nginx
│   └── nginx.conf             # Production Nginx config (gzip, security headers)
├── database/                  # Database foundation
│   └── init.sql              # Schema + indexes + sample data
├── monitoring/               # Optional observability stack
│   ├── docker-compose.monitoring.yml  # Prometheus + Grafana
│   └── prometheus.yml        # Metrics collection config
└── README.md                 # This file
```

## 🚀 **Quick Start**

### **1. Basic Development (3 containers)**
```bash
# Start core application
docker-compose up -d

# Check health
curl http://localhost:8000/health
curl http://localhost:3000/health
```

**What runs:**
- 🐘 **PostgreSQL** - Primary database with schema
- 🔴 **Redis** - Caching and session storage  
- 🚀 **Backend** - Single Node.js API server
- ⚛️ **Frontend** - React app served by Nginx

### **2. With Monitoring (Optional)**
```bash
# Add observability when needed
docker-compose \
  -f docker-compose.yml \
  -f infrastructure/monitoring/docker-compose.monitoring.yml \
  up -d

# Access dashboards
open http://localhost:3001  # Grafana (admin/admin)
open http://localhost:9090  # Prometheus raw metrics
```

**Additional services:**
- 📊 **Prometheus** - Metrics collection
- 📈 **Grafana** - Visualization dashboards
- 🖥️ **Node Exporter** - System metrics

## 🔧 **Configuration**

### **Environment Variables**
```bash
# Database Connection
DATABASE_URL=postgresql://inventr:inventr_password@postgres:5432/inventr
REDIS_URL=redis://redis:6379

# Backend API
NODE_ENV=production
JWT_SECRET=your-256-bit-secret-here
JWT_EXPIRES_IN=7d
PORT=8000
FRONTEND_URL=http://localhost:3000

# Frontend
VITE_API_URL=http://localhost:8000/api
VITE_WS_URL=ws://localhost:8000
```

### **Port Mapping**
| Service | Port | Purpose | Required |
|---------|------|---------|----------|
| Frontend | 3000 | React app | ✅ Core |
| Backend | 8000 | API server | ✅ Core |
| PostgreSQL | 5432 | Database | ✅ Core |
| Redis | 6379 | Cache/Sessions | ✅ Core |
| Grafana | 3001 | Dashboards | 🔍 Optional |
| Prometheus | 9090 | Metrics | 🔍 Optional |
| Node Exporter | 9100 | System stats | 🔍 Optional |

## 🛡️ **Production Security**

### **Container Security**
- ✅ **Multi-stage builds** - Smaller attack surface
- ✅ **Non-root users** - Principle of least privilege
- ✅ **Health checks** - Automatic failure detection
- ✅ **Resource limits** - Prevent resource exhaustion

### **Network Security**
- ✅ **Nginx security headers** - XSS, CSRF protection
- ✅ **CORS configuration** - Controlled cross-origin access
- ✅ **Rate limiting** - DDoS protection
- ✅ **TLS termination** - HTTPS in production

### **Data Security**
- ✅ **Environment secrets** - No hardcoded credentials
- ✅ **Database encryption** - At rest and in transit
- ✅ **JWT security** - Proper token handling
- ✅ **Input validation** - SQL injection prevention

## 📊 **Monitoring & Observability**

### **Application Metrics**
```bash
# Backend API metrics
curl http://localhost:8000/metrics

# Key metrics tracked:
# - HTTP request duration/count
# - Database connection pool
# - Redis cache hit/miss rates
# - Memory/CPU usage
# - Error rates by endpoint
```

### **Database Monitoring**
```sql
-- Query performance
SELECT query, mean_time, calls 
FROM pg_stat_statements 
ORDER BY mean_time DESC LIMIT 10;

-- Connection monitoring
SELECT count(*) as active_connections 
FROM pg_stat_activity 
WHERE state = 'active';
```

### **Custom Dashboards**
- 📈 **Business Metrics** - Orders, revenue, inventory levels
- 🔧 **Technical Metrics** - Response times, error rates, throughput
- 🖥️ **Infrastructure** - CPU, memory, disk, network

## 🔄 **Scaling Migration Path**

### **Phase 1: Monolith Optimization (Months 1-6)**
```bash
# Current state - optimize what you have
- Vertical scaling (more CPU/RAM)
- Database query optimization
- Redis caching strategy
- CDN for static assets
```

### **Phase 2: Extract Hot Paths (Months 6-12)**
```bash
# When you identify bottlenecks
mkdir infrastructure/docker/services/
# Extract high-load modules:
# - notification-service (if sending many emails)
# - analytics-service (if heavy reporting)
# - file-service (if large uploads)
```

### **Phase 3: Full Microservices (Year 2+)**
```bash
# When team > 10 people, clear service boundaries
mkdir infrastructure/k8s/
# Add when you have:
# - Multiple teams
# - Different scaling needs per service
# - Complex deployment requirements
```

## 🚨 **When NOT to Scale**

❌ **Don't extract services if:**
- Team < 5 people
- < 1000 daily active users
- No clear performance bottlenecks
- Services would share 80%+ of the database
- Network latency > database query time

✅ **DO extract services when:**
- Clear team ownership boundaries
- Different scaling characteristics
- Independent deployment needs
- Regulatory/compliance isolation required

## 🔍 **Troubleshooting**

### **Common Issues**

**Container won't start:**
```bash
# Check logs
docker-compose logs backend
docker-compose logs postgres

# Check health
docker-compose ps
```

**Database connection issues:**
```bash
# Test connection
docker-compose exec backend npm run db:test
docker-compose exec postgres psql -U inventr -d inventr -c "SELECT 1;"
```

**Performance issues:**
```bash
# Check resource usage
docker stats

# Database performance
docker-compose exec postgres psql -U inventr -d inventr -c "
  SELECT query, mean_time, calls 
  FROM pg_stat_statements 
  ORDER BY mean_time DESC LIMIT 5;
"
```

## 📚 **Further Reading**

- 📖 **[Monolith First](https://martinfowler.com/bliki/MonolithFirst.html)** - Martin Fowler
- 📖 **[Database per Service](https://microservices.io/patterns/data/database-per-service.html)** - When to split data
- 📖 **[The Distributed Monolith](https://www.simplethread.com/the-distributed-monolith/)** - Anti-pattern to avoid

---

## 💡 **Key Takeaway**

> **"The best architecture is the one that solves your current problems without creating new ones."**

This infrastructure gives you:
- ✅ **Production readiness** from day 1
- ✅ **Clear scaling path** when needed  
- ✅ **No premature complexity** that slows development
- ✅ **Team-friendly** documentation and setup

Start here. Scale when you have evidence you need to.