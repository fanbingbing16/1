import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"; //swagger 接口文档生成器 / 后端自测工具
import { LoggerMiddleware } from "./common/middleware/logger.middleware";

//启动函数
async function bootstrap() {
  //实例化 NestFactory 核心类
  const app = await NestFactory.create(AppModule, { cors: { origin: "*" } });
  app.useGlobalPipes(new ValidationPipe());

  app.use(new LoggerMiddleware().use);

  //swagger 自动文档配置
  const options = new DocumentBuilder()
    .setTitle("hpc_api") //api 文档标题
    .setDescription("儿童心理评测 接口文档") //api 文档描述
    .setVersion("1.0") //api 文档版本
    .addTag("接口") //api 标签
    .addBearerAuth(
      //token 鉴权
      {
        // I was also testing it without prefix 'Bearer ' before the JWT
        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
        name: "Authorization",
        bearerFormat: "Bearer", // I`ve tested not to use this field, but the result was the same
        scheme: "Bearer", 
        type: "http", // I`ve attempted type: 'apiKey' too
        in: "Header",
      },
      "Authorization"
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  //侦听端口 启动程序
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
