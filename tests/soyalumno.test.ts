import { expect, test } from "bun:test";
import { Card } from "../source/interfaces/modules/soyalumno";
import Credencial from "../source/modules/soyalumno/credencial";

const user: Card = await Credencial(process.env["LEO_USER"]!);

test("Test credential service", () => {
  expect(user).toBeObject();
  expect(user.error).toBeUndefined();
});

test("Test credential fields", () => {
  expect(user.apellido_materno).toBeString();
  expect(user.apellido_paterno).toBeString();
  expect(user.centro).toBeString();
  expect(user.tarjeta_informador).toBeArray();
  expect(user.centroDesc).toBeString();
  expect(user.curp).toBeString();
  expect(user.imss).toBeString();
  expect(user.nombre).toBeString();
  expect(user.sede).toBeString();  
  
  expect(user.firma).toBeString();
  expect(user.foto).toBeString();
});
