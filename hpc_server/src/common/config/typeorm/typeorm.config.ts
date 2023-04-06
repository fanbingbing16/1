import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { sevCfg } from "src/config/sevCfg";

export const typeormOptions = async (): Promise<TypeOrmModuleOptions> => ({
  type: "mysql",
  host: sevCfg.get().database.host,
  port: sevCfg.get().database.port,
  username: sevCfg.get().database.username,
  password: sevCfg.get().database.pwd,
  database: sevCfg.get().database.name,
  autoLoadEntities: true,
  synchronize: sevCfg.get().database.sync,
  logging: true,
});
