

import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';  // Import BullModule
import { CrmService } from './crm.service';  // CRM service
import { CrmController } from './crm.controller';  // CRM controller
import { BullConfigService } from './bull.config';  // Import the BullConfigService
import { NotificationModule } from './notification/notification.module';  // The new Notification module

@Module({
  imports: [
    BullModule.forRootAsync({
      useClass: BullConfigService,  // Use BullConfigService to provide the configuration
    }),
    BullModule.registerQueue({
      name: 'salesQueue',  // Register the queue that Sales service will listen to
    }),
    NotificationModule
  ],
  controllers: [CrmController],
  providers: [CrmService],
})
export class AppModule {}
