import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";

import { Customer } from "./entities/customer.entity";
import { CoreService } from "../core/core.service";

@Injectable()
export class CustomerService extends CoreService<Customer> {
  constructor(@InjectRepository(Customer) repo) {
    super(repo);
  }


  // async findByName(name: string) {

  
  //   try {
  //     // Await the result of the findOne query
  //     const customer = await this.findOne({
  //       where: {
  //         firstName: name,
  //       },
  //     });
  
  //     // Log the customer result
  //     console.log("name", customer);
  
  //     // Return the customer if found
  //     return customer;
  //   } catch (error) {
  //     // Handle errors and log them
  //     console.error("Error finding customer", error);
  //     return null;
  //   }
  // }
  
  
  
}