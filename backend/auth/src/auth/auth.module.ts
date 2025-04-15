import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuditService,TenancyModule } from '@infuro/shared';  // Import TenantOrmModule

import { AuthController } from './controllers/auth.controller';
import { JwtService } from '@nestjs/jwt';
import { UserSeederService } from './services/user-seeder.service';

@Module({
  imports: [ 
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
