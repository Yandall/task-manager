import { Body, Controller, Get, Post, Put, Request } from "@nestjs/common";
import { Public } from "src/common/decorators/metadata";
import { CreateUserDto, UpdateUserDto } from "./user.dto";
import { UsersService } from "./user.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("profile")
  async getProfile(@Request() { user }) {
    const search = await this.usersService.find(user.id);
    delete search.password;
    return search;
  }

  @Public()
  @Post()
  create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Put()
  update(@Body() user: UpdateUserDto) {
    return this.usersService.update(user);
  }

  @Put("password")
  async updatePassword(
    @Body() payload: { password: string },
    @Request() { user }
  ) {
    await this.usersService.updatePassword(user.id, payload.password);
    return { statusCode: 200, message: "Password updated" };
  }
}
