import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

import { logger } from './utils/logger';
import { errorHandler } from './middleware/errorHandler';
import { metricsMiddleware } from './middleware/metrics';

// Import routes
import productRoutes from './routes/products';
import categoryRoutes from './routes/categories';

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
    max: 500, // limit each IP to 500 requests per windowMs
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
      service: 'product-service',
      version: process.env.npm_package_version || '1.0.0'
    });
  });

  // Ready check (includes database connectivity)
  app.get('/ready', async (req, res) => {
    try {
      // Add database connectivity check here
      res.status(200).json({
        status: 'ready',
        timestamp: new Date().toISOString(),
        service: 'product-service'
      });
    } catch (error) {
      res.status(503).json({
        status: 'not ready',
        error: 'Database connection failed'
      });
    }
  });

  // API routes
  app.use('/products', productRoutes);
  app.use('/categories', categoryRoutes);

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