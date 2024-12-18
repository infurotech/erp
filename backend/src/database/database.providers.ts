import { DataSource } from 'typeorm';
import config from '../config/config';
import { Customer } from 'src/modules/crm/customer/entities/customer.entity';
import { Vehicle } from 'src/modules/crm/vehicle/entities/vehicle.entity';
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
        entities: [Customer,Vehicle],

        synchronize: false
      });
    console.log("Database connected",config.DB.type)
      return dataSource.initialize();
    },
  },
];