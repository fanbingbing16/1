import { Injectable } from "@nestjs/common";
import { BaseCRUDService } from "src/common/service/crud/base.service";
import { LbSt } from "./entity/lb-st.entity";
import { LbStRepository } from "./lb-st.repository";

@Injectable()
export class LbStService extends BaseCRUDService<LbSt> {
  constructor(private lbStRepository: LbStRepository) {
    super(lbStRepository);
  }
}
