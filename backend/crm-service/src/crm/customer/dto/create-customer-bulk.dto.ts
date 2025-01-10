import { IsArray,ValidateNested} from "class-validator";
import { Type } from 'class-transformer';
import { CreateCustomerDto } from "./create-customer.dto";

export class CreateCustomerBulkDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateCustomerDto)
    bulk: CreateCustomerDto[];
  } 