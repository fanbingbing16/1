import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { AuthService } from "src/auth/auth.service";
import { CategorysController } from "./category.controller";
import { CategoryRepository } from "./category.repository";
import { CategorysService } from "./category.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryRepository]),
    forwardRef(() => AuthModule),
  ],
  controllers: [CategorysController],
  providers: [CategorysService],
  exports: [CategorysService],
})
export class CategorysModule {}
