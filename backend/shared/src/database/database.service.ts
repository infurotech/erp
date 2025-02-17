import { Injectable, Scope, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource, Repository } from 'typeorm';
import * as crypto from 'crypto';
import { CachingManager } from '../caching/caching.manager';
import { JwtService } from '@nestjs/jwt'
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable({ scope: Scope.REQUEST })
export class DatabaseService {

  tokenValidator = {
    issuer:  process.env.ISSUER,
    audience:  process.env.AUDIENCE,
    securityKey: process.env.SECURITY_KEY,
    algorithms: process.env.ALGORITHMS
  };

  private configService: ConfigService;
  private cachingManager: CachingManager;
  private jwtService: JwtService;
  constructor(@InjectDataSource() private readonly defaultDataSource: DataSource) {
    this.configService = new ConfigService();
    this.jwtService = new JwtService();
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

  private async fetchConnectionString(saccos_name: string): Promise<string> {
    // const cacheKey = `db-conn-${tenantId}`;
    
    // const cachedConn = await this.cachingManager.get<string>(cacheKey);
    // if (cachedConn) return cachedConn;
    const tenantRepo: Repository<any> = this.defaultDataSource.getRepository('wp_wzaccounts');

    const wzAccount = await tenantRepo.findOne({ where: { label: saccos_name } });
    if (!wzAccount) {
      throw new UnauthorizedException('Tenant database configuration not found.');
    }
    if(process.env.IS_LOCAL) {
      wzAccount.db_host = process.env.HOST;
      wzAccount.db_port = process.env.PORT;
    }
    const connectionUrl = `mysql://${wzAccount.db_login}:${wzAccount.db_password}@${wzAccount.db_host}:${wzAccount.db_port}/${wzAccount.db_database}`;
    // const decryptedConn = await this.decryptConnectionString(tenant);
    // await this.cachingManager.set(cacheKey, decryptedConn, { ttl: 600 }); // Cache for 10 min
    return connectionUrl;
  }

  async getTenantConnection(token: string): Promise<DataSource> {
    
    const decoded: any = this.jwtService.verify(token, {
        publicKey: this.tokenValidator.securityKey,
        audience:  this.tokenValidator.audience,
        algorithms: this.tokenValidator.algorithms as any,
        issuer:    this.tokenValidator.issuer
      });

    const saccos_name = decoded['saccos_name'];
    if (!saccos_name) throw new UnauthorizedException('Invalid token: Missing saccos_name');
    const connectionString = await this.fetchConnectionString(saccos_name);
    return new DataSource({
      type: 'mysql',
      url: connectionString,
      synchronize: false,
    }).initialize();
  }

  async getRepository<T>(token: string, entity: any): Promise<Repository<T>> {
    const connection = await this.getTenantConnection(token);
    return connection.getRepository<T>(entity);
  }

  getDefaultRepository<T>( entity: any): Repository<T> {
    var connection = new DataSource(entity.dataSource.options);
    if (!connection.isInitialized) {
      console.error("DataSource is not initialized!");
      connection.initialize();
    }

    return connection.getRepository<T>(entity);
  }

}