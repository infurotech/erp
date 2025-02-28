import { Injectable } from '@nestjs/common';
import { CachingManager } from '../caching/caching.manager';

@Injectable()
export class SettingsManager {
  private readonly cacheKey = 'settings';

  constructor(private readonly cachingManager: CachingManager) {}

  async getSettings(): Promise<Record<string, any>> {
    const cachedData = await this.cachingManager.get<Record<string, any>>(this.cacheKey);
    if (cachedData) return cachedData;

    const settings = await this.fetchSettingsFromDatabase();
    await this.cachingManager.set(this.cacheKey, settings, 3600); // 1 hour TTL
    return settings;
  }

  async setSettings(newSettings: Record<string, any>): Promise<void> {
    await this.saveSettingsToDatabase(newSettings);
    await this.cachingManager.set(this.cacheKey, newSettings, 3600); // Refresh cache
  }

  private async fetchSettingsFromDatabase(): Promise<Record<string, any>> {
    // Mocked DB query
    return { theme: 'dark', language: 'en' };
  }

  private async saveSettingsToDatabase(settings: Record<string, any>): Promise<void> {
    // Mocked DB save
    console.log('Saved settings to database:', settings);
  }
}
