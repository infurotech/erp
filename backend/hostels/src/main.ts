import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    allowedHeaders: ['content-type'],
    origin: process.env.ALLOWED_ORIGIN,
    credentials: true,
  });

  // the next two lines did the trick
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
