import { Controller } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@dataui/crud-typeorm";
import { GrpcMethod } from '@nestjs/microservices';
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";

interface UserResponse {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
}

@Controller()
export class UserService {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) {
  }

  @GrpcMethod('UserService', 'GetUsers')
  async getUsers(): Promise<{ users: UserResponse[] }> {
    const users = await this.repo.find();
    return {
      users: users.map(user => ({
        id: user.id,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        email: user.email, 
      })),
    };
  }
}