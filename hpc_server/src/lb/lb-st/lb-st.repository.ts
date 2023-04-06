import { EntityRepository, Repository } from "typeorm";
import { LbSt } from "./entity/lb-st.entity";

@EntityRepository(LbSt)
export class LbStRepository extends Repository<LbSt> {}
