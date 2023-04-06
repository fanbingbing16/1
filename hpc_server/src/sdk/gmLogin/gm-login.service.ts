import { Injectable } from "@nestjs/common";
import { BaseCRUDService } from "src/common/service/crud/base.service";
import { CreateGmLoginDto, SigninDto, SignupDto } from "./dto";
import { GmLoginVo } from "./interfaces/gm-login.interface";
import { GmLogin } from "./gm-login.entity";
import { GmLoginRepository } from "./gm-login.repository";
import * as bcrypt from "bcrypt";
import { randomBytes } from "crypto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { getRandomString } from "src/common/utils/random";

@Injectable()
export class GmLoginsService extends BaseCRUDService<GmLogin> {
  constructor(private gmLoginRepository: GmLoginRepository) {
    super(gmLoginRepository);
  }
  async verifyPassword(data: SigninDto): Promise<GmLogin> {
    // const gmLogin = await GmLogin.createQueryBuilder()
    //   .select("GmLogin.id")
    //   //   .addSelect('GmLogin.nickname')
    //   //   .addSelect('GmLogin.avatar')
    //   .addSelect("GmLogin.password")
    //   .where({ account: data.account })
    //   .getOne();
    const gmLogin = await this.gmLoginRepository.findOne({
      where: {
        account: data.account,
      },
      select: ["id", "account", "password", "openid"],
    });
    if (!gmLogin) {
      throw new Error("账号不存在");
    }

    const correct = bcrypt.compareSync(data.password, gmLogin.password);
    if (!correct) {
      throw new Error("密码不正确");
    }
    gmLogin.openkey = await getRandomString(6);
    await this.gmLoginRepository.update(gmLogin.id, {
      openkey: gmLogin.openkey,
    });
    return gmLogin;
  }

  //注册新用户
  async register(data: SignupDto): Promise<GmLogin> {
    const gmLogin = GmLogin.create(data);
    gmLogin.password = bcrypt.hashSync(data.password, 10);
    const result = await gmLogin.save();
    if (!result) {
      throw new Error("用户注册失败");
    }
    return gmLogin;
  }

  async changePassword(data: ChangePasswordDto): Promise<boolean> {
    const gmLogin = await this.gmLoginRepository.findOne({
      where: { id: data.id },
      select: ["password"],
    });
    if (!gmLogin) {
      throw new Error("账号错误");
    }
    if (!bcrypt.compareSync(data.originalPassword, data.password)) {
      throw new Error("请输入确认的原密码");
    }
    const result = await GmLogin.update(data.id, {
      password: bcrypt.hashSync(data.password, 10),
    });
    if (!result) {
      return false;
    }
    return true;
  }
}
