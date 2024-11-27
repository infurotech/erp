import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TenantManager } from './tenant.manager';
import { TenantTypeOrmProvider } from './tenant.typeorm';
import { TenantMiddleware } from './tenant.middleware';
import { CachingModule } from '../caching/caching.module'; // Import your caching module

@Module({
  imports: [CachingModule], // Ensure caching functionality is available
  providers: [TenantManager, TenantTypeOrmProvider],
  exports: [TenantManager, TenantTypeOrmProvider], // Export for use in other modules
})
export class TenantModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply TenantMiddleware globally or on specific routes
    consumer.apply(TenantMiddleware).forRoutes('*');
  }
}
