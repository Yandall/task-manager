import { SetMetadata } from "@nestjs/common";
import { config } from "src/config/config";

export const Public = () => SetMetadata(config.KEYS.IS_PUBLIC, true)