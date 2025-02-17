import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import { PropertyDataModule } from './properties/properties.module';
// import { StorageModule } from '@infuro/shared/storage/storage.module';
import { StorageModule } from '../../shared/dist/storage/storage.module';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret007',
      signOptions: { expiresIn: '1h' },
    }),
    PropertyDataModule, StorageModule
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}