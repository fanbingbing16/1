import { EntityRepository, Repository } from "typeorm";
import { LbComm } from "./entity/lb-comm.entity";

@EntityRepository(LbComm)
export class LbCommRepository extends Repository<LbComm> {}
