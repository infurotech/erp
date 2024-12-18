import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "./entities/customer.entity";
import { CrudService } from "../../core/crud/crud.service";

@Injectable()
export class CustomerService extends CrudService<Customer> {
  constructor(@InjectRepository(Customer) repo) {
    super(repo);
  }
}