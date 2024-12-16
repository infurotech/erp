import { Module, DynamicModule, Global } from '@nestjs/common';
import { GeneralService } from './general.service';

@Global()
@Module({})
export class GeneralModule {
  static forRepository<T>(repository: any): DynamicModule {
    return {
      module: GeneralModule,
      providers: [
        {
          provide: 'REPOSITORY',
          useValue: repository,
        },
        GeneralService,
      ],
      exports: [GeneralService],
    };
  }
}
