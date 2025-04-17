import { Module } from '@nestjs/common';
import { CrudService } from './crud.service';
import { Repository } from 'typeorm';
import { DatabaseService } from 'src/database';

@Module({
  imports: [],
  exports: [CrudService],
  providers: [CrudService, Repository ,DatabaseService],
  controllers: [],
})
export class CrudModule {}