import { BadRequestException, Controller, Get, Injectable, Param, Query } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@dataui/crud-typeorm";
import { Repository } from "typeorm";
import { Customer } from "./entities/customer.entity"
import { GrpcMethod } from '@nestjs/microservices';

export interface CustomerResponse {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface CustomerListResponse {
  customers: CustomerResponse[];
}

@Controller()
export class CustomerController extends TypeOrmCrudService<Customer>{

  constructor(@InjectRepository(Customer) repo: Repository<Customer>) {
    super(repo);
  }

  @GrpcMethod('CustomerService','getCustomers')
   async getCustomers(): Promise<CustomerListResponse> {
    const customers =  await this.repo.find();
    return { customers: customers };
  }

  @GrpcMethod('CustomerService','getCustomerById')
   async getCustomerById(id: {id: number}): Promise<CustomerResponse> {
    console.log("id",id);
     const customer = await this.repo.findOneBy(id);
     return customer;
  }

  @GrpcMethod('CustomerService', 'getCustomersColumnsList')
  async getCustomersColumnsList(columns : {column: string}): Promise<any> {
    const validColumns = this.repo.metadata.columns.map((col) => col.propertyName);
    const columnsArray = columns['column'].split(",");
    const invalidColumns = columnsArray.filter((column) => !validColumns.includes(column));
    if (invalidColumns.length > 0) {
      throw new BadRequestException(`Invalid columns: ${invalidColumns.join(", ")}`);
    }
    const result = {};

    for (const column of columnsArray) {
      const customers = await this.repo
      .createQueryBuilder("customer")
      .select(`DISTINCT(customer.${column})`)
      .getRawMany();

      result[column] = customers.map((customer) => customer[column]);
    }
    return result;
  }
}