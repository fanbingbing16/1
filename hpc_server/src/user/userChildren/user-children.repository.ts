import { EntityRepository, Repository } from "typeorm";
import { UserChildren } from "./user-children.entity";

@EntityRepository(UserChildren)
export class UserChildrenRepository extends Repository<UserChildren> {}
