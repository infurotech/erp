import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config/config';
import { CrmModule } from './crm/crm.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(
    {
      type: config.DB.type,
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "root",
      database: "erp_db",
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true
    }
  ),
   CrmModule],
})
export class AppModule {}
