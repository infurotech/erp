import { Controller, Get, Query } from "@nestjs/common";
import { Crud, CrudController } from "@nestjsx/crud";

import { Customer } from "./entities/customer.entity";
import { CustomerService } from "./customer.service";

@Crud({
  model: {
    type: Customer,
  },
})
@Controller("customers")
export class CustomerController implements CrudController<Customer> {
  constructor(public service: CustomerService) {}
}