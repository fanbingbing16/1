import { EntityRepository, Repository } from "typeorm";
import { UserRecord } from "./user-record.entity";

@EntityRepository(UserRecord)
export class UserRecordRepository extends Repository<UserRecord> {}
