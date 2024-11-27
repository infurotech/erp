import { Injectable } from '@nestjs/common';
import * as twilio from 'twilio';

@Injectable()
export class SMSNotificationHandler {
  private client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

  async sendSMS(to: string, message: string) {
    await this.client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    });
  }
}
