import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateFolderDto } from "./dto/create-folder.dto";
import { Folder } from "./folder.entity";

@Injectable()
export class FoldersService {
  constructor(
    @InjectRepository(Folder) private folderRepository: Repository<Folder>
  ) {}

  findAll(owner: number) {
    return this.folderRepository.findBy({ owner });
  }

  create(folderDto: CreateFolderDto) {
    const newFolder = this.folderRepository.create(folderDto);
    return this.folderRepository.insert(newFolder);
  }
}
