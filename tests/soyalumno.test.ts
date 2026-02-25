import { expect, test } from "bun:test";
import { Card } from "../source/interfaces/modules/soyalumno";
import {Credencial} from "../source/modules/soyalumno/credencial";

const user: Card = await Credencial(process.env["LEO_USER"]!);

console.log(user.foto)