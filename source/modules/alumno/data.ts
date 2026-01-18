import buildURL from "@common/url";
import { type PersonalData } from "@interfaces/modules/PersonalData";
import type { Client } from "source/client";

async function StudentData(client: Client): Promise<PersonalData> {
  const { fetch, session } = client;
  const url = buildURL(
    "https://leoalumnos-svc.udg.mx/alum/api/alumnos-sii/:codigo/datos-personales",
    { codigo: session!.userID },
  );
  return fetch.fetch<PersonalData>(url);
}
export default StudentData;
