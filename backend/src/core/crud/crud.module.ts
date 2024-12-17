import { Module } from '@nestjs/common';
import { CrudService } from './crud.service';

@Module({
  imports: [],
  exports: [CrudService],
  providers: [CrudService],
  controllers: [],
})
export class CrudModule {}
