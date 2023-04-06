import { Enforcer, newEnforcer } from "casbin";
import TypeORMAdapter from "typeorm-adapter";
import * as path from "path";
import { sevCfg } from "src/config/sevCfg";

let enforcer: Enforcer;

export const casbinOptions = async (): Promise<Enforcer> => {
  const dbCfg = sevCfg.get().database;

  const adapter = await TypeORMAdapter.newAdapter({
    type: "mysql",
    host: dbCfg.host,
    port: dbCfg.port,
    username: dbCfg.name,
    password: dbCfg.pwd,
    database: dbCfg.username,
  });

  if (!enforcer) {
    enforcer = await newEnforcer(
      path.resolve("./src/config/casbin/rbac_with_domains_model.conf"),
      adapter
    );
    enforcer.enableAutoSave(true);
    await enforcer.loadPolicy();
  }

  return enforcer;
};
