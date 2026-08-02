import { describe, expect, test } from "bun:test";
import { Card } from "../source/interfaces";
import { Credential } from "../source/modules/credential";

describe("Student Identification", async () => {
  const card = (await Credential(process.env["LEO_USER"]!)) as Card;

  test("Test Student Identification Fields", () => {
    expect(card).toBeObject();

    expect(card.curp).toBeString();
    expect(card.curp).toHaveLength(18);

    expect(card.apellido_materno).toBeString();
    expect(card.apellido_paterno).toBeString();
    expect(card.nombre).toBeString();

    expect(card.centro).toBeString();
    expect(card.centroDesc).toBeString();
    expect(card.sede).toBeString();

    expect(card.imss).toBeString();
    expect(card.imss).toHaveLength(11);
  });
});
