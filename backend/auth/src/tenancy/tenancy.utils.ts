import { DataSource, DataSourceOptions } from "typeorm";
import { tenantConfig } from "./tenant-orm.config";  // Tenant DB config
import { publicConfig } from "./public-orm.config";  // Public DB config
import { Tenant } from "src/auth/entities/tenant.entity";
const MAX_CONNECTION_POOL_SIZE = process.env.MAX_CONNECTION_POOL_SIZE;
export const tenantConnections: { [connectionName: string]: DataSource } = {};

export async function getTenantConnection(tenantId: string): Promise<DataSource> {
  const connectionName = `tenant_${tenantId}`;
  
  // Check if the connection already exists in the cache
  if (tenantConnections[connectionName]) {
    return tenantConnections[connectionName];
  }

  // 1. Fetch the tenant's database name from the public database
  let databaseName: string;
  try {
    // Create a new DataSource instance for the public database
    const publicDataSource = new DataSource(publicConfig);
    await publicDataSource.initialize();  // Initialize the connection to the public database

    // Use a query runner to query the public database's tenant table
    const queryRunner = publicDataSource.createQueryRunner();
    const tenant = await queryRunner.manager.findOne<Tenant>('Tenant', {
      where: { id: tenantId },
    });
 
    if (!tenant) {
      throw new Error(`Tenant with ID ${tenantId} not found`);
    }else{

        databaseName = tenant.name;  // Assuming the field in the tenant table is `databaseName`
    }
    console.log("tenant",tenant);

  } catch (error) {
    console.error("Error fetching tenant details:", error);
    throw new Error("Unable to fetch tenant database information.");
  }

  // 2. Create a new DataSource for the tenant's specific database
  const tenantDataSource = new DataSource({
    ...tenantConfig,  // Use the shared tenant config
    name: connectionName,  // Use the unique connection name for this tenant
    database: databaseName,  // Set the database name fetched from the public database
    extra: {
      max: MAX_CONNECTION_POOL_SIZE,  // Set the connection pool size
    },
  } as DataSourceOptions);
  try {
      await tenantDataSource.initialize();
      console.log("tenantDataSource",tenantDataSource);
  } catch (error) {
    console.error("Error initializing tenant database connection:", error);
    throw new Error("Unable to initialize tenant database connection.");
  }

  // 4. Cache the connection for reuse
  tenantConnections[connectionName] = tenantDataSource;

  return tenantDataSource;
}
