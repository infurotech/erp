import { Controller, Get, Inject, OnModuleInit, Param, Query } from "@nestjs/common";
import { Observable } from "rxjs";
import {ClientGrpc, GrpcMethod} from '@nestjs/microservices'

interface CustomerService {
  getCustomers(data : {}): Observable<CustomerListResponse>;
  getCustomersColumnsList(data: {column: string}) : Promise<any>;
  getCustomerById(id : string): Promise<CustomerResponse>;
}

interface CustomerResponse {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface CustomerListResponse {
  customers: CustomerResponse[];
}

@Controller("customers")
export class CustomerController implements OnModuleInit {
  private customerService: CustomerService;

  constructor(@Inject('CRUD_PACKAGE') private readonly client: ClientGrpc) {}
  
  onModuleInit() {
    this.customerService = this.client.getService<CustomerService>('CustomerService');
  }
  
  @Get()
  getCustomer() {
    return this.customerService.getCustomers(null);
  }

  @Get('list')
  async getCustomersColumnsList(@Query('columns') column: string): Promise<any> {
    console.log("column",column)
    return this.customerService.getCustomersColumnsList({column});
  }
  
  @Get(':id')
  getCustomerById(@Param() id: string) {
    console.log("id",id,typeof(id))
    return this.customerService.getCustomerById(id);
  }

}