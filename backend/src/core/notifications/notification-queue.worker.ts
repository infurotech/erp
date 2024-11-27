import { Process, Processor } from '@nestjs/bullmq';
import { DesktopNotificationHandler } from "./handlers/desktop-notification.handler";
import { EmailNotificationHandler } from "./handlers/email-notification.handler";
import { PushNotificationHandler } from "./handlers/push-notification.handler";
import { SlackNotificationHandler } from "./handlers/slack-notification.handler";
import { SMSNotificationHandler } from "./handlers/sms-notification.handler";
import { TeamsNotificationHandler } from "./handlers/teams-notification.handler";
import { WhatsAppNotificationHandler } from "./handlers/whatsapp-notification.handler";
import { NotificationJob } from "./notification";

@Processor('notification')
export class NotificationQueueWorker {
  constructor(
    private readonly emailHandler: EmailNotificationHandler,
    private readonly pushHandler: PushNotificationHandler,
    private readonly smsHandler: SMSNotificationHandler,
    private readonly slackHandler: SlackNotificationHandler,
    private readonly teamsHandler: TeamsNotificationHandler,
    private readonly desktopHandler: DesktopNotificationHandler, // New handler
    private readonly whatsappHandler: WhatsAppNotificationHandler, // New handler
  ) {}

  @Process('send-notification')
  async handleNotification(job: NotificationJob) {
    const { notificationType, payload } = job.data;

    switch (notificationType) {
      case 'email':
        await this.emailHandler.sendEmail(payload.to, payload.subject, payload.message);
        break;
      case 'push':
        await this.pushHandler.sendPushNotification(payload.deviceToken, payload.message);
        break;
      case 'sms':
        await this.smsHandler.sendSMS(payload.to, payload.message);
        break;
      case 'slack':
        await this.slackHandler.sendSlackMessage(payload.channel, payload.text);
        break;
      case 'teams':
        await this.teamsHandler.sendTeamsMessage(payload.webhookUrl, payload.message);
        break;
      case 'desktop':
        await this.desktopHandler.sendDesktopNotification(payload.subscription, payload.message);
        break;
      case 'whatsapp':
        await this.whatsappHandler.sendWhatsAppMessage(payload.to, payload.message);
        break;
      default:
        throw new Error(`Unsupported notification type: ${notificationType}`);
    }
  }
}
