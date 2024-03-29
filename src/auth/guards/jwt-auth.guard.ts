import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { config } from "src/config/config";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
    constructor(private reflector: Reflector) {
        super()
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(config.KEYS.IS_PUBLIC, [
            context.getHandler(),
            context.getClass(),
        ])
        if (isPublic) {
            return true
        }
        return super.canActivate(context)
    }
}
