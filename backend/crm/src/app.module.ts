import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    DatabaseModule.forRoot('your_jwt_secret'), // Use same secret across services
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
