import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { NotificationInfo } from '../../marketing/notification/notifications';
import { NotFoundException,Optional } from '@nestjs/common';
import { ModulesContainer } from '@nestjs/core';
import { TwilioService } from 'src/modules/plugins/nestjs-whatsapp-twilio/whatsapp-twilio.service';
import { EmailService } from 'src/modules/marketing/notification/email/email.service';
import { WhatsappSendMessage } from 'src/modules/plugins/nestjs-whatsapp-cloudapi/whatsapp-send-message';
@Processor('notificationQueue')
export class QueueConsumer extends WorkerHost {
  protected client: any;
  constructor(
    private emailService: EmailService,
    private modulesContainer: ModulesContainer,
    @Optional()
    private twilioService: TwilioService,
    @Optional()
    private cloudAPIService: WhatsappSendMessage,
  ) {
    super();
  }
  getAllModules() {

    const moduleNames = Array.from(this.modulesContainer.values()).map(
      (moduleRef) => moduleRef.metatype?.name || 'UnknownModule',
    );
    return moduleNames;
  }
 
  async process(job: Job<any, any, string>): Promise<any> {
    const info: NotificationInfo = job.data;
    const registeredModules = this.getAllModules();

    switch (info.notificationType) {
      case 'email': {
        this.emailService.sendEmail(info);
        break;
      }
      case 'whatsapp': {
        if (registeredModules.includes('TwilioModule')) {
          await this.twilioService.sendMessage(info.payload);
        } else if (registeredModules.includes('CloudAPIModule')) {
          await this.cloudAPIService.sendProactiveMessage(info.payload)
        } else {
          throw new NotFoundException(
            'Please register at least one module for the WhatsApp service',
          );
        }
        break;
      }
    }
  }
}
