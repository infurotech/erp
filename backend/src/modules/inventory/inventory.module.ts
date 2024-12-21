import { Module } from '@nestjs/common';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { Product } from './product/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  exports: [ProductService],
  controllers: [ProductController],
  providers: [ProductService],
})
export class InventoryModule {}
