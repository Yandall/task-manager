import { randomId } from "src/common/util";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "folders" })
export class Folder {
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
