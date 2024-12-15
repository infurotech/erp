import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { Customer } from './entities/customer.entity';
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
import { GeneralService } from '../general/general.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [CustomerService,{
    provide : "Customer_Service",
    useFactory : (customerRepository)=> new GeneralService<Customer>(customerRepository),
    inject : [getRepositoryToken(Customer)],
  }],
  exports: [CustomerService],
  controllers: [CustomerController],
})
export class CustomerModule {}
