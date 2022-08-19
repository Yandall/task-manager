import { formatISO } from "date-fns";
import { randomId } from "src/common/util";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("boards")
export class Board {
  @PrimaryColumn()
  id: string;

  @Column()
  folderId: string;

  @Column()
  folderPath: string;

  @Column()
  owner: number;

  @Column({ type: "jsonb", default: {} })
  config: { [key: string]: unknown };

  @Column()
  name: string;

  @Column()
  createdDate: string;

  constructor() {
    this.id = randomId();
    this.createdDate = formatISO(new Date());
  }
}
