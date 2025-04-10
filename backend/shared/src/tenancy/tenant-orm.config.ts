import { DataSourceOptions } from "typeorm";
import * as dotenv from 'dotenv';

import { Tenant } from '../entities/tenant.entity';
import { User } from '../entities/user.entity';
import { Edition } from '../entities/edition.entity';
dotenv.config();
export const publicConfig: DataSourceOptions = {
    
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT! ,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Tenant,User,Edition],
    migrations: [__dirname + '/../modules/public/migrations/*{.ts,.js}'],
    synchronize: false,
  };
  
  // tenant-orm.config.ts
  export const tenantConfig: DataSourceOptions = {
    ...publicConfig,
    entities:  [Tenant,User,Edition],
    migrations: [__dirname + '/../modules/tenant/migrations/*{.ts,.js}'],
  };