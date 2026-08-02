import type { Client } from "@client";
import { buildURL } from "@common/url";

import type { RawReport, Report as TReport } from "@interfaces/modules/report";
import { ReportTransformer } from "@transformers/report";

interface ReportProps {
  cycleId: string;
  programId: string;
}

export async function Report(
  client: Client,
  { cycleId, programId }: ReportProps,
): Promise<TReport[]> {
  const studentId = client.session.studentId;
  const url = buildURL(
    "https://leoalumnos-svc.udg.mx/alum/api/alumnos-esc/:studentId/:programId/:cycleId/boletas",
    { studentId, cycleId, programId },
  );

  const report = await client.fetch.fetch<RawReport[]>(url);
  return report.map((course) => ReportTransformer(course));
}
