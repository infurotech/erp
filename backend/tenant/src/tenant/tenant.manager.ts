import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CachingManager } from '@infuro/shared';

@Injectable()
export class TenantManager {
  private readonly cacheKeyPrefix = 'tenant:';

  constructor(private readonly cachingManager: CachingManager) {}

  /**
   * Get the connection string for a tenant.
   * @param tenantId - The tenant's unique identifier.
   * @returns Connection string for the tenant.
   */
  async getConnectionString(tenantId: string): Promise<string> {
    if (!tenantId) {
      throw new UnauthorizedException('Tenant ID is required');
    }

    const cacheKey = this.getCacheKey(tenantId);

    // Check if connection string is cached
    let connectionString = await this.cachingManager.get<string>(cacheKey);
    if (connectionString) {
      return connectionString;
    }

    // Fetch from database if not cached
    connectionString = await this.fetchConnectionStringFromDatabase(tenantId);
    if (!connectionString) {
      throw new UnauthorizedException('Invalid Tenant ID');
    }

    // Cache the connection string for future use
    await this.cachingManager.set(cacheKey, connectionString, 3600); // 1-hour TTL
    return connectionString;
  }

  /**
   * Update the connection string for a tenant.
   * @param tenantId - The tenant's unique identifier.
   * @param connectionString - The new connection string.
   */
  async updateConnectionString(tenantId: string, connectionString: string): Promise<void> {
    if (!tenantId || !connectionString) {
      throw new UnauthorizedException('Tenant ID and connection string are required');
    }

    const cacheKey = this.getCacheKey(tenantId);

    // Update database and cache
    await this.updateConnectionStringInDatabase(tenantId, connectionString);
    await this.cachingManager.set(cacheKey, connectionString, 3600); // Refresh cache
  }

  /**
   * Generate the cache key for a tenant.
   * @param tenantId - The tenant's unique identifier.
   * @returns Cache key.
   */
  private getCacheKey(tenantId: string): string {
    return `${this.cacheKeyPrefix}${tenantId}`;
  }

  /**
   * Mock method to fetch connection string from database.
   * Replace with actual implementation.
   */
  private async fetchConnectionStringFromDatabase(tenantId: string): Promise<string | null> {
    // Mocked database query
    const tenantDb = {
      tenant1: 'mongodb://tenant1-db:27017',
      tenant2: 'mongodb://tenant2-db:27017',
    };
    return tenantDb[tenantId] || null;
  }

  /**
   * Mock method to update connection string in the database.
   * Replace with actual implementation.
   */
  private async updateConnectionStringInDatabase(tenantId: string, connectionString: string): Promise<void> {
    console.log(`Updated connection string for ${tenantId} to ${connectionString}`);
  }
}
