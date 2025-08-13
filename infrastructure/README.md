# 🗄️ Infrastructure as Code

This directory contains all infrastructure configurations for deploying and managing the Inventra system.

## Structure

```
infrastructure/
├── docker/                 # Container configurations
├── kubernetes/             # K8s manifests and Helm charts
├── terraform/              # Cloud infrastructure
├── monitoring/             # Observability stack
└── databases/              # Database schemas and migrations
```

## Docker (`docker/`)

### Services
Individual Dockerfiles for each service:
```
docker/services/
├── api-gateway.Dockerfile
├── product-service.Dockerfile
├── inventory-service.Dockerfile
└── ...
```

### Development
```bash
# Start all services
docker-compose up -d

# Start specific services
docker-compose up api-gateway product-service

# View logs
docker-compose logs -f product-service
```

### Production
- Multi-stage builds for optimization
- Security scanning with Trivy
- Minimal base images (Alpine Linux)

## Kubernetes (`kubernetes/`)

### Base Configurations
```
kubernetes/base/
├── deployments/            # Service deployments
├── services/               # Service definitions
├── configmaps/             # Configuration data
└── secrets/                # Sensitive data
```

### Environment Overlays
```
kubernetes/overlays/
├── development/            # Dev environment
├── staging/                # Staging environment
└── production/             # Production environment
```

### Helm Charts
```
kubernetes/helm-charts/
├── inventra/               # Main application chart
├── monitoring/             # Monitoring stack
└── databases/              # Database deployments
```

## Terraform (`terraform/`)

### Modules
Reusable infrastructure components:
```
terraform/modules/
├── vpc/                    # Network infrastructure
├── eks/                    # Kubernetes cluster
├── rds/                    # Database instances
├── s3/                     # Storage buckets
└── monitoring/             # Observability resources
```

### Environments
```
terraform/environments/
├── development/
├── staging/
└── production/
```

## Monitoring (`monitoring/`)

### Prometheus
- Service discovery configurations
- Alerting rules
- Recording rules

### Grafana
- Dashboard definitions
- Data source configurations
- Alert channels

### Jaeger
- Distributed tracing setup
- Sampling configurations

## Databases (`databases/`)

### PostgreSQL
```
databases/postgresql/
├── schemas/                # Database schemas
├── migrations/             # Schema migrations
├── seeds/                  # Test data
└── backups/                # Backup configurations
```

### Redis
```
databases/redis/
├── configurations/         # Redis configs
└── sentinel/               # High availability setup
```

## Deployment

### Local Development
```bash
# Start infrastructure
docker-compose -f infrastructure/docker/docker-compose.yml up -d

# Apply database migrations
npm run migrate:dev
```

### Staging/Production
```bash
# Deploy with Terraform
cd infrastructure/terraform/environments/production
terraform init
terraform plan
terraform apply

# Deploy applications with Helm
helm upgrade --install inventra infrastructure/kubernetes/helm-charts/inventra/
```

## Security

### Secrets Management
- Kubernetes secrets for sensitive data
- AWS Secrets Manager integration
- Vault for advanced secret management

### Network Security
- VPC with private subnets
- Security groups and NACLs
- WAF for web application protection

### Container Security
- Image scanning with Trivy
- Non-root containers
- Resource limits and quotas

## Monitoring & Observability

### Metrics
- Prometheus for metrics collection
- Grafana for visualization
- Custom business metrics

### Logging
- Centralized logging with ELK stack
- Structured logging format
- Log aggregation and analysis

### Tracing
- Distributed tracing with Jaeger
- Request flow visualization
- Performance bottleneck identification

## Backup & Disaster Recovery

### Database Backups
- Automated daily backups
- Point-in-time recovery
- Cross-region replication

### Application Backups
- Configuration backups
- Persistent volume snapshots
- Disaster recovery procedures