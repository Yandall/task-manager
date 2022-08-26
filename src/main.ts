import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { PgExceptionFilter } from "./common/exceptions/pg-exception.filter";
import { config } from "./config/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new PgExceptionFilter());
  await app.listen(config.PORT);
}

bootstrap();
