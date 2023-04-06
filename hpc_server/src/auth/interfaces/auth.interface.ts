import { User } from "src/user/userInfo/user.entity";

export interface Passport {
  user: User;
  token: string;
  // refresh_token: string;
  // expired: number;
}

//对外提供接口
export interface IAuthService {
  //验证token
  validateToken(
    token: string
  ): Promise<{ isValid: boolean; user?: User; isExpired?: boolean, token?: any }>;
}
