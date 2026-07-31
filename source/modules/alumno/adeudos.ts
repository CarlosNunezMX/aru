import buildURL from "@common/url";
import type { Client } from "source/client";

export async function Adeudos(client: Client) {
  const url = buildURL("https://leoalumnos-svc.udg.mx/alum/api/alumnos-sii/:codigo/adeudos", {
    codigo: client.session!.userID
  });

  // TODO: Type this
  const res = await client.fetch.fetch<string | never[]>(url);
  if (typeof res === "string") return [];

  return res;
}

export default Adeudos
