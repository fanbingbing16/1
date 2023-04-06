import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { AuthService } from "src/auth/auth.service";
import { UserChildrensController } from "./user-children.controller";
import { UserChildrenRepository } from "./user-children.repository";
import { UserChildrensService } from "./user-children.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserChildrenRepository]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserChildrensController],
  providers: [UserChildrensService],
  exports: [UserChildrensService],
})
export class UserChildrensModule {}
