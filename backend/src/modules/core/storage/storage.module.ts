import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';
import { StorageConfig } from './storage.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [StorageConfig],
    }),
  ],
  controllers: [StorageController],
  providers: [StorageService],
})
export class StorageModule {}
