import { Injectable } from "@nestjs/common";
import { User } from "./users.model";

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    new User("1", "test@email.com", "qwerty", { hola: "hoes" }),
    new User("2", "23test@email.com", "qwerty12", { hola: "hoes" }),
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((u) => u.email === email);
  }
}
