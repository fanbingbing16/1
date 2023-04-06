import { EntityRepository, Repository } from "typeorm";
import { LbAdv } from "./entity/lb-adv.entity";

@EntityRepository(LbAdv)
export class LbAdvRepository extends Repository<LbAdv> {}
