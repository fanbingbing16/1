import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { AuthService } from "src/auth/auth.service";
import { CategoryRelationsController } from "./category-relation.controller";
import { CategoryRelationRepository } from "./category-relation.repository";
import { CategoryRelationsService } from "./category-relation.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryRelationRepository]),
    forwardRef(() => AuthModule),
  ],
  controllers: [CategoryRelationsController],
  providers: [CategoryRelationsService],
  exports: [CategoryRelationsService],
})
export class CategoryRelationsModule {}
