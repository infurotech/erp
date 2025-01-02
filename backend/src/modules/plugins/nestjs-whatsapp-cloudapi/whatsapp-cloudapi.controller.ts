import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Post,
  Req,
} from '@nestjs/common';
import { CloudAPIService } from './whatsapp-cloudapi.service';
import { Request } from 'express';
import { CloudAPIConfig } from './interface/notifications';

@Controller('whatsapp')
export class CloudAPIController {
  constructor(
    private whatsappService: CloudAPIService,
    @Inject('CONFIG') private readonly config: CloudAPIConfig,
  ) {}
  //Custom Whatsapp notification service using their cloud api.
  @Get('webhook')
  whatsappVerify(@Req() request: Request) {
    const mode = request.query['hub.mode'];
    const challenge = request.query['hub.challenge'];
    const token = request.query['hub.verify_token'];

    const verificationToken = this.config.VERIFICATION_TOKEN;

    if (!mode && !token) {
      return 'Error verifying token';
    }
    if (mode == 'subscribe' && token == verificationToken) {
      return challenge?.toString();
    }
  }
  /*
  Purely for responding to user
  @Post('webhook')
  @HttpCode(200)
  async sendProactiveMessage(
    @Body() request:any,
  ): Promise<void> {
    const { messages } = request;
    if (!messages) return;
    let response;
    messages.forEach(async(message)=>{
      const messageSender = message.from;
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
              caption
            );
          break;
        
        case 'template' :
          const template = message.template;
           response = await this.whatsappService.sendMessageByTemplate(
            messageSender,
            template
           )
      }
    })
    return response;
  }
  */
}
