import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { JobProcessor } from './job.processer';  // Your JobProcessor
import { BullConfigService } from './bull.config';  // Your Bull config service
import { MessageService } from './message/message.service';
@Module({
  imports: [
    BullModule.forRootAsync({
      useClass: BullConfigService,  // Configure Redis if needed
    }),
    BullModule.registerQueue({
      name: 'notificationQueue',  // Make sure the same queue name as in NotificationService
    }),
    BullModule.registerQueue({
      name: 'callbackQueue',  // Make sure the same queue name as in NotificationService
    }),
  ],
  providers: [JobProcessor,MessageService],
})
export class AppModule {}
