import { Injectable } from "@nestjs/common";
import { BaseCRUDService } from "src/common/service/crud/base.service";
import { LbAdv } from "./entity/lb-adv.entity";
import { LbAdvRepository } from "./lb-adv.repository";
import * as bcrypt from "bcrypt";
import { SignupInput } from "src/auth/dto/signup.input";
import { SigninInput } from "src/auth/dto/signin.input";

@Injectable()
export class LbAdvService extends BaseCRUDService<LbAdv> {
  constructor(private lbAdvRepository: LbAdvRepository) {
    super(lbAdvRepository);
  }
}
