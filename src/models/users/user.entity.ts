import { Column, Entity, PrimaryColumn } from "typeorm";
import * as bcrypt from "bcrypt";

@Entity({ name: "users" })
export class User {
  @PrimaryColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ type: "jsonb", default: {} })
  config: { [key: string]: unknown };

  hashPassword() {
    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(this.password, salt);
  }
}
