import { Body, Controller, Post } from "@nestjs/common";
import { Public } from "src/common/decorators/metadata";
import { CreateUserDto } from "./dto/user.dto";
import { UsersService } from "./user.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  async create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }
}
