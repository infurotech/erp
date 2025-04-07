import { Module, Scope } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Repository, DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { App } from './entities/app.entity';
import { Edition } from './entities/edition.entity';
import { Feature } from './entities/feature.entity';
import { Invite } from './entities/invite.entity';
import { Tenant } from './entities/tenant.entity';
import { User } from './entities/user.entity';
import { AuthService } from './services/auth.service';
import { TenantService } from './services/tenant.service';
import { AuditService, TenantConnectionManager, TenantContextService, TenantOrmModule } from '@infuro/shared';
import { AuthController } from './controllers/auth.controller';
import { UserSeederService } from './services/user-seeder.service';

@Module({
  imports: [
    TenantOrmModule.forFeature([App, Edition, Feature, Invite, Tenant, User])
  ],
  providers: [
    JwtService,
    TenantConnectionManager,
    {
      provide: TenantContextService,
      scope: Scope.REQUEST,
      useClass: TenantContextService,
    },
    AuthService,
    AuditService,
    UserSeederService
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule { }
