import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { databaseProviders } from './database/database.providers';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { RolesGuard } from './modules/auth/role.guard';
import config from './config/config';
import { CoreModule } from './modules/core/core.module';
import { AdminModule } from './modules/admin/admin.module';
import { CrmModule } from './modules/crm/crm.module';
import { SalesModule } from './modules/sales/sales.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { BullModule } from '@nestjs/bullmq';
import { CloudAPIModule } from './modules/plugins/nestjs-whatsapp-cloudapi/whatsapp-cloudapi.module';
import { TwilioModule } from './modules/plugins/nestjs-whatsapp-twilio/whatsapp-twilio.module';
import { NotificationModule } from './modules/marketing/notification/notification.module';

@Module({
  imports: [TypeOrmModule.forRoot(
    {
      type: config.DB.type,
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "root",
      database: "erp_db",
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
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
      ...databaseProviders,
    },
  ],
})
export class AppModule {}
