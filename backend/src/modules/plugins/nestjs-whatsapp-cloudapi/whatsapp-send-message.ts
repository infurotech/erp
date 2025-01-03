import { Inject, Injectable } from '@nestjs/common';
import { CloudAPIService } from './whatsapp-cloudapi.service';
import { CloudAPIConfig } from './interface/notifications';

@Injectable()
export class WhatsappSendMessage {
  constructor(private whatsappService: CloudAPIService) {}
  async sendProactiveMessage(message: any): Promise<void> {
    // if (!messages) return;
    let response;
    try {
    //   messages.forEach(async (message) => {
        const messageSender = message.to;
        // const messageID = message.id;
        switch (message.type) {
          case 'text':
            const text = message.text.body;
            response = await this.whatsappService.sendWhatsAppMessage(
              messageSender,
              text,
            );
            break;
          case 'image':
            const image = message.image.url;
            const caption = message.image.caption;
            response = await this.whatsappService.sendImageByUrl(
              messageSender,
              image,
              caption,
            );
            break;

          case 'template':
            const template = message.template;
            response = await this.whatsappService.sendMessageByTemplate(
              messageSender,
              template,
            );
        }
    //   });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
    return response;
  }
}
