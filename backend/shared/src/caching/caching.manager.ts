import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CachingManager {
  constructor(@Inject('CACHE_MANAGER') private readonly cache: Cache) {}

  async get<T>(key: string): Promise<T | null> {
    const value = await this.cache.get<T>(key);
    console.log(`[CachingManager] GET ${key}:`, !!value);
    return value ?? null;
  }

  async set<T>(key: string, value: T, ttl: number): Promise<void> {
    console.log(`[CachingManager] SET ${key} with TTL ${ttl}`);
    await this.cache.set(key, value, ttl );
  }

  async invalidate(key: string): Promise<void> {
    console.log(`[CachingManager] DELETE ${key}`);
    await this.cache.del(key);
  }

  async exists(key: string): Promise<boolean> {
    const value = await this.cache.get(key);
    return value !== undefined && value !== null;
  }
}
