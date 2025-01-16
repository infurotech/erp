import { Controller , Get, Inject}  from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { Observable } from "rxjs";


interface UserService {
  getUsers(data : {}): Observable<User[]>;
}

interface User{
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
}

@Controller("users")
export class UserController {
  private userService: UserService;

  constructor(@Inject('USER_PACKAGE') private readonly client: ClientGrpc) {}
  
  onModuleInit() {
    this.userService = this.client.getService<UserService>('UserService');
  }

  @Get()
  getUsers() {
    return this.userService.getUsers(null);
  }
}