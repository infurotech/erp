import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { createProxyMiddleware } from 'http-proxy-middleware';
import * as express from 'express';
import { UnifiedLoggerMiddleware } from './middleware/logger.middleware';

async function bootstrap() {const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  // Apply Middleware to log all requests
  app.use(new UnifiedLoggerMiddleware().use);

  // Reverse Proxy Middleware
  app.use(
    '/auth',
    createProxyMiddleware({
      target: configService.get('AUTH_SERVICE_URL'),
      changeOrigin: true,
      pathRewrite: { '^/auth': '' }, // Removes '/auth' prefix before forwarding
    })
  );

  app.use(
    '/tenant',
    createProxyMiddleware({
      target: configService.get('TENANT_SERVICE_URL'),
      changeOrigin: true,
      pathRewrite: { '^/tenant': '' }, // Removes '/tenant' prefix before forwarding
    })
  );

  await app.listen(3000);
}
bootstrap();
