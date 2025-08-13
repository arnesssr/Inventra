# 🏗️ Inventra - Microservices Architecture

A modern inventory management system built with microservices architecture.

## 📁 Project Structure

```
inventra/
├── 📱 apps/                    # Applications layer
├── 🔧 services/               # Backend microservices  
├── 📚 packages/               # Shared libraries
├── 🗄️ infrastructure/         # Infrastructure as Code
├── 🔄 workflows/              # CI/CD & automation
├── 🧪 testing/                # Testing infrastructure
├── 📖 docs/                   # Documentation
├── 🔧 tools/                  # Development tools
├── 📊 monitoring/             # Monitoring & observability
└── 🌍 environments/           # Environment configurations
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- Kubernetes (optional)

### Development Setup
```bash
# Install dependencies
npm run install:all

# Start development environment
npm run dev

# Run tests
npm run test:all
```

## 🏛️ Architecture Overview

### Frontend Applications
- **Web App**: React-based inventory management interface
- **Admin Dashboard**: Administrative interface
- **Mobile App**: React Native mobile application (future)

### Backend Services
- **API Gateway**: Request routing and authentication
- **Product Service**: Product catalog management
- **Inventory Service**: Stock and inventory tracking
- **Order Service**: Order processing and fulfillment
- **Supplier Service**: Supplier relationship management
- **Notification Service**: Real-time notifications
- **Audit Service**: Activity logging and reporting
- **Auth Service**: Authentication and authorization

### Shared Packages
- **Shared Types**: Common TypeScript interfaces
- **UI Components**: Reusable React components
- **API Client**: HTTP client with type safety
- **Validation Schemas**: Data validation rules

## 🔧 Development

See [Development Guide](docs/development/README.md) for detailed setup instructions.

## 🚀 Deployment

See [Deployment Guide](docs/deployment/README.md) for production deployment.

## 📚 Documentation

- [API Documentation](docs/api/README.md)
- [Architecture Guide](docs/architecture/README.md)
- [User Guides](docs/user-guides/README.md)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Add tests
4. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.