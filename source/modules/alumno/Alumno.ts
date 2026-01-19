import buildURL from "@common/url";
import { type IAlumno } from "@interfaces/modules/Alumno";
import type { Client } from "source/client";

export async function Alumno(client: Client): Promise<IAlumno> {
  const url = buildURL(
    "https://leoalumnos-svc.udg.mx/alum/api/alumnos-sii/:codigo/datos-personales",
    { codigo: client.session!.userID },
  );
  const res = await client.fetch.fetch<IAlumno>(url) as IAlumno;
  return res;
}
