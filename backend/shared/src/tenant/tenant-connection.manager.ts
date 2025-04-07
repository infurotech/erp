import { Injectable } from "@nestjs/common";
import { DataSource, DataSourceOptions } from "typeorm";

@Injectable()
export class TenantConnectionManager {
  private readonly connections = new Map<string, DataSource>();

  async initConnection(tenantId: string, config: DataSourceOptions): Promise<void> {
    if (!this.connections.has(tenantId)) {
      const dataSource = new DataSource({ ...config, name: tenantId });
      await dataSource.initialize();
      this.connections.set(tenantId, dataSource);
    }
  }

  getConnection(tenantId: string): DataSource {
    const conn = this.connections.get(tenantId);
    if (!conn) {
      throw new Error(`Connection for tenant ${tenantId} not initialized`);
    }
    return conn;
  }
}
