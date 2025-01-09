import { Injectable, Scope } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TenantManager } from './tenant.manager';

@Injectable({ scope: Scope.REQUEST })
export class TenantTypeOrmProvider {
  private dataSource: DataSource;

  constructor(private readonly tenantManager: TenantManager) {}

  async getDataSource(tenantId: string): Promise<DataSource> {
    if (this.dataSource) {
      return this.dataSource;
    }

    const connectionString = await this.tenantManager.getConnectionString(tenantId);
    const dataSourceOptions: DataSourceOptions = {
      type: 'postgres',
      url: connectionString,
      entities: [__dirname + '/entities/*.entity{.ts,.js}'], // Adjust entity path
      synchronize: true,
    };

    this.dataSource = new DataSource(dataSourceOptions);
    await this.dataSource.initialize();
    return this.dataSource;
  }
}
