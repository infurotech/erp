import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenantModule } from './tenant/tenant.module';
@Module({
  imports: [TenantModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
