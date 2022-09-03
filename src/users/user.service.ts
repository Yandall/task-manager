import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { hashPassword } from "src/common/util";
import { PrismaService } from "src/prisma.service";
import { CreateUserDto, UpdateUserDto } from "./user.dto";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  find(id: number) {
    return this.prisma.users.findUnique({ where: { id } });
  }

  findOneByEmail(email: string) {
    return this.prisma.users.findUnique({ where: { email } });
  }

  async create(data: CreateUserDto) {
    data.password = hashPassword(data.password);
    const result = await this.prisma.users.create({ data });
    delete result.password;
    return result;
  }

  update(updateUserDto: UpdateUserDto) {
    const data: Prisma.usersUpdateInput = {
      name: updateUserDto.name,
      config: updateUserDto.config,
      updatedDate: updateUserDto.updatedDate,
    };
    return this.prisma.users.update({ where: { id: updateUserDto.id }, data });
  }

  updatePassword(id: number, password: string) {
    const hash = hashPassword(password);
    const data: Prisma.usersUpdateInput = {
      password: hash,
    };
    return this.prisma.users.update({ where: { id }, data });
  }
}
