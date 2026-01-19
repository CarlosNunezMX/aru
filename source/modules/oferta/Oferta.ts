import type { AruCentros } from "@interfaces/Centros";
import { type AruCarreras } from "@interfaces/carreras/Carreras";
import type { AruOferta } from "@interfaces/modules/Oferta";
import type { Client } from "source/client";

interface OfertaParams {
  idCentro: string;
  carrera: AruCarreras.AnyCentro;
  ciclo: string;
}

export async function OfertaAcademica(
  client: Client,
  { carrera, ciclo, idCentro }: OfertaParams,
): Promise<AruOferta.Oferta<AruCentros.Centros, AruCarreras.AnyCentro>> {
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

