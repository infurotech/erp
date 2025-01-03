import { Module, DynamicModule, Provider } from '@nestjs/common';
import { TwilioService } from './whatsapp-twilio.service'
import { TwilioConfig } from './interface/notifications';

@Module({})
export class TwilioModule {
  static register(config: TwilioConfig): DynamicModule {
    const configProvider: Provider = {
          provide: 'TWILIO_CONFIG',
          useValue: config,
      };
    
    return {
      module: TwilioModule,
      providers: [
        configProvider,
        TwilioService
      ],
      exports: [TwilioService],
    };
  }
}
