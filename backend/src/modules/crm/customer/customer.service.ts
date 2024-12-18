import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "./entities/customer.entity";
import { CrudService } from "../../core/crud/crud.service";
import { CrudRequest, CreateManyDto } from "@nestjsx/crud";
import { DeepPartial } from "typeorm";

@Injectable()
export class CustomerService extends CrudService<Customer> {
  constructor(@InjectRepository(Customer) repo) {
    super(repo);
  }
}