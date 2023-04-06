import { Injectable } from "@nestjs/common";
import { BaseCRUDService } from "src/common/service/crud/base.service";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";

@Injectable()
export class UsersService extends BaseCRUDService<User> {
  constructor(private userRepository: UserRepository) {
    super(userRepository);
  }
}
