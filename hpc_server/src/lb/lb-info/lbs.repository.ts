import { EntityRepository, Repository } from "typeorm";
import { Lbs } from "./entity/lb.entity";

@EntityRepository(Lbs)
export class LbsRepository extends Repository<Lbs> {}
