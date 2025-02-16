import { Injectable } from '@nestjs/common';
import { CachingManager } from '../caching/caching.manager';

@Injectable()
export class FeaturesManager {
  private readonly cacheKey = 'features';

  constructor(private readonly cachingManager: CachingManager) {}

  async getFeatures(): Promise<Record<string, boolean>> {
    const cachedData = await this.cachingManager.get<Record<string, boolean>>(this.cacheKey);
    if (cachedData) return cachedData;

    const features = await this.fetchFeaturesFromDatabase();
    await this.cachingManager.set(this.cacheKey, features, 3600); // 1 hour TTL
    return features;
  }

  async setFeatures(newFeatures: Record<string, boolean>): Promise<void> {
    await this.saveFeaturesToDatabase(newFeatures);
    await this.cachingManager.set(this.cacheKey, newFeatures, 3600); // Refresh cache
  }

  private async fetchFeaturesFromDatabase(): Promise<Record<string, boolean>> {
    // Mocked DB query
    return { featureA: true, featureB: false };
  }

  private async saveFeaturesToDatabase(features: Record<string, boolean>): Promise<void> {
    // Mocked DB save
    console.log('Saved features to database:', features);
  }
}
