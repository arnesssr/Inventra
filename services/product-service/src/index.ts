import dotenv from 'dotenv';
import { createApp } from './app';
import { logger } from './utils/logger';
import { connectDatabase } from './utils/database';
import { connectRedis } from './utils/redis';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 8002;
const NODE_ENV = process.env.NODE_ENV || 'development';

async function startServer() {
  try {
    // Initialize database connection
    await connectDatabase();
    logger.info('✅ Database connected successfully');

    // Initialize Redis connection
    await connectRedis();
    logger.info('✅ Redis connected successfully');

    const app = await createApp();
    
    const server = app.listen(PORT, () => {
      logger.info(`🚀 Product Service running on port ${PORT} in ${NODE_ENV} mode`);
      logger.info(`📊 Health check: http://localhost:${PORT}/health`);
      logger.info(`📖 API Docs: http://localhost:${PORT}/api-docs`);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      logger.info('SIGTERM received, shutting down gracefully');
      server.close(() => {
        logger.info('Process terminated');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      logger.info('SIGINT received, shutting down gracefully');
      server.close(() => {
        logger.info('Process terminated');
        process.exit(0);
      });
    });

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();