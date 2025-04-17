import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { BullConfigService } from '../sales/bull/bull.config'; 

@Module({
  imports: [
    BullModule.forRootAsync({
      useClass: BullConfigService,  
    }),
    BullModule.registerQueue({
      name: 'notificationQueue',  
    }),BullModule.registerQueue({
      name: 'callbackQueue', 
    }),
  ],
  providers: [NotificationService],
  controllers: [NotificationController],
})
export class NotificationModule {}
