import { Controller, Get, Inject, Param, Query } from "@nestjs/common";
import { ClientProxy } from '@nestjs/microservices'

@Controller("customers")
export class CustomerController {

  constructor(@Inject('CRUD_PACKAGE') private readonly client: ClientProxy) {}
  
  @Get()
  getCustomer() {
    return this.client.send('getCustomers',{data: null});
  }

  @Get('list')
  async getCustomersColumnsList(@Query('columns') column: string): Promise<any> {
    return this.client.send('getCustomersColumnsList',column)
  }
  
  @Get(':id')
  getCustomerById(@Param() id: string) {
    return this.client.send('getCustomerById',id);
  }

}