import { NestFactory } from '@nestjs/core';
import { CachingModule } from './caching.module'; // Update path
import { CachingManager } from './caching.manager';

let cacheManagerInstance: CachingManager;

export async function getCacheManager(): Promise<CachingManager> {
  if (cacheManagerInstance) return cacheManagerInstance;

  const app = await NestFactory.createApplicationContext(CachingModule, {
    logger: false, // Optional: suppress logs
  });

  cacheManagerInstance = app.get(CachingManager);
  return cacheManagerInstance;
}
