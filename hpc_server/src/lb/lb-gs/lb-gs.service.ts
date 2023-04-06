import { Injectable } from "@nestjs/common";
import { BaseCRUDService } from "src/common/service/crud/base.service";
import { LbGs } from "./entity/lb-gs.entity";
import { LbGsRepository } from "./lb-gs.repository";

@Injectable()
export class LbGsService extends BaseCRUDService<LbGs> {
  constructor(private lbGsRepository: LbGsRepository) {
    super(lbGsRepository);
  }
}
