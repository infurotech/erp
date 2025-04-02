// crm/src/bull/bull.module.ts
import { Module } from '@nestjs/common';
import { BullModule as NestBullModule } from '@nestjs/bull'; // Import the BullModule from NestJS
import { BullService } from './bull.service';  // Import BullService
import { BullConfigService } from './bull.config'; // Optional: For custom Redis configuration

@Module({
  imports: [
    NestBullModule.forRootAsync({
      useClass: BullConfigService,  // Optional: Custom Redis configuration
    }),
    NestBullModule.registerQueue({
      name: 'salesQueue', // Register your queue here
    }),
  ],
  providers: [BullService], // Make sure to provide BullService here
  exports: [BullService], // Export BullService if it's needed in other modules (like SalesModule)
})
export class BullModule {}
