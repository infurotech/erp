import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

import { Cache } from 'cache-manager';

let cacheInstance: Cache;

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {
    cacheInstance = this.cacheManager;
  }
}

// Export a getter for use outside of DI
export const getCacheManager = () => cacheInstance;
