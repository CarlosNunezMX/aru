import type { Client } from "@client";
import type { Kardex as TKardex } from "@interfaces/index";

interface Props {
  hostId: string;
  currentCycleId: string;
  admissionCycleId: string;
  programId: string;
  venueId: string;
}

export async function Kardex(
  client: Client,
  { admissionCycleId, currentCycleId, hostId, programId, venueId }: Props,
): Promise<TKardex> {
  const studentId = client.session.studentId;
  const url = "https://leoalumnos-svc.udg.mx/alum/api/alumnos-esc/kardex";
  const req = await client.fetch.fetch<TKardex>(url, {
    body: JSON.stringify({
      idalumno: studentId,
      idcentro: hostId,
      idciclo: currentCycleId,
      idcicloadmi: admissionCycleId,
      idprograma: programId,
      idsede: venueId,
    }),
  });

  return req;
}
