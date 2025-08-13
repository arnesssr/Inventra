import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { logger } from './utils/logger';
import { errorHandler } from './middleware/errorHandler';
import { authMiddleware } from './middleware/auth';
import { metricsMiddleware } from './middleware/metrics';

export async function createApp() {
  const app = express();

  // Security middleware
  app.use(helmet());
  app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true
  }));

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // limit each IP to 1000 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
  });
  app.use(limiter);

  // General middleware
  app.use(compression());
  app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Metrics middleware
  app.use(metricsMiddleware);

  // Health check
  app.get('/health', (req, res) => {
    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'api-gateway',
      version: process.env.npm_package_version || '1.0.0'
    });
  });

  // Service routes with authentication
  app.use('/api/auth', createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL || 'http://localhost:8001',
    changeOrigin: true,
    pathRewrite: { '^/api/auth': '' }
  }));

  app.use('/api/products', authMiddleware, createProxyMiddleware({
    target: process.env.PRODUCT_SERVICE_URL || 'http://localhost:8002',
    changeOrigin: true,
    pathRewrite: { '^/api/products': '' }
  }));

  app.use('/api/inventory', authMiddleware, createProxyMiddleware({
    target: process.env.INVENTORY_SERVICE_URL || 'http://localhost:8003',
    changeOrigin: true,
    pathRewrite: { '^/api/inventory': '' }
  }));

  app.use('/api/orders', authMiddleware, createProxyMiddleware({
    target: process.env.ORDER_SERVICE_URL || 'http://localhost:8004',
    changeOrigin: true,
    pathRewrite: { '^/api/orders': '' }
  }));

  app.use('/api/suppliers', authMiddleware, createProxyMiddleware({
    target: process.env.SUPPLIER_SERVICE_URL || 'http://localhost:8005',
    changeOrigin: true,
    pathRewrite: { '^/api/suppliers': '' }
  }));

  app.use('/api/notifications', authMiddleware, createProxyMiddleware({
    target: process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:8006',
    changeOrigin: true,
    pathRewrite: { '^/api/notifications': '' }
  }));

  app.use('/api/audit', authMiddleware, createProxyMiddleware({
    target: process.env.AUDIT_SERVICE_URL || 'http://localhost:8007',
    changeOrigin: true,
    pathRewrite: { '^/api/audit': '' }
  }));

  app.use('/api/webhooks', createProxyMiddleware({
    target: process.env.WEBHOOK_SERVICE_URL || 'http://localhost:8008',
    changeOrigin: true,
    pathRewrite: { '^/api/webhooks': '' }
  }));

  app.use('/api/files', authMiddleware, createProxyMiddleware({
    target: process.env.FILE_SERVICE_URL || 'http://localhost:8009',
    changeOrigin: true,
    pathRewrite: { '^/api/files': '' }
  }));

  app.use('/api/analytics', authMiddleware, createProxyMiddleware({
    target: process.env.ANALYTICS_SERVICE_URL || 'http://localhost:8010',
    changeOrigin: true,
    pathRewrite: { '^/api/analytics': '' }
  }));

  // 404 handler
  app.use('*', (req, res) => {
    res.status(404).json({
      error: 'Route not found',
      path: req.originalUrl,
      method: req.method
    });
  });

  // Error handling middleware
  app.use(errorHandler);

  return app;
}