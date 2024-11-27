import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { NotificationModule } from '../notifications/notification.module';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    NotificationModule, // Import the Notifications Module
  ],
  exports: [NotificationModule],
})
export class CoreModule {}
