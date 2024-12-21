import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest } from "@nestjsx/crud";

import { User } from "../../auth/entities/user.entity";
import { UserService } from "./user.service";

@Crud({
  model: {
    type: User,
  },
})
@Controller("users")
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}

  get base(): CrudController<User> {
    return this;
  }

  @Override()
  createOne(@ParsedRequest() req: CrudRequest, @ParsedBody() user: User) {
    return this.base.createOneBase(req, user);
  }
}