import { randomInt } from "crypto";
import * as bcrypt from "bcrypt";

/**
 * Creates a random string
 * @param idSize Size for the generated id. Default is 12
 * @returns Generated id
 */
export function randomId(idSize = 12): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890-_";
  const charLenght = characters.length;
  let id = "";
  for (let i = 0; i < idSize; i++) {
    id += characters.charAt(randomInt(charLenght));
  }
  return id;
}

export function hashPassword(password: string) {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
}
