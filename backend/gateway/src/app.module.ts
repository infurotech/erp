import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { databaseProviders } from './database/database.providers';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CoreModule } from './modules/core/core.module';
import { AdminModule } from './modules/admin/admin.module';
import { SalesModule } from './modules/sales/sales.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { RolesGuard } from './modules/auth/role.guard';
import config from './config/config';

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
    }
  ),
  AuthModule, CoreModule, AdminModule, SalesModule, InventoryModule ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
      ...databaseProviders
    },
  ],
})
export class AppModule { }
