import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { join} from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: ['customer','vehicle'],
      protoPath: [
        join(__dirname, '../../shared/proto/customer.proto'),
        join(__dirname, '../../shared/proto/vehicle.proto')
      ],
      url: '127.0.0.1:3090',
    },
  });
  app.listen();
}
bootstrap();