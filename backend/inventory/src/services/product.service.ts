import { Injectable, Scope } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CrudService, DatabaseService } from "@infuro/shared";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

import { Product, ProductVariant,ProductCategory, ProductVendor, ProductImage, Category,
  Brand, Vendor, Service, StaffMember } from "../entities/product.entity";

@Injectable({ scope: Scope.REQUEST })
export class ProductService extends CrudService<Product> {
  constructor(
    @InjectRepository(Product) repo: Repository<Product>,
    databaseService: DatabaseService
  ) {
    super(repo, databaseService);
  }
}

@Injectable({ scope: Scope.REQUEST })
export class ProductVariantService extends CrudService<ProductVariant> {
  constructor(
    @InjectRepository(ProductVariant) repo: Repository<ProductVariant>,
    databaseService: DatabaseService
  ) {
    super(repo, databaseService);
  }
}

@Injectable({ scope: Scope.REQUEST })
export class ProductCategoryService extends CrudService<ProductCategory> {
  constructor(
    @InjectRepository(ProductCategory) repo: Repository<ProductCategory>,
    databaseService: DatabaseService
  ) {
    super(repo, databaseService);
  }
}

@Injectable({ scope: Scope.REQUEST })
export class ProductVendorService extends CrudService<ProductVendor> {
  constructor(
    @InjectRepository(ProductVendor) repo: Repository<ProductVendor>,
    databaseService: DatabaseService
  ) {
    super(repo, databaseService);
  }
}

@Injectable({ scope: Scope.REQUEST })
export class ProductImageService extends CrudService<ProductImage> {
  constructor(
    @InjectRepository(ProductImage) repo: Repository<ProductImage>,
    databaseService: DatabaseService
  ) {
    super(repo, databaseService);
  }
}

@Injectable({ scope: Scope.REQUEST })
export class CategoryService extends CrudService<Category> {
  constructor(
    @InjectRepository(Category) repo: Repository<Category>,
    databaseService: DatabaseService
  ) {
    super(repo, databaseService);
  }
}

@Injectable({ scope: Scope.REQUEST })
export class BrandService extends CrudService<Brand> {
  constructor(
    @InjectRepository(Brand) repo: Repository<Brand>,
    databaseService: DatabaseService
  ) {
    super(repo, databaseService);
  }
}

@Injectable({ scope: Scope.REQUEST })
export class VendorService extends CrudService<Vendor> {
  constructor(
    @InjectRepository(Vendor) repo: Repository<Vendor>,
    databaseService: DatabaseService
  ) {
    super(repo, databaseService);
  }
}

@Injectable({ scope: Scope.REQUEST })
export class ServiceService extends CrudService<Service> {
  constructor(
    @InjectRepository(Service) repo: Repository<Service>,
    databaseService: DatabaseService
  ) {
    super(repo, databaseService);
  }
}

@Injectable({ scope: Scope.REQUEST })
export class StaffMemberService extends CrudService<StaffMember> {
  constructor(
    @InjectRepository(StaffMember) repo: Repository<StaffMember>,
    databaseService: DatabaseService
  ) {
    super(repo, databaseService);
  }
}
