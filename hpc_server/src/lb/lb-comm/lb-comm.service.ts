import { Injectable } from "@nestjs/common";
import { BaseCRUDService } from "src/common/service/crud/base.service";
import { LbComm } from "./entity/lb-comm.entity";
import { LbCommRepository } from "./lb-comm.repository";

@Injectable()
export class LbCommService extends BaseCRUDService<LbComm> {
  constructor(private lbCommRepository: LbCommRepository) {
    super(lbCommRepository);
  }
}
