import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as twilio from 'twilio';
import { TwilioConfig } from './interface/notifications';
@Injectable()
export class TwilioService {
  private client: twilio.Twilio;
  constructor(@Inject('TWILIO_CONFIG') private readonly config: TwilioConfig) {

    const { TWILIO_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_NUMBER } = this.config;
    if (!TWILIO_SID || !TWILIO_AUTH_TOKEN || !TWILIO_WHATSAPP_NUMBER) {
      throw new HttpException(
        { status: HttpStatus.PARTIAL_CONTENT, error: 'An error occured' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    this.client = twilio(TWILIO_SID, TWILIO_AUTH_TOKEN);
  }
  async sendMessage(payload) {
    const { TWILIO_WHATSAPP_NUMBER } = this.config;
    if (!payload.body || !payload.to) {
      throw new HttpException(
        { status: HttpStatus.PARTIAL_CONTENT, error: 'Missing credentials' },
        HttpStatus.PARTIAL_CONTENT,
      );
    }
    try {
      const result = await this.client.messages.create({
        to: `whatsapp:${payload.to}`,
        from: `whatsapp:${TWILIO_WHATSAPP_NUMBER}`,
        body: payload.body,
      });
      return result;
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.INTERNAL_SERVER_ERROR, error: 'An error occured' },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }
}
