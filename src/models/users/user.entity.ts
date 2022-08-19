import { Column, Entity, PrimaryColumn } from "typeorm";
import * as bcrypt from "bcrypt";
import { formatISO } from "date-fns";

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

  @Column()
  createdDate: string;

  constructor() {
    this.createdDate = formatISO(new Date());
  }

  hashPassword() {
    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(this.password, salt);
  }
}
