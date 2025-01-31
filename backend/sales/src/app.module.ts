import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SalesModule } from './sales/sales.module';
import { DatabaseService } from '@shared/database';

@Module({
  imports: [SalesModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
