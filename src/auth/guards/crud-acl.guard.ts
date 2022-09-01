import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { config } from "src/config/config";
import { PrismaService } from "src/prisma.service";

/**
 * Sets the entity for the Guard to search the resource.
 * The guard checks if the user that is trying to manipulate a resource is owner of this.
 * @param entity The entity of the resource
 * @returns
 */
export function getAclEntityGuard(entity: string) {
  EntityAclGuard.prototype.entity = entity;
  return EntityAclGuard;
}

type Entity = {
  id: string;
  owner: string;
};

/**
 * Checks if the user that is trying to manipulate a resource is owner of this.
 */
@Injectable()
class EntityAclGuard implements CanActivate {
  entity: string;

  constructor(private prisma: PrismaService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const skip = this.reflector.getAllAndOverride<boolean>(
      config.KEYS.SKIP_ACL_GUARD,
      [context.getHandler(), context.getClass()]
    );
    if (skip) return true;
    const { user, body } = context.switchToHttp().getRequest();
    const originalResource: Entity = await this.prisma[this.entity].findUnique({
      where: { id: body.id },
    });
    return originalResource.owner.toString() === user.id;
  }
}
