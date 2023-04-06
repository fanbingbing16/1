import { EntityRepository, Repository } from "typeorm";
import { LbGs } from "./entity/lb-gs.entity";

@EntityRepository(LbGs)
export class LbGsRepository extends Repository<LbGs> {}
