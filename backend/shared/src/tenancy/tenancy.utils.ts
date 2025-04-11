import { DataSource, DataSourceOptions } from "typeorm";
import { tenantConfig } from "./tenant-orm.config";  // Tenant DB config
import { publicConfig } from "./public-orm.config";  // Public DB config
import { Tenant } from '../entities/tenant.entity';
import * as crypto from 'crypto';
import * as dotenv from 'dotenv';
dotenv.config();
const MAX_CONNECTION_POOL_SIZE = process.env.MAX_CONNECTION_POOL_SIZE;
export const tenantConnections: { [connectionName: string]: DataSource } = {};

export async function getTenantConnection(tenantId: string): Promise<DataSource> {
  const connectionName = `tenant_${tenantId}`;
  
  // Check if the connection already exists in the cache
  if (tenantConnections[connectionName]) {
    return tenantConnections[connectionName];
  }

  let connectionUrl: string;
  try {
    // Create a new DataSource instance for the public database
    const publicDataSource = new DataSource(publicConfig);
    await publicDataSource.initialize();  // Initialize the connection to the public database

    // Use a query runner to query the public database's tenant table
    const tenant = await publicDataSource.getRepository(Tenant).findOneBy({
      id: tenantId  // This directly matches the `id` column in the Tenant table
    });
 
    if (!tenant) {
      throw new Error(`Tenant with ID ${tenantId} not found`);
    }else{
      connectionUrl = tenant.connectionString;
    }
    // console.log("connectionUrl before",connectionUrl)
    // connectionUrl = decrypt(connectionUrl); // Decrypt it here
    //  console.log("connectionUrl after",connectionUrl)
  } catch (error) {
    console.error("Error fetching tenant details:", error);
    throw new Error("Unable to fetch tenant database information.");
  }
  // 2. Create a new DataSource for the tenant's specific database
  const tenantDataSource = new DataSource({
    ...tenantConfig,  // Use the shared tenant config
    name: connectionName,  // Use the unique connection name for this tenant
    url: connectionUrl, 
    extra: {
      max: MAX_CONNECTION_POOL_SIZE,  
    },
  } as DataSourceOptions);
  try {
      await tenantDataSource.initialize();
  } catch (error) {
    console.error("Error initializing tenant database connection:", error);
    throw new Error("Unable to initialize tenant database connection.");
  }
  // 4. Cache the connection for reuse
  tenantConnections[connectionName] = tenantDataSource;

  return tenantDataSource;
}


export function decrypt(text: string): string {
  const algorithm = 'aes-256-cbc';
  console.log("process.env.ENCRYPTION_SECRET",process.env.ENCRYPTION_SECRET);
  const key = crypto.scryptSync(process.env.ENCRYPTION_SECRET, 'salt', 32);
  const iv = Buffer.alloc(16, 0); // Initialization vector (can be random or static for simplicity)

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(text, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}