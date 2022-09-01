import { SetMetadata } from "@nestjs/common";
import { config } from "src/config/config";

/**
 * Decorator used to set an endpoint as public
 */
export const Public = () => SetMetadata(config.KEYS.IS_PUBLIC, true);

export const SkipAclGuard = () => SetMetadata(config.KEYS.SKIP_ACL_GUARD, true);
