import { DataSource } from 'typeorm';
import config from '../config/config';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: config.DB.type,
        host: config.DB.host,
        port: config.DB.port,
        username: config.DB.username,
        password: config.DB.password,
        database: config.DB.database,
        entities: [
            __dirname + '/../services/**/entities/*.entity{.ts,.js}',
        ],
        synchronize: config.DB.synchronize,
      });

      return dataSource.initialize();
    },
  },
];