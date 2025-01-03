import { IsNotEmpty,IsArray,ValidateNested} from "class-validator";
import { Type } from 'class-transformer';
export class CreateCustomerDto {
    @IsNotEmpty()
    id:number;
  
    @IsNotEmpty()
    firstName: string;
  
    @IsNotEmpty()
    lastName: string;
   
    @IsNotEmpty()
    phone: string;
   
    @IsNotEmpty()
    email: string;
}

export class CreateCustomerBulkDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateCustomerDto)
    bulk: CreateCustomerDto[];
  } 

