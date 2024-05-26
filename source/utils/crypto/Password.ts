import {genSaltSync, hashSync, compareSync} from "bcrypt";
export function encryptPassword(password: string){
    const salt = genSaltSync(10, "a");
    return hashSync(password, salt);
}