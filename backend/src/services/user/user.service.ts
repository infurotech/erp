import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";

import { User } from "./entities/user.entity";

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) repo) {
    super(repo);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    var user = await this.repo.findOneBy({ email: username });
    
    return user;
  }
}