import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuditService, TenantOrmModule } from '@infuro/shared';  // Import TenantOrmModule
import { App } from './entities/app.entity';  // Your entities
import {  Edition } from './entities/edition.entity';  
import { Feature } from './entities/feature.entity';  // Your entities
import {  Invite } from './entities/invite.entity';  // Your entities
import { Tenant } from './entities/tenant.entity';  // Your entities
import {  User } from './entities/user.entity';  
import { TenancyModule } from '../tenancy/tenancy.module'; // Import TenancyModule

import { AuthController } from './controllers/auth.controller';
import { JwtService } from '@nestjs/jwt';
import { UserSeederService } from './services/user-seeder.service';

@Module({
  imports: [
    TenantOrmModule.forFeature([App, Edition, Feature, Invite, Tenant, User]),  // Use TenantOrmModule with the entities
    TenancyModule
  ],
  providers: [
    JwtService,
       AuthService,  
    AuditService,
    UserSeederService
  ],
  controllers: [AuthController],  // Your controller
  exports: [AuthService],  // Export AuthService if used elsewhere
})
export class AuthModule {}
