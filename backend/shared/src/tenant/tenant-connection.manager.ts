import { Injectable } from "@nestjs/common";
import { DataSource, DataSourceOptions } from "typeorm";
import { TenantRepository } from "./tenant.repository";  // Assuming TenantRepository is used to fetch tenant data

@Injectable()
export class TenantConnectionManager {
  private readonly connections = new Map<string, DataSource>();

  constructor(private readonly tenantRepository: TenantRepository) {} // Injecting the repository to fetch tenant data

  // Function to initialize a connection for a given tenant
  async initConnection(tenantId: string): Promise<void> {
    // Fetch tenant data from the tenant table to get the connection string
    const tenant = await this.tenantRepository.findOne({ where: { id: tenantId } });

    if (!tenant) {
      throw new Error(`Tenant with ID ${tenantId} not found.`);
    }

    // Construct the connection options using the fetched connection string
    const config: DataSourceOptions = {
      type: "postgres", // Database type
      url: tenant.connectionString, // Using the connection string from the tenant table
      synchronize: true, // Automatically synchronize entities (adjust as necessary)
      logging: true,     // Enable logging for debugging
      entities: [],      // Add your tenant-specific entities here
    };

    if (!this.connections.has(tenantId)) {
      const dataSource = new DataSource(config);
      await dataSource.initialize();
      this.connections.set(tenantId, dataSource);
      console.log(`Connection initialized for tenant ${tenantId}`);
    }
  }

  // Function to get the connection for a given tenant
  async getConnection(tenantId: string): Promise<DataSource> {
    let conn = this.connections.get(tenantId);

    // If no connection exists for this tenant, initialize it
    if (!conn) {
      console.log(`No connection found for tenant ${tenantId}. Initializing connection.`);
      await this.initConnection(tenantId);
      conn = this.connections.get(tenantId); // Fetch the initialized connection
    }

    if (!conn) {
      throw new Error(`Connection for tenant ${tenantId} not initialized`);
    }

    return conn;
  }
}
