import { config as env } from "dotenv";
const MODE = process.env.MODE;
env({ path: `enviroment/.${MODE}.env` });
export const config = {
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_DEFAULT_TIME: "24h",
  JWT_EXTENDED_TIME: "30 days",
  KEYS: {
    IS_PUBLIC: "isPublic",
    SKIP_ACL_GUARD: "skipAclGuard",
    ENTITY: "entity",
  },
  DATABASE_URL: process.env.DATABASE_URL,
};
Object.freeze(config);
