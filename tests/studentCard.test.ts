import { describe, expect, test } from "bun:test";
import { StudentCard as TStudentCard } from "../source/interfaces";
import { StudentCard } from "../source/modules";
import { OperationCanceledException } from "typescript";

describe("Student Identification", async () => {
  const card = (await StudentCard(process.env["LEO_USER"]!)) as TStudentCard;

  test("Test Student Identification Fields", () => {
    expect(card).toBeObject();

    expect(card.curp).toBeString();
    expect(card.curp).toHaveLength(18);

    expect(card.imss).toBeString();
    expect(card.imss).toHaveLength(11);

    expect(card.lastName).toBeString();
    expect(card.name).toBeString();

    expect(card.idHost).toBeString();
    expect(card.host).toBeString();
    expect(card.venue).toBeString();

    expect(card.tarjeta_informador).toBeArray();
  });

  test("Test Student Card Image Fields", () => {
    expect(card.signature).toBeString();
    expect(card.photo).toBeString();
    expect(card.qr).toBeString();
  });

  test("Test Student Card Rector Signature", () => {
    expect(card.rectorSignature).toBeObject();
    expect(card.rectorSignature.signaturer).toBeString();
    expect(card.rectorSignature.signature).toBeString();
  });
});
