import { SetMetadata } from "@nestjs/common";
import { config } from "src/config/config";

/**
 * Decorator used to set an endpoint as public
 */
export const Public = () => SetMetadata(config.KEYS.IS_PUBLIC, true);

/**
 * Decorator used to skip validation of authorization on CRUD
 */
export const SkipAclGuard = () => SetMetadata(config.KEYS.SKIP_ACL_GUARD, true);

/**
 * Set the name of the entity for the class or method
 * @param entity Name of the entity
 * @returns
 */
export const EntityName = (entity: string) =>
  SetMetadata(config.KEYS.ENTITY, entity);
