import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { config } from "./config/config";
import { BoardsModule } from "./models/boards/board.module";
import { FoldersModule } from "./models/folders/folder.module";
import { TagsModule } from "./models/tags/tag.module";
import { TasksModule } from "./models/tasks/task.module";
import { UsersModule } from "./models/users/user.module";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    FoldersModule,
    BoardsModule,
    TagsModule,
    TasksModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: config.DB.HOST,
      port: config.DB.PORT,
      username: config.DB.USERNAME,
      password: config.DB.PASSWORD,
      database: config.DB.NAME,
      autoLoadEntities: true,
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
