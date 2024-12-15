import { Controller, Get } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { CustomerService } from './customer.service';
import { Customer } from './entities/customer.entity';

@Crud({
  model: {
    type: Customer, // The entity you want to expose for CRUD operations
  },
})
@Controller('customers')
export class CustomerController{
  constructor(public service: CustomerService) {} // Injecting CustomerService

  @Get()
  async dummyFun(){
    console.log("insider contorller");
   return this.service.dummy();
  }
}
