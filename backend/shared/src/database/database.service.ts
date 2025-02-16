import { Injectable, Scope, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource, Repository } from 'typeorm';
import * as crypto from 'crypto';
import { CachingManager } from '../caching/caching.manager';
import { JwtService } from '@nestjs/jwt'
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable({ scope: Scope.REQUEST })
export class DatabaseService {

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

  private async fetchConnectionString(tenantId: string): Promise<string> {
    const cacheKey = `db-conn-${tenantId}`;
    
    // const cachedConn = await this.cachingManager.get<string>(cacheKey);
    // if (cachedConn) return cachedConn;
    const tenantRepo: Repository<any> = this.defaultDataSource.getRepository('tenants');

    const allTenants = await tenantRepo.find();
    console.log('📋 Total tenants in DB:', allTenants);

    const tenant = await tenantRepo.findOne({ where: { tenantId } });
    console.log("tenant",tenant)
    if (!tenant || !tenant.encryptedConnection) {
      throw new UnauthorizedException('Tenant database configuration not found.');
    }

    const decryptedConn = await this.decryptConnectionString(tenant.encryptedConnection);
    // await this.cachingManager.set(cacheKey, decryptedConn, { ttl: 600 }); // Cache for 10 min
    return decryptedConn;
  }

  async getTenantConnection(token: string): Promise<DataSource> {
    const jwtSecret = this.configService.get<string>(process.env.SECURITY_KEY, 'default_secret');
    // const decoded: any = this.jwtService.verify(
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjE4MjI1IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6InR6dWF0ZGVtb3NhY2Nvc0BkZXYud2FrYW5kaS5jb20iLCJBc3BOZXQuSWRlbnRpdHkuU2VjdXJpdHlTdGFtcCI6ImFmOTc5ZDBiLTJmMzctMzE5OS02YzMzLTNhMTEyNDQxZWUwYiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6WyJDbGllbnQiLCJBY2NvdW50YW50IiwiQWRtaW4iLCJBdWRpdG9yIiwiQm9hcmRNZW1iZXIiLCJCb2FyZE1lbWJlclJlcHJlc2VudGF0aXZlIiwiQ2xpZW50TWFuYWdlciIsIkNyZWRpdENvbW1pdHRlZSIsIkNyZWRpdE9mZmljZXIiLCJHZW5lcmFsTWFuYWdlciIsIkxvYW5PZmZpY2VyIiwiTmV3IFJvbGUiLCJTdXBwb3J0IiwiVGVsbGVyIl0sImh0dHA6Ly93d3cuYXNwbmV0Ym9pbGVycGxhdGUuY29tL2lkZW50aXR5L2NsYWltcy90ZW5hbnRJZCI6IjQwMCIsInN1YiI6IjE4MjI1IiwianRpIjoiODY3OTViYmMtY2ZjZC00YjA4LWIwZTMtMmYwMzk3ZmI1NjVhIiwiaWF0IjoxNzM4NTU2MTkxLCJlbWFpbCI6InR6dWF0ZGVtb3NhY2Nvc0BkZXYud2FrYW5kaS5jb20iLCJzYWNjb3NfZW1haWwiOiJ0enVhdGRlbW9zYWNjb3NAZGV2Lndha2FuZGkuY29tIiwic2FjY29zX25hbWUiOiJUWlVBVERlbW9TYWNjb3MiLCJzYWNjb3NfaWQiOiIxMDE2NzAiLCJXQUsiOiJXQkE6QSIsIkNBTSI6IkNBUzpTLENSUzpTLENNUzpTIiwibW9kdWxlVHlwZSI6IlNhY2NvcyIsIm5iZiI6MTczODU1NjE5MSwiZXhwIjoxNzM4NTU5NzkxLCJpc3MiOiJ3YWthbmRpLmNvbSIsImF1ZCI6ImNhbXMifQ.sT08VUpqk3d2lEEGsHr5HzPS5P455pSbtRcXHDo-nC0', {
    //     publicKey: this.tokenValidator.securityKey,
    //     audience:  this.tokenValidator.audience,
    //     algorithms: ['HS256'] ,
    //     issuer:    this.tokenValidator.issuer
    //   });
    //
    const tenantId = '101';
    if (!tenantId) throw new UnauthorizedException('Invalid token: Missing tenantId');
    const connectionString = await this.fetchConnectionString(tenantId);
    
    return new DataSource({
      type: 'mysql',
      url: connectionString,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
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