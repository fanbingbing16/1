import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { CategoryRelationsModule } from "src/sys/categoryRelation/category-relation.module";
import { LbsController } from "./lbs.controller";
import { LbsRepository } from "./lbs.repository";
import { LbsService } from "./lbs.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([LbsRepository]),
    forwardRef(() => AuthModule),
    CategoryRelationsModule,
  ],
  controllers: [LbsController],
  providers: [LbsService],
  exports: [LbsService],
})
export class LbsModule {}
