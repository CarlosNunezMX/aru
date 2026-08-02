import type { Client } from "@client";
import { buildURL } from "@common/url";

export async function Adeudos(client: Client) {
  const studentId = client.session!.studentId;
  const url = buildURL(
    "https://leoalumnos-svc.udg.mx/alum/api/alumnos-sii/:studentId/adeudos",
    { studentId },
  );

  // TODO: Type this
  const res = await client.fetch.fetch<string | never[]>(url);
  if (typeof res === "string") return [];

  return res;
}

export default Adeudos;
