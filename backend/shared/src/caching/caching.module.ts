import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { CachingManager } from './caching.manager';

@Global()
@Module({
  imports: [
    CacheModule.register({
      ttl: 60 * 60, // 1 hour (in seconds)
      max: 100,     // Max number of items
    }),
  ],
  providers: [CachingManager],
  exports: [CachingManager, CacheModule],
})
export class CachingModule {}
