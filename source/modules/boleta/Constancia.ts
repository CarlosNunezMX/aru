import buildURL from "@common/url";
import type { Carreras } from "@interfaces/carreras/Carreras";
import type { Constancia } from "@interfaces/modules/status/Constancia";
import type { Client } from "source/client";

interface Props {
  carrera: Carreras.AnyCentro;
  ciclo: string;
}
export default async function Constancia(client: Client, { carrera, ciclo }: Props) {
  const url = buildURL(
    "https://leoalumnos-svc.udg.mx/alum/api/alumnos-esc/:codigo/:carrera/:ciclo/constancias",
    {
      carrera,
      ciclo,
      codigo: client.session.userID,
    },
  );

  const req = await client.fetch.fetch<Constancia>(url);
  return req;
}
