import type { OfertaCentro } from "@interfaces/modules/Oferta";
import type { Client } from "source/client";

export async function Centros(
  client: Client
): Promise<OfertaCentro[]> {
  const url = "https://leoalumnos-svc.udg.mx/alum/api/programas/centros";
  return await client.fetch.fetch<OfertaCentro[]>(url);
}
export default Centros;
