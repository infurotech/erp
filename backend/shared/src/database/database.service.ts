import { Injectable, Scope, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { CachingManager } from 'src/caching/caching.manager';

@Injectable({ scope: Scope.REQUEST })
export class DatabaseService {
  constructor(
    private configService: ConfigService,
    @InjectDataSource() private readonly defaultDataSource: DataSource,
    private readonly cachingManager: CachingManager
  ) {}

  private async decryptConnectionString(encryptedString: string): Promise<string> {
    const secretKey = this.configService.get<string>('ENCRYPTION_SECRET');
    const decipher = crypto.createDecipher('aes-256-cbc', secretKey);
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
    const decoded: any = jwt.verify(token, this.configService.get('JWT_SECRET'));
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

  async getRepository<T>(token: string, entity: any): Promise<Repository<T>> {
    const connection = await this.getTenantConnection(token);
    return connection.getRepository<T>(entity);
  }
}