import { randomId } from "src/common/util";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "folders" })
export class Folder {
  @PrimaryColumn()
  id: string;

  @Column()
  path: string;

  @Column()
  name: string;

  @Column()
  owner: number;

  @Column({ type: "jsonb", default: {} })
  config: unknown;

  constructor() {
    this.id = randomId()
  }
}
