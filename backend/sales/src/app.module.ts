// // crm/src/app.module.ts
// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { SalesModule } from './sales/sales.module';  // Import SalesModule
// import { TypeOrmModule } from '@nestjs/typeorm';
// import * as dotenv from 'dotenv';

// dotenv.config();  // Ensure environment variables are loaded

// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: process.env.DATABASE_TYPE as 'mysql' | 'postgres' | 'sqlite' | 'mongodb' || 'mysql',
//       host: process.env.DB_HOST || 'localhost',
//       port: Number(process.env.DB_PORT) || 3306,
//       username: process.env.DB_USER || 'root',
//       password: process.env.DB_PASSWORD || 'admin',
//       database: process.env.DB_NAME || 'Host_DB',
//       entities: [__dirname + '/sales/**/entities/*.entity.{ts,js}'],
//       synchronize: true,
//     }),
//     SalesModule,  // Import the SalesModule which has the BullModule for communication with CRM
//   ],
//   controllers: [AppController],  // Your global controllers (if any)
//   providers: [AppService],  // Your global providers (if any)
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SalesModule } from './sales/sales.module';  // Import SalesModule
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [SalesModule, NotificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}