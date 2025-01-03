import { Module, DynamicModule, Provider } from '@nestjs/common';
import { CloudAPIService } from './whatsapp-cloudapi.service';
import { CloudAPIController } from './whatsapp-cloudapi.controller';
import { CloudAPIConfig } from './interface/notifications';
import { WhatsappSendMessage } from './whatsapp-send-message';

@Module({})
export class CloudAPIModule {
  static register(config: CloudAPIConfig): DynamicModule {
    const configProvider: Provider = {
      provide: 'CONFIG',
      useValue: config,
    };

    return {
      module: CloudAPIModule,
      controllers: [CloudAPIController],
      providers: [configProvider, CloudAPIService, WhatsappSendMessage],
      exports: [CloudAPIService, WhatsappSendMessage],
    };
  }
}

