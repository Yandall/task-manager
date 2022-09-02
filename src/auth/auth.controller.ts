import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { Public } from "src/common/decorators/metadata";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post("auth/login")
  login(@Request() req) {
    return this.authService.login(req.user, req.body.keepLogged);
  }
}
