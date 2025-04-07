import { Injectable } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';

@Injectable()
export class TenantService {
  private tenantConnections: Map<string, DataSource> = new Map();
  constructor(private readonly defaultDataSource: DataSource) {}
  async connectTenant(tenantName: string) {
    if (!tenantName) {
      return this.defaultDataSource;
    }
    if (this.tenantConnections.has(tenantName))
      return this.tenantConnections.get(tenantName);

    const [ dbConfig ] = await this.getTenantConfig(tenantName);

    if(process.env.IS_LOCAL) {   
      dbConfig.db_host = process.env.HOST;
      dbConfig.db_port = process.env.PORT;
    }
    
    const dataSource = new DataSource({
      ...this.defaultDataSource.options,
      type: 'postgres', 
      host: dbConfig.db_host,
      port: dbConfig.db_port,
      username: dbConfig.db_login,
      password: dbConfig.db_password,
      database: dbConfig.db_database,
      entityPrefix: dbConfig.db_prefix
    } as DataSourceOptions);
 
    await dataSource.initialize();
    this.tenantConnections.set(tenantName, dataSource);
    return dataSource;
  }

  async getTenantConfig(tenantName: string) {
    return this.defaultDataSource.query(
      `SELECT * FROM tanant WHERE name = ?`,
      [tenantName]
    );
  }
}