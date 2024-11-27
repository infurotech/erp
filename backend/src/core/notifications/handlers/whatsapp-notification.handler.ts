import { Injectable } from '@nestjs/common';
import * as twilio from 'twilio';

@Injectable()
export class WhatsAppNotificationHandler {
  private client: twilio.Twilio;

  constructor() {
    this.client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
  }

  async sendWhatsAppMessage(to: string, message: string) {
    try {
      await this.client.messages.create({
        body: message,
        from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
        to: `whatsapp:${to}`,
      });
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
    }
  }
}
