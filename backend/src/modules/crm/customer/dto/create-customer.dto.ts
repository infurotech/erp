import { IsNotEmpty} from "class-validator";
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


