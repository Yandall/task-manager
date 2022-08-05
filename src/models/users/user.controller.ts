import { Body, Controller, Get, Param, Post, UseFilters } from "@nestjs/common";
import { Public } from "src/common/decorators/metadata";
import { PgExceptionFilter } from "src/common/exceptions/pg-exception.filter";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./user.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  @UseFilters(new PgExceptionFilter())
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.create(userDto)
  }
}
