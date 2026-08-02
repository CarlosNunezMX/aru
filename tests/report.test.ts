import Session from "./_session";
import { PlanesEstudios, Report } from "../source/modules";
import { describe, expect, test } from "bun:test";
import { Plan, type Report as TReport } from "../source/interfaces";

describe("Student Report", async () => {
  const session = await Session;
  const plans = (await PlanesEstudios(session)) as Plan[];

  const active = plans.find((plan) => plan.statusId === "AC")!;
  const report = (await Report(session, {
    cycleId: active.currentPeriod,
    programId: active.programId,
  })) as TReport[];

  expect(report).toBeArray();
  const item = report[0];
  if (!item) return;

  test("Test Report Item", () => {
    expect(item).toBeObject();
    expect(item.courseId).toBeString();
    expect(item.cycleId).toBeString();
    expect(item.sectionId).toBeString();
  });

  test("Test Ordinary Item", () => {
    expect(item.ordinary).toBeObject();
    expect(item.ordinary.gradeString).toBeString();
    expect(item.ordinary.definitive).toBeBoolean();
  });

  if (item.extraordinary)
    test("Test Extraordinary Item", () => {
      expect(item.extraordinary).toBeObject();
      expect(item.extraordinary!.gradeString).toBeString();
      expect(item.extraordinary!.definitive).toBeBoolean();
    });
});
