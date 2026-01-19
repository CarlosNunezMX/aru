import buildURL from "@common/url";
import type { AruOferta } from "@interfaces/modules/Oferta";
import type { Client } from "source/client";

export async function Carreras(client: Client, centro: string): Promise<AruOferta.Carreras[]> {
  const url = buildURL(
    "https://leoalumnos-svc.udg.mx/alum/api/programas/:centro/programas-centros",
    {
      centro,
    },
  );

  return await client.fetch.fetch<AruOferta.Carreras[]>(url);
}

