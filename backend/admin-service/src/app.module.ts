import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config/config';
import { User } from './user/entities/user.entity';
import { UserService } from './user/user.service';

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
  TypeOrmModule.forFeature([User])],
  controllers: [UserService],
})
export class AppModule {}
