/**
 *  @TODO: Create a more pullish data container,
 *  and create it's transformer
 */
import type { Client } from "@client";
import { buildURL } from "@common/url";
import type { RawConstancy } from "@interfaces/modules";

interface Props {
  programId: string;
  cycleId: string;
}

export async function Constancy(
  client: Client,
  { cycleId, programId }: Props,
): Promise<RawConstancy> {
  const studentId = client.session.studentId;
  const url = buildURL(
    "https://leoalumnos-svc.udg.mx/alum/api/alumnos-esc/:studentId/:programId/:cycleId/constancias",
    { studentId, cycleId, programId },
  );

  const req = await client.fetch.fetch<RawConstancy>(url);
  return req;
}
