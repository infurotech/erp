import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './services/customer/customer.module';
import { Customer } from './services/customer/entities/customer.entity';
import { ProductModule } from './services/product/product.module';
import { JobModule } from './services/job/job.module';
import { JobItemModule } from './services/job-item/job-item.module';
import { VehicleModule } from './services/vehicle/vehicle.module';
import { UserModule } from './services/user/user.module';
import { RolesGuard } from './auth/role.guard';
import { Product } from './services/product/entities/product.entity';
import { Job } from './services/job/entities/job.entity';
import { JobItem } from './services/job-item/entities/job-item.entity';
import { Vehicle } from './services/vehicle/entities/vehicle.entity';
import { User } from './services/user/entities/user.entity';
import { ScheduleModule } from './services/schedule/schedule.module';
import config from './config/config';
import { DocumentModule } from './services/document/document.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [TypeOrmModule.forRoot(
    {
      type: config.DB.type,
      host: config.DB.host,
      port: config.DB.port,
      username: config.DB.username,
      password: config.DB.password,
      database: config.DB.database,
      entities: [
        Customer,
        Product,
        Job,
        JobItem,
        Vehicle,
        User
      ],
      synchronize: config.DB.synchronize
    }
  ),
  CoreModule, CustomerModule, ProductModule, JobModule, JobItemModule, VehicleModule, UserModule, ScheduleModule, AuthModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },],
})
export class AppModule { }
