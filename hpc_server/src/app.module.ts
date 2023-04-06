import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { LocalModule } from "./callback/local/local.module";
import { WeixinModule } from "./callback/weixin/weixin.module";
import { typeormOptions } from "./common/config/typeorm/typeorm.config";
import { CoreModule } from "./core/core.module";
import { LbAdvsModule } from "./lb/lb-adv/lb-adv.module";
import { LbCommModule } from "./lb/lb-comm/lb-comm.module";
import { LbGsModule } from "./lb/lb-gs/lb-gs.module";
import { LbsModule } from "./lb/lb-info/lbs.module";
import { LbStModule } from "./lb/lb-st/lb-st.module";
import { LbXxModule } from "./lb/lb-xx/lb-xx.module";
import { GmLoginsModule } from "./sdk/gmLogin/gm-login.module";
import { OpenAuthModule } from "./sdk/openAuth/open-auth.module";
import { ArticlesModule } from "./sys/article/article.module";
import { CategorysModule } from "./sys/category/category.module";
import { ProductsModule } from "./sys/product/product.module";
import { SettingsModule } from "./sys/setting/setting.module";
import { UserChildrensModule } from "./user/userChildren/user-children.module";
import { UsersModule } from "./user/userInfo/user.module";
import { UserItemsModule } from "./user/userItem/user-item.module";
import { UserOrdersModule } from "./user/userOrder/user-order.module";
import { UserRecordsModule } from "./user/userRecord/user-record.module";

@Module({
  imports: [
    JwtModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: [".env.development.local", ".env.development"],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: typeormOptions,
    }),
    CoreModule,
    GmLoginsModule,
    AuthModule,
    UsersModule,
    OpenAuthModule,
    SettingsModule,
    LbsModule,
    LbAdvsModule,
    LbGsModule,
    LbStModule,
    LbCommModule,
    LbXxModule,
    UserRecordsModule,
    UserOrdersModule,
    UserChildrensModule,
    UserItemsModule,
    ProductsModule,
    LocalModule,
    WeixinModule,
    ArticlesModule,
    CategorysModule,
  ],
})
export class AppModule {}
