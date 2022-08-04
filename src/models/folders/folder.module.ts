import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FolderController } from "./folder.controller";
import { Folder } from "./folder.entity";
import { FoldersService } from "./folder.service";


@Module({
    imports: [TypeOrmModule.forFeature([Folder])],
    controllers: [FolderController],
    providers: [FoldersService]
})
export class FolderModule {}