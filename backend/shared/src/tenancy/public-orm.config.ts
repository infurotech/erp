import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const publicConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT!,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,  // This is your public DB
  entities: [__dirname + '/../entities/*.entity.{ts,js}'],
  migrations: [__dirname + '/../modules/public/migrations/*{.ts,.js}'],
  synchronize: false,
};

 export const tenantConfig: DataSourceOptions = {
    ...publicConfig,
    entities:  [__dirname + '/../entities/*.entity.{ts,js}'],
    migrations: [__dirname + '/../modules/tenant/migrations/*{.ts,.js}'],
  };