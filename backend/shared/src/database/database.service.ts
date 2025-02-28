import { Injectable, Scope, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DataSource, DataSourceOptions, Repository } from "typeorm";
import * as crypto from "crypto";
import { CachingManager } from "../caching/caching.manager";
import { JwtService } from "@nestjs/jwt";
import { InjectDataSource } from "@nestjs/typeorm";

@Injectable({ scope: Scope.REQUEST })
export class DatabaseService {
  private configService: ConfigService;
  private cachingManager: CachingManager;
  private jwtService: JwtService;
  private tenantConnections: Map<string, DataSource>;
  constructor(private readonly defaultDataSource: DataSource) {
    this.tenantConnections = new Map(); 
    this.configService = new ConfigService();
    this.jwtService = new JwtService();
    // this.cachingManager = new CachingManager(new Cache());
  }
  async doesDatabaseExist(tenantTableName: string): Promise<boolean> {
    // Query to check if DB exists (modify based on your DB type)
    const query = `SELECT schema_name FROM information_schema.schemata WHERE schema_name = ? `;
    const result = await this.defaultDataSource.query(query,[tenantTableName]);
    return result.length > 0;
  }

  async createTenantDatabase(dbOptions: any) {
    let dbConnection: DataSourceOptions = dbOptions as DataSourceOptions;
    // if (!dbOptions) {
    //   [{ dbConnection }] = await this.defaultDataSource.query(
    //     `SELECT * FROM tenants WHERE tenantId = '${tenantId}' LIMIT 1`
    //   );
    // }

    const tempDataSource = new DataSource({
      ...this.defaultDataSource.options,
      ...dbConnection,
      database:'mysql',
    } as DataSourceOptions);

    await tempDataSource.initialize();

    await tempDataSource.query(
      `CREATE DATABASE IF NOT EXISTS ${dbConnection.database}`
    );
    await tempDataSource.destroy();
    //     await this.defaultDataSource.query(
    //       `USE Tenant_${tenantId};
    // `
    //     );
    //     await this.defaultDataSource.query(`
    //       CREATE TABLE Job (
    //     id INT AUTO_INCREMENT PRIMARY KEY,
    //     number VARCHAR(255) NOT NULL,
    //     date VARCHAR(255) NOT NULL,
    //     status VARCHAR(255) NOT NULL
    // );`);
    //     await this.defaultDataSource.query(
    //       `CREATE TABLE AuditLogs (
    //     id INT AUTO_INCREMENT PRIMARY KEY,
    //     entity VARCHAR(255) NOT NULL,
    //     entityId VARCHAR(255) NOT NULL,
    //     "before" JSON NOT NULL,
    //     "after" JSON NOT NULL,
    //     action ENUM('CREATED', 'MODIFIED', 'REMOVED') NOT NULL,
    //     actor VARCHAR(255) NULL,
    //     userIp VARCHAR(255) NULL
    // );`
    //     );
  }

  async bindTenantDatabase(tenantId: string, dbOptions:any): Promise<void> {
    if (this.tenantConnections.has(dbOptions.label)) return;
    let dbConnection: DataSourceOptions = dbOptions as DataSourceOptions;
    // if (!dbOptions) {
    //   [{ dbConnection }] = await this.defaultDataSource.query(
    //     `SELECT * FROM tenants WHERE tenantId = '${tenantId}' LIMIT 1`
    //   );
    // }
    const tenantDataSource = new DataSource({
      ...this.defaultDataSource.options,
      ...dbConnection, // Override database name
    } as DataSourceOptions);

    await tenantDataSource.initialize();
    this.tenantConnections.set(dbOptions.label, tenantDataSource);
    console.log("tenantConnectionsSet",this.tenantConnections)
  }

  getTenantConnection(tenantTableName: string): DataSource {
    console.log("tenantConnections", this.tenantConnections,tenantTableName)
    return (
      this.tenantConnections.get(tenantTableName) || this.defaultDataSource
    );
  }

  private async decryptConnectionString(
    encryptedString: string
  ): Promise<string> {
    const secretKey = this.configService.get<string>("ENCRYPTION_SECRET") || "";
    const iv = Buffer.alloc(16, 0);
    const decipher = crypto.createDecipheriv("aes-256-cbc", secretKey, iv);
    let decrypted = decipher.update(encryptedString, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  }

  private async fetchConnectionString(tenantId: string): Promise<string> {
    const cacheKey = `db-conn-${tenantId}`;

    // const cachedConn = await this.cachingManager.get<string>(cacheKey);
    // if (cachedConn) return cachedConn;
    const tenantRepo: Repository<any> =
      this.defaultDataSource.getRepository("tenants");

    const allTenants = await tenantRepo.find();
    console.log("📋 Total tenants in DB:", allTenants);

    const tenant = await tenantRepo.findOne({ where: { tenantId } });
    console.log("tenant", tenant);
    if (!tenant || !tenant.encryptedConnection) {
      throw new UnauthorizedException(
        "Tenant database configuration not found."
      );
    }

    const decryptedConn = await this.decryptConnectionString(
      tenant.encryptedConnection
    );
    // await this.cachingManager.set(cacheKey, decryptedConn, { ttl: 600 }); // Cache for 10 min
    return decryptedConn;
  }

  // async getTenantConnection(token: string): Promise<DataSource> {
  //   const jwtSecret = this.configService.get<string>(process.env.SECURITY_KEY, 'default_secret');
  //   // const decoded: any = this.jwtService.verify(
  //   //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjE4MjI1IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6InR6dWF0ZGVtb3NhY2Nvc0BkZXYud2FrYW5kaS5jb20iLCJBc3BOZXQuSWRlbnRpdHkuU2VjdXJpdHlTdGFtcCI6ImFmOTc5ZDBiLTJmMzctMzE5OS02YzMzLTNhMTEyNDQxZWUwYiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6WyJDbGllbnQiLCJBY2NvdW50YW50IiwiQWRtaW4iLCJBdWRpdG9yIiwiQm9hcmRNZW1iZXIiLCJCb2FyZE1lbWJlclJlcHJlc2VudGF0aXZlIiwiQ2xpZW50TWFuYWdlciIsIkNyZWRpdENvbW1pdHRlZSIsIkNyZWRpdE9mZmljZXIiLCJHZW5lcmFsTWFuYWdlciIsIkxvYW5PZmZpY2VyIiwiTmV3IFJvbGUiLCJTdXBwb3J0IiwiVGVsbGVyIl0sImh0dHA6Ly93d3cuYXNwbmV0Ym9pbGVycGxhdGUuY29tL2lkZW50aXR5L2NsYWltcy90ZW5hbnRJZCI6IjQwMCIsInN1YiI6IjE4MjI1IiwianRpIjoiODY3OTViYmMtY2ZjZC00YjA4LWIwZTMtMmYwMzk3ZmI1NjVhIiwiaWF0IjoxNzM4NTU2MTkxLCJlbWFpbCI6InR6dWF0ZGVtb3NhY2Nvc0BkZXYud2FrYW5kaS5jb20iLCJzYWNjb3NfZW1haWwiOiJ0enVhdGRlbW9zYWNjb3NAZGV2Lndha2FuZGkuY29tIiwic2FjY29zX25hbWUiOiJUWlVBVERlbW9TYWNjb3MiLCJzYWNjb3NfaWQiOiIxMDE2NzAiLCJXQUsiOiJXQkE6QSIsIkNBTSI6IkNBUzpTLENSUzpTLENNUzpTIiwibW9kdWxlVHlwZSI6IlNhY2NvcyIsIm5iZiI6MTczODU1NjE5MSwiZXhwIjoxNzM4NTU5NzkxLCJpc3MiOiJ3YWthbmRpLmNvbSIsImF1ZCI6ImNhbXMifQ.sT08VUpqk3d2lEEGsHr5HzPS5P455pSbtRcXHDo-nC0', {
  //   //     publicKey: this.tokenValidator.securityKey,
  //   //     audience:  this.tokenValidator.audience,
  //   //     algorithms: ['HS256'] ,
  //   //     issuer:    this.tokenValidator.issuer
  //   //   });
  //   //
  //   const tenantId = '101';
  //   if (!tenantId) throw new UnauthorizedException('Invalid token: Missing tenantId');
  //   const connectionString = await this.fetchConnectionString(tenantId);

  //   return new DataSource({
  //     type: 'mysql',
  //     url: connectionString,
  //     entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  //     synchronize: false,
  //   }).initialize();
  // }

  async getRepository<T>(token: string, entity: any): Promise<Repository<T>> {
    const connection = await this.getTenantConnection(token);
    return connection.getRepository<T>(entity);
  }

  getDefaultRepository<T>(entity: any): Repository<T> {
    var connection = new DataSource(entity.dataSource.options);
    if (!connection.isInitialized) {
      console.error("DataSource is not initialized!");
      connection.initialize();
    }

    return connection.getRepository<T>(entity);
  }
}
