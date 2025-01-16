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
        transport: Transport.GRPC,
        options: {
          url: '127.0.0.1:3090',
          package: ['customer','vehicle'],
          protoPath: [
            join(__dirname, '../../shared/proto/customer.proto'),
            join(__dirname, '../../shared/proto/vehicle.proto')
          ],
        },
      },
      {
        name: 'USER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: '127.0.0.1:3070',
          package: 'user',
          protoPath: join(__dirname, '../../shared/proto/user.proto'),
        },
      }
    ])
  ],
  controllers: [AppController,CustomerController,VehicleController,UserController],
  providers: [ AppService ],
})
export class AppModule { }
