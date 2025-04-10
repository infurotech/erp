import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { Tenant } from 'src/auth/entities/tenant.entity';
import { User } from 'src/auth/entities/user.entity';
import { Edition } from 'src/auth/entities/edition.entity';
dotenv.config();

export const publicConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT!,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,  // This is your public DB
  entities: [Tenant,User,Edition],
  migrations: [__dirname + '/../modules/public/migrations/*{.ts,.js}'],
  synchronize: false,
};
