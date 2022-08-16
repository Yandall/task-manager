import { randomId } from "src/common/util";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("tags")
export class Tag {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  owner: number;

  @Column({ type: "jsonb", default: {} })
  config: { [key: string]: unknown };

  constructor() {
    this.id = randomId();
  }
}
