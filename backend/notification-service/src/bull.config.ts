// crm/src/bull.config.ts
import { Injectable } from '@nestjs/common';
import { SharedBullConfigurationFactory, BullModuleOptions } from '@nestjs/bull';

@Injectable()
export class BullConfigService implements SharedBullConfigurationFactory {
  createSharedConfiguration(): BullModuleOptions {
    return {
      redis: {
        host: 'localhost',
        port: 6379,
        maxRetriesPerRequest: null, // Optional: Disable retries
      },
    };
  }
}
