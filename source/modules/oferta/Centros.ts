import type { AruOferta } from "@interfaces/modules/Oferta";
import type { Client } from "source/client";

export async function Centros(
  client: Client
): Promise<AruOferta.Centros[]> {
  const url = "https://leoalumnos-svc.udg.mx/alum/api/programas/centros";
  return await client.fetch.fetch<AruOferta.Centros[]>(url);
}
export default Centros;
