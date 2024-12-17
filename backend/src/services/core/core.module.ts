import { Module } from '@nestjs/common';
import { CoreService } from './core.service';


@Module({
  imports: [],
  exports: [CoreService],
  providers: [CoreService],
  controllers: [],
})
export class CoreModule {}
