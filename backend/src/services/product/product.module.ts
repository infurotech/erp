import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneralService } from '../general/general.service';
import { getRepositoryToken } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  exports: [ProductService],
  controllers:[ProductController],
  providers: [ProductService,{
    provide : "Product_Service",
    useFactory : (ProductRepository)=> new GeneralService<Product>(ProductRepository),
    inject : [getRepositoryToken(Product)],
  }],
})
export class ProductModule {}
