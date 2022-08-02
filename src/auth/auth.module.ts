import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
// import { PassportModule } from "@nestjs/passport";  // Aun no se para que se usa
import { UsersModule } from "src/models/users/user.module";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./strategies/local.strategy";
import { config } from "../config/config"
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./strategies/jtw.strategy";


@Module({
  imports: [
    // PassportModule
    UsersModule,
    JwtModule.register({
      secret: config.JWT_SECRET,
      signOptions: { expiresIn: "60s" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
