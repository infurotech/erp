import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SalesModule } from './sales/sales.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: process.env.DATABASE_TYPE as 'mysql' | 'postgres' | 'sqlite' | 'mongodb' || 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'admin',
    database: process.env.DB_NAME || 'Host_DB',
    entities: [__dirname + '/**/*.entity.{js,ts}'],
    synchronize: true
}),SalesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
