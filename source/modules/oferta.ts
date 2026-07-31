import type {
  OfertaCiclos,
  OfertaCarreras,
  OfertaCentro,
  Oferta,
} from "@interfaces/index";
import type { Client } from "source/client";
import type { Centros } from "@interfaces/centros";
import type { Carreras } from "@interfaces/carreras";
import buildURL from "@common/url";

// Centros para oferta academica
export async function OfertaAcademicaCentros(
  client: Client,
): Promise<OfertaCentro[]> {
  const url = "https://leoalumnos-svc.udg.mx/alum/api/programas/centros";
  return await client.fetch.fetch<OfertaCentro[]>(url);
}

export async function OfertaAcademicaCarreras(
  client: Client,
  centro: string,
): Promise<OfertaCarreras<Centros>[]> {
  const url = buildURL(
    "https://leoalumnos-svc.udg.mx/alum/api/programas/:centro/programas-centros",
    { centro },
  );

  return await client.fetch.fetch<OfertaCarreras<Centros>[]>(url);
}

export function OfertaCentroCiclos(
  client: Client,
  carrera: string,
): Promise<OfertaCiclos[]> {
  const url = buildURL(
    "https://leoalumnos-svc.udg.mx/alum/api/programas/:carrera/ciclos",
    { carrera },
  );
  return client.fetch.fetch<OfertaCiclos[]>(url);
}
// Oferta academica
interface OfertaParams {
  idCentro: string;
  carrera: Carreras.AnyCentro | string;
  ciclo: string;
}

export async function OfertaAcademica(
  client: Client,
  { carrera, ciclo, idCentro }: OfertaParams,
): Promise<Oferta<Centros, Carreras.AnyCentro>[]> {
  const url = "https://leoalumnos-svc.udg.mx/alum/api/ofertas/horas-nrc";
  return client.fetch.fetch(url, {
    method: "POST",
    body: JSON.stringify({
      idcentro: idCentro,
      idprograma: carrera,
      idciclo: ciclo,
    }),
  });
}
