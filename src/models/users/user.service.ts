import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  create(userDto: CreateUserDto) {
    const newUser = this.userRepository.create(userDto);
    newUser.hashPassword();
    return { dbRes: this.userRepository.insert(newUser), output: {} };
  }

  async remove(email: string) {
    return this.userRepository.delete(email);
  }
}
