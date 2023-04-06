export interface OpenAuthVo {
  name: string;
  age: number;
  breed: string;
}

export interface accessWxInfo {
  access_token: string;
  expires_in: number;
}

export interface wxLoginInfo {
  openid: string;
  session_key: string;
  unionid: string;
  errcode: number;
  errmsg: string;
}

export interface wxPhoneVo {
  phoneNumber: string;
  purePhoneNumber: string;
  countryCode: number;
  watermark: {
    timestamp: number;
    appid: string;
  };
}
