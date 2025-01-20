import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config/config';
import { CustomerController } from './controllers/customer.controller';
import { UserController } from './controllers/user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { VehicleController } from './controllers/vehicle.controller';
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
    ClientsModule.register([
      {
        name: 'CRUD_PACKAGE',
        transport: Transport.TCP,
        options: {
          port: 3090,
        },
      },
      {
        name: 'USER_PACKAGE',
        transport: Transport.TCP,
        options: {
          port: 3070,
        },
      }
    ])
  ],
  controllers: [AppController,CustomerController,VehicleController,UserController],
  providers: [ AppService ],
})
export class AppModule { }
