import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { config } from "src/config/config";
import { PrismaService } from "src/prisma.service";

type Entity = {
  id: string;
  owner: string;
};

/**
 * Checks if the user that is trying to manipulate a resource is owner of this.
 * Use with @EntityName() decorator to set the entity
 */
@Injectable()
export class EntityAclGuard implements CanActivate {
  constructor(private prisma: PrismaService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const skip = this.reflector.getAllAndOverride<boolean>(
      config.KEYS.SKIP_ACL_GUARD,
      [context.getHandler(), context.getClass()]
    );
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      config.KEYS.IS_PUBLIC,
      [context.getHandler(), context.getClass()]
    );
    const entity = this.reflector.getAllAndOverride<string>(
      config.KEYS.ENTITY,
      [context.getHandler(), context.getClass()]
    );
    if (skip || isPublic || !entity) return true;
    const { user, params } = context.switchToHttp().getRequest();
    const paramId = params.id;
    if (!paramId) return true;
    const originalResource: Entity = await this.prisma[entity].findUnique({
      where: { id: paramId },
    });
    if (!originalResource) return true;
    return originalResource.owner.toString() === user.id;
  }
}
