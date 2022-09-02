import { randomInt } from "crypto";
import * as bcrypt from "bcrypt";
import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

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

/**
 * Check if a given resource exists or is not deleted.
 * Can throw an error if the resource is not valid or return boolean
 * @param id Id of the resource to search
 * @param entity Name of the entity where to check
 * @param throwError If set to true throws error on not found or resource deleted. Default false
 * @returns boolean indicating that the resource is valid or not.
 */
export async function checkForExistance(
  id: string,
  entity: string,
  throwError = false
) {
  const prisma = new PrismaClient();
  const search = await prisma[entity].findUnique({ where: { id } });
  if (!search && throwError) throw new NotFoundException();
  if (search.isDeleted && throwError)
    throw new ForbiddenException(
      "The resource is already deleted and cannot be edited",
      `Resource (${id}) doesn't exists`
    );
  return search && !search.isDeleted;
}
