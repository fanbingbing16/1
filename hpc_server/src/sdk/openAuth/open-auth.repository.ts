import { EntityRepository, Repository } from "typeorm";
import { OpenAuth } from "./entity/open-auth.entity";

@EntityRepository(OpenAuth)
export class OpenAuthRepository extends Repository<OpenAuth> {}
