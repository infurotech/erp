import { DataSource, DataSourceOptions } from "typeorm";
import { tenantConfig,publicConfig } from "./public-orm.config";  // Tenant DB config
import { Tenant } from '../entities/tenant.entity';
import * as crypto from 'crypto';
import * as dotenv from 'dotenv';
import { CachingManager } from "src/caching/caching.manager";

dotenv.config();
const MAX_CONNECTION_POOL_SIZE = process.env.MAX_CONNECTION_POOL_SIZE;
export const tenantConnections: { [connectionName: string]: DataSource } = {};


export async function getTenantConnection(tenantId: string, cache: CachingManager): Promise<DataSource> {
  const connectionName = `tenant_${tenantId}`;
  console.log(`[getTenantConnection] Invoked for: ${connectionName}`);

  console.log(`[getTenantConnection] Cache manager initialized`);

  const cachedConnectionUrl = await cache.get<string>(connectionName);
  // console.log(`[getTenantConnection] Cache lookup for ${connectionName}:`, !!cachedConnection);
  console.log("cachedConnectionUrl",cachedConnectionUrl);
  if (cachedConnectionUrl) {
    console.log(`[getTenantConnection] Found cached connection URL`);
    const tenantDataSource = new DataSource({
      ...tenantConfig,
      name: connectionName,
      url: cachedConnectionUrl,
      extra: { max: MAX_CONNECTION_POOL_SIZE },
    } as DataSourceOptions);
  
    await tenantDataSource.initialize();
    console.log(`[getTenantConnection] Recreated DB from cached URL`);
    return tenantDataSource;
  }

  let connectionUrl: string;
  try {
    const publicDataSource = new DataSource(publicConfig);
    await publicDataSource.initialize();
    console.log(`[getTenantConnection] Public DB connected`);

    const tenant = await publicDataSource.getRepository(Tenant).findOneBy({ id: tenantId });

    if (!tenant) {
      throw new Error(`Tenant with ID ${tenantId} not found`);
    }

    connectionUrl = tenant.connectionString;
    connectionUrl = decrypt(connectionUrl); // Optional decryption
    console.log(`[getTenantConnection] Got connection string`);
  } catch (error) {
    console.error("Error fetching tenant details:", error);
    throw new Error("Unable to fetch tenant database information.");
  }

  const tenantDataSource = new DataSource({
    ...tenantConfig,
    name: connectionName,
    url: connectionUrl,
    extra: { max: MAX_CONNECTION_POOL_SIZE },
  } as DataSourceOptions);

  try {
    await tenantDataSource.initialize();
    console.log(`[getTenantConnection] Tenant DB initialized`);
    await cache.set(connectionName, connectionUrl, 3600);
    console.log(`[getTenantConnection] Connection cached`);
  } catch (error) {
    console.error("Error initializing tenant database connection:", error);
    throw new Error("Unable to initialize tenant database connection.");
  }

  return tenantDataSource;
}

export function decrypt(encryptedText: string): string {
  const algorithm = 'aes-256-cbc';
  const secret = process.env.ENCRYPTION_SECRET || 'supersecretkey123';
  const key = crypto.scryptSync(secret, 'salt', 32);
 
  const [ivBase64, encryptedDataBase64] = encryptedText.split(':');
 
  const iv = Buffer.from(ivBase64, 'base64');
 
  try {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
 
    // Pass strings with proper encodings
    let decrypted = decipher.update(encryptedDataBase64, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
 
    return decrypted;
  } catch (err) {
    console.error('Error during decryption:', err.message);
    throw new Error('Decryption failed.');
  }
}
 
 