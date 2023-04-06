import { writeFile } from "fs";

interface SCfg {
  sevId: string;
  database: {
    //数据库
    host: string; //地址
    port: number; //端口
    name: string; //库名
    username: string; //用户
    pwd: string; //密码
    sync: boolean; //?
  };
  redis: {
    host: string; //地址
    port: number; //端口
    pwd: string; //密码
  };

  jwt: {
    //登录加密配置
    secret: string;
    EXPIRES_IN: string;
    REFRESH_SECRET: string;
    REFRESH_EXPIRES_IN: string; //网页登录超时时间?
  };
}

/**
 * 获取服务器 物理机 配置
 */
class SevCfg {
  get(): SCfg {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const config = require(`../../cfg/sevCfg.json`);

    return config;
    /*{
      sevId: "1", //本服务器编号  对应 allCfg.sdk.sev[sevId]
      database: {
        host: "127.0.0.1",
        port: 3306,
        name: "hpc_test",
        username: "root",
        pwd: "d.H(uJ01",
        sync: false,
      },
      redis: {
        host: "127.0.0.1",
        port: 6379,
        pwd: "123456",
      },
      jwt: {
        secret: "abcdefgh",
        EXPIRES_IN: "3600s",
        REFRESH_SECRET: "hgfedcba",
        REFRESH_EXPIRES_IN: "604800s",
      },
    };*/
  }
}

export const sevCfg: SevCfg = new SevCfg();
