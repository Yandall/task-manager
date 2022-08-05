import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardsController } from "./board.controller";
import { Board } from "./board.entity";
import { BoardsService } from "./board.service";

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  providers: [BoardsService],
  controllers: [BoardsController],
})
export class BoardsModule {}
