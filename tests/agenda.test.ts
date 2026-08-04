import { describe, test, expect } from "bun:test";
import { IsAgendaOpened } from "../source/modules/agenda";
import Session from "./_session";
describe("Is registry enabled", async () => {
  const session = await Session;
  const isOpened = await IsAgendaOpened(session, {
    cycleId: "2026-B",
    hostId: "D",
    programId: "INFO",
  });
  if (typeof isOpened === "boolean") expect(isOpened).toBeBoolean();
  else
    test("Test registry not opened", () => {
      expect(isOpened).toBeObject();

      expect(isOpened.start).toBeDate();
      expect(isOpened.start).toBeValidDate();

      expect(isOpened.end).toBeDate();
      expect(isOpened.end).toBeValidDate();
    });
});
