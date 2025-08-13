import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { errorHandler } from './middleware/errorHandler';
import { authRoutes } from './modules/auth/routes';
import { productRoutes } from './modules/products/routes';
import { inventoryRoutes } from './modules/inventory/routes';
import { orderRoutes } from './modules/orders/routes';
import { supplierRoutes } from './modules/suppliers/routes';
import { auditRoutes } from './modules/audit/routes';
import { notificationRoutes } from './modules/notifications/routes';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(compression());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/audit', auditRoutes);
app.use('/api/notifications', notificationRoutes);

// Error handling
app.use(errorHandler);

export default app;