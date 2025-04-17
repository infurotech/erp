import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { BullConfigService } from '../bull.config'; // Import your configuration file if necessary

@Module({
  imports: [
    BullModule.forRootAsync({
      useClass: BullConfigService,  // Use the BullConfigService to provide the configuration
    }),
    BullModule.registerQueue({
      name: 'notificationQueue',  // Register the 'notification' queue here
    }),
  ],
  providers: [NotificationService],
  controllers: [NotificationController],
})
export class NotificationModule {}
