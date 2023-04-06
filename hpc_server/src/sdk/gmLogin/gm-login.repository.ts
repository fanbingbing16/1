import { EntityRepository, Repository } from "typeorm";
import { GmLogin } from "./gm-login.entity";

@EntityRepository(GmLogin)
export class GmLoginRepository extends Repository<GmLogin> {}
