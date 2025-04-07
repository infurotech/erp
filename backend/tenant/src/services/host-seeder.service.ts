import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from '../entities/setting.host.entity';
import { DatabaseService } from '@infuro/shared';

@Injectable()
export class HostSeederService implements OnModuleInit {
  constructor(
    @InjectRepository(Tenant)
    private readonly TenantRepository: Repository<Tenant>,
    databaseService: DatabaseService,
  ) {}


  async onModuleInit() {
    await this.createDefaultHost();
  }

  private async createDefaultHost() {
    const existingTenant = await this.TenantRepository.findOne({ where: { name: 'FirstTanant' } });
    if (!existingTenant) {
     console.log('🚀 Creating default host...');
      const user = this.TenantRepository.create({
        name: 'FirstTanant',
        db_host: 'localhost',
        db_port: '5432',
        db_login: 'postgres',
        db_password: '12345',
        db_database: 'Users',
        active: true,
      });

      await this.TenantRepository.save(user);
      console.log('✅ Default admin user created!')
    } else {
        console.log('✅ Admin user already exists.');
      }
  }
}
