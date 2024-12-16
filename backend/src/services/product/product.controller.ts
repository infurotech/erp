import { Controller } from "@nestjs/common";
import { Crud, CrudController } from "@nestjsx/crud";

import { Product } from "./entities/product.entity";
import { ProductService } from "./product.service";

@Crud({
  model: {
    type: Product,
  },
})
@Controller("products")
export class ProductController{
  constructor(public service: ProductService) {}
}