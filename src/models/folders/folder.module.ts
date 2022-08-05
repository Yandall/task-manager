import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FoldersController } from "./folder.controller";
import { Folder } from "./folder.entity";
import { FoldersService } from "./folder.service";


@Module({
    imports: [TypeOrmModule.forFeature([Folder])],
    controllers: [FoldersController],
    providers: [FoldersService]
})
export class FoldersModule {}