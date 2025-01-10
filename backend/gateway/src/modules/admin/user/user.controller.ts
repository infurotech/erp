import { BadRequestException, Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Query, } from "@nestjs/common";
import { Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest } from "@nestjsx/crud";

import { DataSource } from "typeorm";
import { UserService } from "../user/user.service";
import { User } from "src/modules/auth/entities/user.entity";

@Crud({
  model: {
    type: User,
  },
})
@Controller("users")
export class UserController implements CrudController<User> {
  constructor(public service: UserService,private dataSource: DataSource) {}

  get base(): CrudController<User> {
    return this;
  }

  @Override()
  createOne(@ParsedRequest() req: CrudRequest, @ParsedBody() user: User) {
    return this.base.createOneBase(req, user);
  }

  @Get('list')
  async getColumnList(@Query('columns') columns: string): Promise<any> {
    const repository = this.dataSource.getRepository(User);
    
    const validColumns = repository.metadata.columns.map((col) => col.propertyName);

    const columnsArray = columns.split(",");

    const invalidColumns = columnsArray.filter((column) => !validColumns.includes(column));
    if (invalidColumns.length > 0) {
      throw new BadRequestException(`Invalid columns: ${invalidColumns.join(", ")}`);
    }

    const result = {};
    for (const column of columnsArray) {
      const users = await repository
      .createQueryBuilder("user")
      .select(`DISTINCT(user.${column})`)
      .getRawMany();

      result[column] = users.map((user) => user[column]);
    }

    return result;
  }

  @Delete('multiple')
  async deleteMultipleCustomers(@Body('ids') indexes: number[]) {
    if (!Array.isArray(indexes) || indexes.length === 0) {
      throw new BadRequestException('Invalid payload. "indexes" must be a non-empty array.');
    }

    try {
      const result = await this.dataSource.getRepository(User).delete(indexes);
      if (result.affected === 0) {
        throw new NotFoundException('No customers found with the provided IDs.');
      }
      
      return { message: `${result.affected} customers deleted successfully.` };
    } catch (error) {
      throw new InternalServerErrorException('Error while deleting customers.');
    }
  }
}