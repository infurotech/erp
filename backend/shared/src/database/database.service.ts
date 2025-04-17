import { Injectable, Scope, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource, EntityTarget, Repository } from 'typeorm';
import * as crypto from 'crypto';
import { CachingManager } from '../caching/caching.manager';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable({ scope: Scope.DEFAULT })
export class DatabaseService {

  private configService: ConfigService;
  private cachingManager: CachingManager;

  constructor(@InjectDataSource() private readonly defaultDataSource: DataSource) { 
    this.configService = new ConfigService(); 
    // this.cachingManager = new CachingManager(new Cache());
  }

  private async decryptConnectionString(encryptedString: string): Promise<string> {
    const secretKey = this.configService.get<string>('ENCRYPTION_SECRET') || '';
    const iv = Buffer.alloc(16, 0);
    const decipher = crypto.createDecipheriv('aes-256-cbc', secretKey,iv);
    let decrypted = decipher.update(encryptedString, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  private async fetchConnectionString(tenantId: string): Promise<string> {
    const cacheKey = `db-conn-${tenantId}`;
    
    // const cachedConn = await this.cachingManager.get<string>(cacheKey);
    // if (cachedConn) return cachedConn;
    const tenantRepo: Repository<any> = this.defaultDataSource.getRepository('tenant');

    // const allTenants = await tenantRepo.find();
    // console.log('📋 Total tenants in DB:', allTenants);

    const tenant = await tenantRepo.findOne({ where: {id: tenantId } });
    console.log("tenant",tenant)
    if (!tenant || !tenant.connectionString) {
      throw new UnauthorizedException('Tenant database configuration not found.');
    }

    const decryptedConn = await this.decryptConnectionString(tenant.encryptedConnection);
    // await this.cachingManager.set(cacheKey, decryptedConn, { ttl: 600 }); // Cache for 10 min
    return decryptedConn;
  }

  private async getTenantConnection(tenantId: string): Promise<DataSource> {
    const connectionString = await this.fetchConnectionString(tenantId);
    return new DataSource({
      type: 'postgres',
      url: connectionString,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: false,
    }).initialize();
  }

  async getRepository<T>(tenantId: string, entity: EntityTarget<T>): Promise<Repository<T>> {
    const connection = await this.getTenantConnection(tenantId);
    return connection.getRepository<T>(entity);
  }
}