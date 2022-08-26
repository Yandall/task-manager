import {
  Body,
  Controller,
  Post,
  Request,
  UseInterceptors,
} from "@nestjs/common";
import { Public } from "src/common/decorators/metadata";
import { insertTransformInterceptor } from "src/common/interceptors/pg-transform.interceptor";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./user.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  @UseInterceptors(new insertTransformInterceptor())
  async create(@Request() req, @Body() userDto: CreateUserDto) {
    const results = this.usersService.create(userDto);
    req.output = results.output;
    return results.dbRes;
  }
}
