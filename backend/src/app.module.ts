import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { databaseProviders } from './databaseass/database.providers';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/core/auth/auth.module';
import { RolesGuard } from './modules/core/auth/role.guard';
import config from './config/config';
import { CoreModule } from './modules/core/core.module';
import { AdminModule } from './modules/admin/admin.module';
import { CrmModule } from './modules/crm/crm.module';
import { SalesModule } from './modules/sales/sales.module';
import { InventoryModule } from './modules/inventory/inventory.module';

@Module({
  imports: [TypeOrmModule.forRoot(
    {
      type: config.DB.type,
      host: config.DB.host,
      port: config.DB.port,
      username: config.DB.username,
      password: config.DB.password,
      database: config.DB.database,
      entities: [__dirname + '/**/*.host.entity{.ts,.js}'],
      synchronize: true
    }
  ),
  AuthModule, CoreModule, AdminModule, CrmModule, SalesModule, InventoryModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
      //...databaseProviders
    },],
})
export class AppModule { }
