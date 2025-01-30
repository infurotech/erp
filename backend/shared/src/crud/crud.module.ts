import { Module } from '@nestjs/common';
import { CrudService } from './crud.service';
import { Repository } from 'typeorm';

@Module({
  imports: [],
  exports: [CrudService],
  providers: [CrudService, Repository ],
  controllers: [],
})
export class CrudModule {}
