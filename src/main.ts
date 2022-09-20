import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { PgExceptionFilter } from "./common/exceptions/pg-exception.filter";
import { config } from "./config/config";
import { PrismaService } from "./prisma.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new PgExceptionFilter());
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutDownHooks(app);
  await app.listen(config.PORT);
}

bootstrap();
