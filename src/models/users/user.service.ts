import { Injectable } from "@nestjs/common";
import { hashPassword } from "src/common/util";
import { PrismaService } from "src/prisma.service";
import { CreateUserDto } from "./dto/user.dto";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findOne(id: number) {
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
}
