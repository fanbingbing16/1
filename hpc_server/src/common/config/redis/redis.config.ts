import { RedisModuleOptions } from "@liaoliaots/nestjs-redis";
import { sevCfg } from "src/config/sevCfg";

export const redisOptions = async (): Promise<RedisModuleOptions> => ({
  closeClient: true,
  config: {
    namespace: "default",
    host: sevCfg.get().redis.host,
    port: sevCfg.get().redis.port,
    password: sevCfg.get().redis.pwd,
  },
});
