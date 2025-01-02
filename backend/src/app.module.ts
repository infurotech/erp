import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { databaseProviders } from './databaseass/database.providers';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { RolesGuard } from './modules/auth/role.guard';
import config from './config/config';
import { User } from './modules/auth/entities/user.entity';
import { Customer } from './modules/crm/customer/entities/customer.entity';
import { CoreModule } from './modules/core/core.module';
import { AdminModule } from './modules/admin/admin.module';
import { CrmModule } from './modules/crm/crm.module';
import { SalesModule } from './modules/sales/sales.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { BullModule } from '@nestjs/bullmq';
import { NotificationModule } from './modules/marketing/notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(
    {
      type: config.DB.type,
      host: config.DB.host,
      port: config.DB.port,
      username: config.DB.username,
      password: config.DB.password,
      database: config.DB.database,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }
  ),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT as unknown as number,
      },
    }),
    AuthModule,
    CoreModule,
    AdminModule,
    CrmModule,
    SalesModule,
    InventoryModule,
    NotificationModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
      ...databaseProviders
    },],
      ...databaseProviders,
    }
)
export class AppModule {}
