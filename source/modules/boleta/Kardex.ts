import type { Kardex } from "@interfaces/modules/status/Kardex";
import type { Client } from "source/client";

interface Props {
  centro: string;
  ciclo: string;
  admision: string;
  carrera: string;
  sede: string;
}

export async function Kardex(
  client: Client,
  { admision, carrera, centro, ciclo, sede }: Props,
) {
  const url = "https://leoalumnos-svc.udg.mx/alum/api/alumnos-esc/kardex";
  const req = await client.fetch.fetch<Kardex>(url, {
    body: JSON.stringify({
      idalumno: client.session.userID,
      idcentro: centro,
      idciclo: ciclo,
      idcicloadmi: admision,
      idprograma: carrera,
      idsede: sede,
    }),
  });

  return req;
}
