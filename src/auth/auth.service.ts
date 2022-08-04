import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { config } from "src/config/config";
import { UsersService } from "src/models/users/user.service";
import { User } from "src/models/users/user.entity";
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: User, keepLogged = false) {
    const payload = { name: user.name, email: user.email, sub: user.id, config: user.config }
    const expiresIn = keepLogged? config.JWT_EXTENDED_TIME: config.JWT_DEFAULT_TIME
    return {
        accessToken: this.jwtService.sign(payload, {expiresIn}),
    }
  }
}
