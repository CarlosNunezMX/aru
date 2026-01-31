import type { Centros } from "@interfaces/Centros";
import type { Carreras } from "@interfaces/carreras/Carreras";
import type { Oferta } from "@interfaces/modules/Oferta";
import type { Client } from "source/client";

interface OfertaParams {
  idCentro: string;
  carrera: Carreras.AnyCentro;
  ciclo: string;
}

export async function OfertaAcademica(
  client: Client,
  { carrera, ciclo, idCentro }: OfertaParams,
): Promise<Oferta<Centros, Carreras.AnyCentro>> {
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

