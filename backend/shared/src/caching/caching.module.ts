import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import * as memoryStore from 'cache-manager-memory-store'; // ✅

import { CachingManager } from './caching.manager';

@Global()
@Module({
  imports: [
    CacheModule.register({
      store: memoryStore, // ✅ Shared memory store
      ttl: 60 * 60,       // 1 hour
      max: 100,
    }),
  ],
  providers: [CachingManager],
  exports: [CachingManager, CacheModule],
})
export class CachingModule {}
