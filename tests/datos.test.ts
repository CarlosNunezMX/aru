import { expect, test } from "bun:test";
import Session from "./_session";
import { Student } from "../source/modules";
import { Student as TStudent } from "../source/interfaces";
import { describe } from "node:test";

describe("Test for Student Data", async () => {
  const session = await Session;
  const student = (await Student(session)) as TStudent;

  test("Student Data fields", () => {
    expect(student).toBeObject();

    expect(student.studentId).toBeString();
    expect(student.studentId).toHaveLength(9);

    expect(student.genre).toBeString();
    expect(student.birthdate).toBeDate();

    expect(student.curp).toBeString();
    expect(student.email).toBeString();
    expect(student.imss).toBeString();
    expect(student.emergencyPhone).toBeString();

    expect(student.fullAddress).toBeString();
  });

  test("Student Address Fields", () => {
    expect(student.address).toBeObject();
    expect(student.address.city).toBeString();
    expect(student.address.country).toBeString();
    expect(student.address.state).toBeString();
    expect(student.address.street).toBeString();
    expect(student.address.zipCode).toBeString();
  });
});
