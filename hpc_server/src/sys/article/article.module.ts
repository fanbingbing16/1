import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { AuthService } from "src/auth/auth.service";
import { CategoryRelationsModule } from "../categoryRelation/category-relation.module";
import { ArticlesController } from "./article.controller";
import { ArticleRepository } from "./article.repository";
import { ArticlesService } from "./article.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([ArticleRepository]),
    forwardRef(() => AuthModule),
    CategoryRelationsModule,
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
  exports: [ArticlesService],
})
export class ArticlesModule {}
