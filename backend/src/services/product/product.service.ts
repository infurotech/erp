import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Inject } from "@nestjs/common";
import { GeneralService } from "../general/general.service";
import { Product } from "./entities/product.entity";

@Injectable()
export class ProductService{
  constructor(
    @Inject("Product_Service") private readonly productRepository: GeneralService<Product>
  ){
  }
}