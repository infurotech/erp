import { Controller } from "@nestjs/common";
import { Crud, CrudController } from "@nestjsx/crud";

import { Product, ProductVariant,ProductCategory, ProductVendor, ProductImage, Category,
  Brand, Vendor, Service, StaffMember } from "../entities/product.entity";
import { ProductService, ProductVariantService, ProductCategoryService, ProductVendorService, ProductImageService, CategoryService, 
  BrandService, VendorService, ServiceService, StaffMemberService } from "../services/product.service";

@Crud({ model: { type: Product } })
@Controller("products")
export class ProductController implements CrudController<Product> {
  constructor(public service: ProductService) {}
}

@Crud({ model: { type: ProductVariant } })
@Controller("product-variants")
export class ProductVariantController implements CrudController<ProductVariant> {
  constructor(public service: ProductVariantService) {}
}

@Crud({ model: { type: ProductCategory } })
@Controller("product-categories")
export class ProductCategoryController implements CrudController<ProductCategory> {
  constructor(public service: ProductCategoryService) {}
}

@Crud({ model: { type: ProductVendor } })
@Controller("product-vendors")
export class ProductVendorController implements CrudController<ProductVendor> {
  constructor(public service: ProductVendorService) {}
}

@Crud({ model: { type: ProductImage } })
@Controller("product-images")
export class ProductImageController implements CrudController<ProductImage> {
  constructor(public service: ProductImageService) {}
}

@Crud({ model: { type: Category } })
@Controller("categories")
export class CategoryController implements CrudController<Category> {
  constructor(public service: CategoryService) {}
}

@Crud({ model: { type: Brand } })
@Controller("brands")
export class BrandController implements CrudController<Brand> {
  constructor(public service: BrandService) {}
}

@Crud({ model: { type: Vendor } })
@Controller("vendors")
export class VendorController implements CrudController<Vendor> {
  constructor(public service: VendorService) {}
}

@Crud({ model: { type: Service } })
@Controller("services")
export class ServiceController implements CrudController<Service> {
  constructor(public service: ServiceService) {}
}

@Crud({ model: { type: StaffMember } })
@Controller("staff-members")
export class StaffMemberController implements CrudController<StaffMember> {
  constructor(public service: StaffMemberService) {}
}
