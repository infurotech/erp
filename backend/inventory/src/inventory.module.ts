import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtService } from "@nestjs/jwt";
import { DatabaseService } from "@infuro/shared";
import { DataSource } from "typeorm";

import {
  Product, ProductVariant, ProductCategory, ProductVendor, ProductImage, Category,
  Brand, Vendor, Service, StaffMember
} from "./entities/product.entity";
import {
  ProductService, ProductVariantService, ProductCategoryService, ProductVendorService, ProductImageService, CategoryService,
  BrandService, VendorService, ServiceService, StaffMemberService
} from "./services/product.service";
import {
  BrandController, CategoryController, ProductController, ServiceController, StaffMemberController, VendorController,
  ProductVariantController, ProductImageController, ProductCategoryController, ProductVendorController
} from './controllers/product.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, ProductVariant, ProductCategory, ProductVendor, ProductImage, Category,
      Brand, Vendor, Service, StaffMember
    ])
  ],
  providers: [
    {
      provide: DatabaseService,
      useFactory: (dataSource: DataSource) => new DatabaseService(dataSource),
      inject: [DataSource],
    },
    JwtService, ProductService, ProductVariantService, ProductCategoryService, ProductVendorService, ProductImageService, CategoryService,
    BrandService, VendorService, ServiceService, StaffMemberService
  ],
  exports: [
    DatabaseService,
    ProductService, ProductVariantService, ProductCategoryService, ProductVendorService, ProductImageService, CategoryService,
    BrandService, VendorService, ServiceService, StaffMemberService
  ],
  controllers: [ProductController, CategoryController, BrandController, VendorController, ServiceController, StaffMemberController,
    ProductVariantController, ProductImageController, ProductCategoryController, ProductVendorController
  ],
})
export class InventoryModule { }
