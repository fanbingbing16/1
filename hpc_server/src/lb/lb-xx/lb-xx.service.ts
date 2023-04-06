import { Injectable } from "@nestjs/common";
import { BaseCRUDService } from "src/common/service/crud/base.service";
import { LbXx } from "./entity/lb-xx.entity";
import { LbXxRepository } from "./lb-xx.repository";
@Injectable()
export class LbXxService extends BaseCRUDService<LbXx> {
  constructor(private lbXxRepository: LbXxRepository) {
    super(lbXxRepository);
  }
}
