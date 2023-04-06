import { EntityRepository, Repository } from "typeorm";
import { LbXx } from "./entity/lb-xx.entity";

@EntityRepository(LbXx)
export class LbXxRepository extends Repository<LbXx> {}
