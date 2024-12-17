import { Module } from '@nestjs/common';
import { StorageModule } from './storage/storage.module';
import { CrudModule } from './crud/crud.module';

@Module({
  imports: [StorageModule, CrudModule]
})
export class CoreModule {}
