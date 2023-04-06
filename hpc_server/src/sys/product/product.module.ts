import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { CategoryRelationsModule } from "../categoryRelation/category-relation.module";
import { ProductsController } from "./product.controller";
import { ProductRepository } from "./product.repository";
import { ProductsService } from "./product.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductRepository]),
    forwardRef(() => AuthModule),
    CategoryRelationsModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
