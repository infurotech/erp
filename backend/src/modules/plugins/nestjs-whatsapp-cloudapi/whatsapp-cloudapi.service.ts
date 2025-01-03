import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { catchError, lastValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { CloudAPIConfig } from './interface/notifications';
@Injectable()
export class CloudAPIService {
  constructor(@Inject('CONFIG') private readonly config: CloudAPIConfig) {}
  private readonly httpService = new HttpService();
  private readonly logger = new Logger(CloudAPIService.name);
  private readonly url = `https://graph.facebook.com/${this.config.WHATSAPP_CLOUD_API_VERSION}/${this.config.WHATSAPP_CLOUD_API_PHONE_NUMBER_ID}/messages`;
  private readonly configuration = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.config.VERIFICATION_TOKEN}`,
    },
  };

  async sendWhatsAppMessage(
    to: string,
    // messageID : string --> Respond to user
    body: string,
  ) {
    const data = JSON.stringify({
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to,
      /*
      Send message id in context for responding to a user
        context: {
          message_id : messageID
        }
      */
      type: 'text',
      text: {
        preview_url: false,
        body,
      },
    });

    try {
      const response = this.httpService
        .post(this.url, data, this.configuration)
        .pipe(
          map((res) => {
            return res.data;
          }),
        )
        .pipe(
          catchError((error) => {
            this.logger.error(error);
            throw new BadRequestException(
              'Error Posting To WhatsApp Cloud API',
            );
          }),
        );
      const messageSendingStatus = await lastValueFrom(response);
      this.logger.log('Message Sent. Status:', messageSendingStatus);
    } catch (error) {
      this.logger.error(error);
      console.error(error);
      return 'Internal Server Error';
    }
  }

  async sendImageByUrl(
    messageSender: string,
    url: string,
    // messageID: string, --> Respond to a user
    caption: string,
  ) {
    const data = JSON.stringify({
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: messageSender,
      type: 'image',
      image: {
        link: url,
        caption: caption,
      },
    });

    try {
      const response = this.httpService
        .post(this.url, data, this.configuration)
        .pipe(
          map((res) => {
            return res.data;
          }),
        )
        .pipe(
          catchError((error) => {
            this.logger.error(error);
            throw new BadRequestException(
              'Error Posting To WhatsApp Cloud API',
            );
          }),
        );

      const messageSendingStatus = await lastValueFrom(response);

      return `Image sent successfully, response: ${messageSendingStatus}`;
    } catch (error) {
      this.logger.error(error);
      return 'Axle broke!! Error Sending Image!!';
    }
  }

  async sendMessageByTemplate(messageSender : string, template : any){
    const data = JSON.stringify({
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: messageSender,
      type: 'template',
      template: {
        name: template.name,
        language: { code: 'en' },
        components: template.components
      }
    });

    try {
      const response = this.httpService
        .post(this.url, data, this.configuration)
        .pipe(
          map((res) => {
            return res.data;
          }),
        )
        .pipe(
          catchError((error) => {
            this.logger.error(error);
            throw new BadRequestException(
              'Error Posting To WhatsApp Cloud API',
            );
          }),
        );


      return response;
    } catch (error) {
      this.logger.error(error);
      return 'Axle broke!! Error Sending Image!!';
    }
  }
  async markMessageAsRead(messageID: string) {
    const data = JSON.stringify({
      messaging_product: 'whatsapp',
      status: 'read',
      message_id: messageID,
    });

    try {
      const response = this.httpService
        .post(this.url, data, this.configuration)
        .pipe(
          map((res) => {
            return res.data;
          }),
        )
        .pipe(
          catchError((error) => {
            this.logger.error(error);
            throw new BadRequestException('Error Marking Message As Read');
          }),
        );

      const messageStatus = await lastValueFrom(response);
      this.logger.log('Message Marked As Read. Status:', messageStatus);
    } 
    catch (error) {
      this.logger.error(error);
      return 'Axle broke!! Abort mission!!';
    }
  }
}
