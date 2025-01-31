import { Injectable, Scope, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, ObjectLiteral, Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { CachingManager } from '../caching/caching.manager';

@Injectable({ scope: Scope.REQUEST })
export class DatabaseService {
  constructor(
    private configService: ConfigService,
    @InjectDataSource() private readonly defaultDataSource: DataSource,
    private readonly cachingManager: CachingManager
  ) {}

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
    
    const cachedConn = await this.cachingManager.get<string>(cacheKey);
    if (cachedConn) return cachedConn;

    const tenantRepo: Repository<any> = this.defaultDataSource.getRepository('tenants');
    const tenant = await tenantRepo.findOne({ where: { tenantId } });

    if (!tenant || !tenant.encryptedConnection) {
      throw new UnauthorizedException('Tenant database configuration not found.');
    }

    const decryptedConn = await this.decryptConnectionString(tenant.encryptedConnection);
    await this.cachingManager.set(cacheKey, decryptedConn, { ttl: 600 }); // Cache for 10 min
    return decryptedConn;
  }

  async getTenantConnection(token: string): Promise<DataSource> {
    const jwtSecret = this.configService.get<string>('JWT_SECRET', 'default_secret');
    const decoded: any = jwt.verify(token, jwtSecret);
    const tenantId = decoded.tenantId;
    if (!tenantId) throw new UnauthorizedException('Invalid token: Missing tenantId');

    const connectionString = await this.fetchConnectionString(tenantId);
    
    return new DataSource({
      type: 'postgres',
      url: connectionString,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: false,
    }).initialize();
  }

  async getRepository<T extends ObjectLiteral>(token: string, entity: any): Promise<Repository<T>> {
    const connection = await this.getTenantConnection(token);
    return connection.getRepository<T>(entity);
  }

  getDefaultRepository<T extends ObjectLiteral>( entity: any): Repository<T> {
    var connection = new DataSource({
      type: 'postgres',
      url: "tenant_connection_string_should_be_set",
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: false,
    });
    return connection.getRepository<T>(entity);
  }
}