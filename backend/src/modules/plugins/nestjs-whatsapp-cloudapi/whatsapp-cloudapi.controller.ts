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
}
