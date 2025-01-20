import { BadRequestException, Controller, Get, Injectable, Param, Query } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@dataui/crud-typeorm";
import { Repository } from "typeorm";
import { Customer } from "./entities/customer.entity"
import { GrpcMethod, MessagePattern } from '@nestjs/microservices';
import { GenericServiceControllerMethods } from "src/common/decorator";

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
@GenericServiceControllerMethods('CustomerService',Customer)
export class CustomerController {

  constructor(@InjectRepository(Customer)  private readonly customerRepository: Repository<Customer>) {
    (this as any).CustomerRepository = this.customerRepository;
  }

  @MessagePattern('getCustomersColumnsList')
  async getCustomersColumnsList(columns :  string): Promise<any> {
    const validColumns = this.customerRepository.metadata.columns.map((col) => col.propertyName);
    const columnsArray = columns.split(",");
    const invalidColumns = columnsArray.filter((column) => !validColumns.includes(column));
    if (invalidColumns.length > 0) {
      throw new BadRequestException(`Invalid columns: ${invalidColumns.join(", ")}`);
    }
    const result = {};

    for (const column of columnsArray) {
      const customers = await this.customerRepository
      .createQueryBuilder("customer")
      .select(`DISTINCT(customer.${column})`)
      .getRawMany();

      result[column] = customers.map((customer) => customer[column]);
    }
    return result;
  }
}