import { formatISO } from "date-fns";
import { randomId } from "src/common/util";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "tasks" })
export class Task {
  @PrimaryColumn()
  id: string;

  @Column()
  createdDate: string;

  @Column()
  dueDate: string;

  @Column()
  owner: number;

  @Column()
  board: string;

  @Column({ type: "jsonb", default: {} })
  content: { [key: string]: unknown };

  @Column({ type: "jsonb", default: {} })
  config: { [key: string]: unknown };

  constructor() {
    this.id = randomId();
    this.createdDate = formatISO(new Date());
  }
}
