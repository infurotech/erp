import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { NotificationQueueManager } from './notification-queue.manager';
import { NotificationQueueWorker } from './notification-queue.worker';
import { EmailNotificationHandler } from './handlers/email-notification.handler';
import { PushNotificationHandler } from './handlers/push-notification.handler';
import { SMSNotificationHandler } from './handlers/sms-notification.handler';
import { SlackNotificationHandler } from './handlers/slack-notification.handler';
import { TeamsNotificationHandler } from './handlers/teams-notification.handler';
import { DesktopNotificationHandler } from './handlers/desktop-notification.handler';
import { WhatsAppNotificationHandler } from './handlers/whatsapp-notification.handler';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'notification',
    }),
  ],
  providers: [
    NotificationQueueManager,
    NotificationQueueWorker,
    EmailNotificationHandler,
    PushNotificationHandler,
    SMSNotificationHandler,
    SlackNotificationHandler,
    TeamsNotificationHandler,
    DesktopNotificationHandler, // New handler
    WhatsAppNotificationHandler, // New handler
  ],
  exports: [NotificationQueueManager],
})
export class NotificationModule {}
