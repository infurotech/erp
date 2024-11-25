import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";

import { Customer } from "./entities/customer.entity";

@Injectable()
export class CustomerService extends TypeOrmCrudService<Customer> {
  constructor(@InjectRepository(Customer) repo) {
    super(repo);
  }
}