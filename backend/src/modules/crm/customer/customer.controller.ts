import { BadRequestException, Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Post, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { Crud, CrudController } from "@nestjsx/crud";

import { Customer } from "./entities/customer.entity";
import { CustomerService } from "./customer.service";
import { DataSource } from "typeorm";
import { CreateCustomerBulkDto } from "./dto/create-customer-bulk.dto";

@Crud({
  model: {
    type: Customer,
  },
})
@Controller("customers")
export class CustomerController implements CrudController<Customer> {
  constructor(public service: CustomerService,private dataSource: DataSource) {}


  @Post('bulk')
  @UsePipes(new ValidationPipe())
  async createBulk(@Body() createCustomerBulkDto: CreateCustomerBulkDto) {
    const repository = this.dataSource.getRepository(Customer)
    
    const { bulk } = createCustomerBulkDto;

    await repository.save(bulk);
    if (!bulk) {
      throw new BadRequestException('Payload is empty');
    }
    return {
      success: true,
      bulk: bulk
    };
  }

  @Get('list')
  async getCustomersNameList(@Query('columns') columns: string): Promise<any> {
    const repository = this.dataSource.getRepository(Customer);

    const validColumns = repository.metadata.columns.map((col) => col.propertyName);

    const columnsArray = columns.split(",");

    const invalidColumns = columnsArray.filter((column) => !validColumns.includes(column));
    if (invalidColumns.length > 0) {
      throw new BadRequestException(`Invalid columns: ${invalidColumns.join(", ")}`);
    }
    const result = {};

    for (const column of columnsArray) {
      const customers = await repository
      .createQueryBuilder("customer")
      .select(`DISTINCT(customer.${column})`)
      .getRawMany();

      result[column] = customers.map((customer) => customer[column]);
    }

    return result;
  }

  @Delete('multiple')
  async deleteMultipleCustomers(@Body('ids') indexes: number[]) {
    if (!Array.isArray(indexes) || indexes.length === 0) {
      throw new BadRequestException('Invalid payload. "indexes" must be a non-empty array.');
    }

    try {
      const result = await this.dataSource.getRepository(Customer).delete(indexes);
      if (result.affected === 0) {
        throw new NotFoundException('No customers found with the provided IDs.');
      }
      
      return { message: `${result.affected} customers deleted successfully.` };
    } catch (error) {
      throw new InternalServerErrorException('Error while deleting customers.');
    }
  }
}