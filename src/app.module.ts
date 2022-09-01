import { Module } from "@nestjs/common";
import { APP_FILTER, APP_GUARD } from "@nestjs/core";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { PgExceptionFilter } from "./common/exceptions/pg-exception.filter";
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
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: PgExceptionFilter,
    },
  ],
})
export class AppModule {}
