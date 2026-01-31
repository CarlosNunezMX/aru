import buildURL from "@common/url";
import type { Centros } from "@interfaces/Centros";
import type { OfertaCarreras } from "@interfaces/modules/Oferta";
import type { Client } from "source/client";

export async function Carreras(client: Client, centro: string): Promise<OfertaCarreras<Centros>[]> {
  const url = buildURL(
    "https://leoalumnos-svc.udg.mx/alum/api/programas/:centro/programas-centros",
    {
      centro,
    },
  );

  return await client.fetch.fetch<OfertaCarreras<Centros>[]>(url);
}

