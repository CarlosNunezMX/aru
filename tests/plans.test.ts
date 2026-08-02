import { beforeAll, describe, test, expect } from "bun:test";
import Session from "./_session";
import { PlanesEstudios } from "../source/modules";
import { Plan } from "../source/interfaces";

describe("Student Plans", async () => {
  const session = await Session;
  let plans = await PlanesEstudios(session);

  test("Test Student Plan", () => {
    expect(plans).toBeArray();
    if (plans.length > 0) return;

    const plan = plans[0] as Plan;
    expect(plan.admissionPeriod).toBeString();
    expect(plan.currentPeriod).toBeString();

    expect(plan.certification).toBeString();
    expect(plan.email).toBeString();

    expect(plan.host).toBeString();
    expect(plan.hostAcronym).toBeString();
    expect(plan.hostId).toBeString();
    expect(plan.oldHostId).toBeString();
    expect(plan.venue).toBeString();
    expect(plan.venueId).toBeString();
    expect(plan.level).toBeString();

    expect(plan.program).toBeString();
    expect(plan.programId).toBeString();
    expect(plan.status).toBeString();
    expect(plan.statusId).toBeString();
    expect(plan.statusType).toBeString();
  });
});
