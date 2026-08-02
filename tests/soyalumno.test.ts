import { expect, test } from "bun:test";
import { Card } from "../source/interfaces/modules/credential";
import { Credential } from "../source/modules/credential";

const user: Card = await Credential(process.env["LEO_USER"]!);

console.log(user.foto);
