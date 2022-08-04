import { randomInt } from "crypto"

export function randomId(idLenght = 12): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890-_'
    const charLenght = characters.length
    let id = ''
    for (let i = 0; i < idLenght; i++) {
        id += characters.charAt(randomInt(charLenght))        
    }
    return id
}