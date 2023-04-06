import { allCfg } from "./allCfg"
import { pagid } from "./pagId"


//打包信息
export const basePag = allCfg.sdk.pack[pagid]
//服务器信息
export const baseSev = allCfg.sdk.sev[basePag.sevId]

//SDK信息  .ptype //平台类型  .param //平台参数
export const baseSdk = allCfg.sdk.info[basePag.loginSdk]



//物理地址
// export const baseUrl = baseSev.domain

