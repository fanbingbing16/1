import { Injectable } from "@nestjs/common";
import { BaseCRUDService } from "src/common/service/crud/base.service";
import { User } from "../userInfo/user.entity";
import { CreateUserChildrenDto } from "./dto";
import { UserChildren } from "./user-children.entity";
import { UserChildrenRepository } from "./user-children.repository";

@Injectable()
export class UserChildrensService extends BaseCRUDService<UserChildren> {
  constructor(private userChildrenRepository: UserChildrenRepository) {
    super(userChildrenRepository);
  }

  /**
   * 创建儿童档案
   * @param createUserChildrenDto
   * @param currentUser
   * @returns
   */
  async createStudent(
    createUserChildrenDto: CreateUserChildrenDto,
    currentUser: User
  ): Promise<UserChildren> {
    const userChildren = new UserChildren();
    return this.userChildrenRepository.save(
      Object.assign(userChildren, {
        ...createUserChildrenDto,
        userId: currentUser.id,
      })
    );
  }
}
