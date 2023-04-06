// //平台类型
// export enum Platform {
//   android = "android", //安卓
//   ios = "ios", //IOS
//   web = "web", //网页
//   other = "other", //其他
// }

//渠道枚举
export enum Ptype {
  gm = "gm", //官方平台
  weixin = "weixin", //微信小程序
}

//道具类型
export enum ItemKind {
  lbEver = 1, //永久量表
  lbOne = 2, //单个量表
  // weixin = "weixin", //微信小程序
}

interface AllCfg {
  //平台信息
  sdk: {
    info: {
      //平台物料表
      [sdkId: string]: {
        ptype: Ptype;
        phoneId: string;
        param: { [key: string]: string };
        secret: { [key: string]: string };
      };
    };
    pack: {
      //打包信息
      [pid: string]: {
        name: string;
        sevId: string; //服务器ID
        loginSdk: string; //登录sdkId
        phoneId: string; //手机号分组
        //其他配置
      };
    };
    sev: {
      //服务器配置
      [sevId: string]: {
        name: string; //服务器名字
        domain: string; //访问地址
        callBack: string; //回调地址
        admin: string; //后台域名
        //静态文件地址?
      };
    };
  };
  //业务配置
  const: {
    sonMax: number; //允许的家属上限
  };
}

export const allCfg: AllCfg = {
  sdk: {
    info: {
      //平台信息配置
      "1": {
        ptype: Ptype.gm,
        phoneId: "1",
        param: { appid: "1" },
        secret: {},
      },
      "2": {
        ptype: Ptype.weixin,
        phoneId: "1",
        param: { appid: "wxee4df345d8e35502" },
        secret: {
          AesKey: "aabcfed64a86fd7165f89d7faa4ca5d2",
        },
      },
    },
    pack: {
      //前端打包配置
      "1001": {
        name: "星韩本地官方登录",
        sevId: "1", //服务器ID
        loginSdk: "1", //登录sdkId
        phoneId: "1", //手机号分组
      },
      "1002": {
        name: "星韩本地微信小程序",
        sevId: "1", //服务器ID
        loginSdk: "2", //登录sdkId
        phoneId: "1", //手机号分组
      },
      "2001": {
        name: "黄牛本地官方登录",
        sevId: "2", //服务器ID
        loginSdk: "1", //登录sdkId
        phoneId: "1", //手机号分组
      },
      "2002": {
        name: "黄牛本地微信小程序",
        sevId: "2", //服务器ID
        loginSdk: "2", //登录sdkId
        phoneId: "1", //手机号分组
      },
      "3001": {
        name: "测试服官方登录",
        sevId: "3", //服务器ID
        loginSdk: "1", //登录sdkId
        phoneId: "1", //手机号分组
      },
      "3002": {
        name: "测试服微信小程序",
        sevId: "3", //服务器ID
        loginSdk: "2", //登录sdkId
        phoneId: "1", //手机号分组
      },
      "4001": {
        name: "正式服官方登录",
        sevId: "4", //服务器ID
        loginSdk: "1", //登录sdkId
        phoneId: "1", //手机号分组
      },
      "4002": {
        name: "正式服微信小程序",
        sevId: "4", //服务器ID
        loginSdk: "2", //登录sdkId
        phoneId: "1", //手机号分组
      },
    },
    sev: {
      //服务器配置
      "1": {
        name: "星韩本地测试",
        domain: "http://192.168.1.37:3000",
        callBack: "http://192.168.1.37:3000",
        admin: "http://192.168.1.37:3000",
      },
      "2": {
        name: "黄牛本地测试",
        domain: "http://192.168.1.156:3000",
        callBack: "http://192.168.1.156:3000",
        admin: "http://192.168.1.156:3000",
      },
      "3": {
        name: "测试机",
        domain: "http://192.168.1.156:3000",
        callBack: "http://192.168.1.156:3000",
        admin: "http://192.168.1.156:3000",
      },
      "4": {
        name: "正式服",
        domain: "https://hospital-api.shituoda.com",
        callBack: "https://hospital-api.shituoda.com",
        admin: "https://hospital-api.shituoda.com",
      },
    },
  },
  //业务常量配置
  const: {
    sonMax: 10, //允许的家属上限
  },
};
