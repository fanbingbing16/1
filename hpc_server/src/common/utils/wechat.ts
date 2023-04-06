import { get, post } from "./request";
import { ConfigService } from "@nestjs/config";

// 生成二维码ticket
export async function getWxQrUtils(
  params: any,
  key?: any,
  expire_seconds?: any
): Promise<any> {
  const configService = new ConfigService();
  const appid = configService.get<string>("SHITUODA_APPID");
  // const secret = this.configService.get<string>(
  //   "SHITUODA_SECRET"
  // );
  // console.log('==appid+secret==',appid,secret)
  // let url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`
  // let response = await get(url);
  // console.log('==get==',response)
  // if (typeof response == "string") {
  //   response = JSON.parse(response);
  // }
  // if(response == null || response.access_token == null){
  //   throw new Error("access_token获取失败");
  // }
  let response = await get(
    // "https://hospital-wechat-1592869-1309456656.ap-shanghai.run.tcloudbase.com/get_token"
    `https://hospital-wechat-1592869-1309456656.ap-shanghai.run.tcloudbase.com/authorizer_access_token/${appid}`
  );
  if (typeof response == "string") {
    response = JSON.parse(response);
  }
  console.log("===========wehart-getToken-response=========", response);
  // let COMPONENT_ACCESS_TOKEN = "EMPTY";
  // if (response["value"]) {
  //     COMPONENT_ACCESS_TOKEN = response["value"];
  // }
  let authorizer_access_token = "EMPTY";
  if (response["token"]) {
    authorizer_access_token = response["token"];
  }

  const postUrl = `https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=${authorizer_access_token}`;
  const scene_str = {
    key,
    ...params,
  };
  const postData = {
    action_name: expire_seconds ? "QR_STR_SCENE" : "QR_LIMIT_STR_SCENE",
    expire_seconds,
    action_info: {
      scene: {
        scene_str: JSON.stringify(scene_str),
      },
    },
  };
  return await post(postUrl, { json: postData });
}

// 获取发送模板的地址
export async function getPostTemplateUrl(): Promise<any> {
  const configService = new ConfigService();
  const appid = configService.get<string>("SHITUODA_APPID");
  const secret = configService.get<string>("SHITUODA_SECRET");
  // console.log('==appid+secret==', appid, secret)
  // const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`
  // let response = await get(url);
  // console.log('==get==', response)
  // if (typeof response == "string") {
  //     response = JSON.parse(response);
  // }
  // if (response == null || response.access_token == null) {
  //     throw new Error("access_token获取失败");
  // }

  // const urlPost = `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${response.access_token}`

  let response = await get(
    // "https://hospital-wechat-1592869-1309456656.ap-shanghai.run.tcloudbase.com/get_token"
    `https://hospital-wechat-1592869-1309456656.ap-shanghai.run.tcloudbase.com/authorizer_access_token/${appid}`
  );
  if (typeof response == "string") {
    response = JSON.parse(response);
  }
  console.log("===========wechat-getToken-response=========", response);
  // let COMPONENT_ACCESS_TOKEN = "EMPTY";
  // if (response["value"]) {
  //     COMPONENT_ACCESS_TOKEN = response["value"];
  // }
  let authorizer_access_token = "EMPTY";
  if (response["token"]) {
    authorizer_access_token = response["token"];
  }

  const urlPost = `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${authorizer_access_token}`;

  return urlPost;
}
