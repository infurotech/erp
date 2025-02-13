import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository , DataSource } from 'typeorm';
import { AuditService, DatabaseService } from '@infuro/shared';
import { Property } from './entities/properties.entity';
import { PropertyService } from './services/properties.service';
import { PropertyController } from './controllers/properties.controller';
@Module({
  imports: [TypeOrmModule.forFeature([Property])],
  providers: [PropertyService,Repository,
    {
    provide: DatabaseService,
    useFactory: (dataSource: DataSource) => new DatabaseService(dataSource),
    inject: [DataSource],
  },
  AuditService],
  exports: [PropertyService, DatabaseService],
  controllers: [PropertyController],
})
export class PropertyDataModule {}
