import type { Client } from "@client";
import { buildURL } from "@common/url";
import type { Schedule as TSchedule } from "@interfaces/modules/schedules";
import { ScheduleTransformer } from "@transformers/schedule";

interface ScheduleProps {
  programId: string;
  cycleId: string;
}

export async function Schedule(
  client: Client,
  { programId, cycleId }: ScheduleProps,
): Promise<TSchedule.Item[]> {
  const studentId = client.session!.studentId;

  const url = buildURL(
    "https://leoalumnos-svc.udg.mx/alum/api/alumnos-esc/:studentId/:programId/:cycleId/horarios",
    { programId, cycleId, studentId },
  );

  const items = await client.fetch.fetch<TSchedule.ItemRaw[]>(url);
  return items.map((item) => ScheduleTransformer.transform(item));
}
