import { Injectable } from '@nestjs/common';
import { CachingManager } from '../caching/caching.manager';

@Injectable()
export class LocalizationManager {
  private readonly cacheKey = 'localizations';

  constructor(private readonly cachingManager: CachingManager) {}

  async getLocalizations(): Promise<Record<string, Record<string, string>>> {
    const cachedData = await this.cachingManager.get<Record<string, Record<string, string>>>(this.cacheKey);
    if (cachedData) return cachedData;

    const localizations = await this.fetchLocalizationsFromDatabase();
    await this.cachingManager.set(this.cacheKey, localizations, 3600); // 1 hour TTL
    return localizations;
  }

  async setLocalizations(newLocalizations: Record<string, Record<string, string>>): Promise<void> {
    await this.saveLocalizationsToDatabase(newLocalizations);
    await this.cachingManager.set(this.cacheKey, newLocalizations, 3600); // Refresh cache
  }

  private async fetchLocalizationsFromDatabase(): Promise<Record<string, Record<string, string>>> {
    // Mocked DB query
    return {
      en: { welcome: 'Welcome' },
      es: { welcome: 'Bienvenido' },
    };
  }

  private async saveLocalizationsToDatabase(localizations: Record<string, Record<string, string>>): Promise<void> {
    // Mocked DB save
    console.log('Saved localizations to database:', localizations);
  }
}
