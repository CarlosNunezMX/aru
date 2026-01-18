import { expect, test } from "bun:test";
import Session from "./_session";
import { StudentData } from "../source/modules";

const session = await Session;
const results = await StudentData(session);

test("Test Student Data fields", () => {
  expect(results).toBeObject();
  expect(results.genero).toBeString();
  expect(results.tiposangre).toBeDefined();
  expect(results.desctiposangr).toBeDefined();
  expect(results.lugadomicilio).toBeDefined();
  expect(results.alumcodigo).toBeString();
  expect(results.nombre).toBeString();
  expect(results.fechnacimient).toBeString();
  expect(results.curp).toBeString();
  expect(results.rfc).toBeDefined();
  expect(results.imss).toBeString();
  expect(results.email).toBeString();
  expect(results.teleemergenci).toBeString();
  expect(results.domicilio).toBeString();
  expect(results.lugadomicilioDB).toBeString();
});

test("Test Student Data Subfields", () => {
  expect(results.lugadomicilio).toBeObject();
  expect(results.lugadomicilio.pais).toBeString();
  expect(results.lugadomicilio.estado).toBeString();
  expect(results.lugadomicilio.municipio).toBeString();
  expect(results.lugadomicilio.cp).toBeString();
  expect(results.foto).toBeString();
});
