import { Controller , Get, Inject}  from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Controller("users")
export class UserController {

  constructor(@Inject('USER_PACKAGE') private readonly client: ClientProxy) {}

  @Get()
  getUsers() {
    return this.client.send('getUsers', {data: null});
  }
}