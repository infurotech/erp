import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { GeneralService } from '../general/general.service';

@Injectable()
export class CustomerService{
  constructor(
    @Inject("Customer_Service") private readonly customerRepository: GeneralService<Customer>
  ){
  }

  async dummy(){
    return this.customerRepository.create("test");
  }
}
