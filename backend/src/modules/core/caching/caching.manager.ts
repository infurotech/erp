import { Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Inject } from '@nestjs/common';

@Injectable()
export class CachingManager {
  constructor(@Inject('CACHE_MANAGER') private readonly cache: Cache) {}

  async get<T>(key: string): Promise<T | null> {
    const value = await this.cache.get<T>(key);
    return value || null;
  }

  async set<T>(key: string, value: T, ttlInSeconds: any): Promise<void> {
    await this.cache.set(key, value, ttlInSeconds);
  }

  async invalidate(key: string): Promise<void> {
    await this.cache.del(key);
  }

  async exists(key: string): Promise<boolean> {
    const value = await this.cache.get(key);
    return value !== undefined && value !== null;
  }
}