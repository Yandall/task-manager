import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTagDto } from "./dto/create-tags.dto";
import { Tag } from "./tag.entity";

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tag) private tagRepository: Repository<Tag>) {}

  getTagsByOwner(owner: number) {
    return this.tagRepository.findBy({ owner });
  }

  createTag(createTagDto: CreateTagDto) {
    const newTag = this.tagRepository.create(createTagDto);
    return { dbRes: this.tagRepository.insert(newTag), output: newTag };
  }
}
