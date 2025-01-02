import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { EmailService } from './email/email.service';
import { CloudAPIModule } from 'src/modules/plugins/nestjs-whatsapp-cloudapi/whatsapp-cloudapi.module';
import { TwilioModule } from 'src/modules/plugins/nestjs-whatsapp-twilio/whatsapp-twilio.module';
import { EjsRendererService } from './email/render-templates';
import { QueueProducer } from 'src/modules/core/queue/queue.producer';
import { QueueConsumer } from 'src/modules/core/queue/queue.consumer';
const {
  TWILIO_AUTH_TOKEN,
  TWILIO_SID,
  TWILIO_WHATSAPP_NUMBER,
  WHATSAPP_CLOUD_API_VERSION,
  WHATSAPP_CLOUD_API_PHONE_NUMBER_ID,
  WHATSAPP_CLOUD_API_WEBHOOK_VERIFICATION_TOKEN: VERIFICATION_TOKEN
} = process.env;
@Module({
  providers: [QueueProducer,QueueConsumer, EmailService, EjsRendererService],
  imports: [
    BullModule.registerQueue({
      name: 'notificationQueue'
    }),
    CloudAPIModule.register({
      VERIFICATION_TOKEN,
      WHATSAPP_CLOUD_API_VERSION,
      WHATSAPP_CLOUD_API_PHONE_NUMBER_ID,
    }),
    // TwilioModule.register({
    //   TWILIO_AUTH_TOKEN,
    //   TWILIO_SID,
    //   TWILIO_WHATSAPP_NUMBER,
    // }),
  ],
})
export class NotificationModule {}
