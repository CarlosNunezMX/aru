import type { Client } from "@client";
import { buildURL } from "@common/url";

import * as Offer from "@interfaces/modules/offer";
import { OfferTransformer } from "@transformers/offer";

// Centros para oferta academica
export async function OfertaAcademicaCentros(
  client: Client,
): Promise<Offer.OfferHost[]> {
  const url = "https://leoalumnos-svc.udg.mx/alum/api/programas/centros";
  const hosts = await client.fetch.fetch<Offer.RawOfferHost[]>(url);
  return hosts.map((host) => OfferTransformer.transformOfferHost(host));
}

export async function OfertaAcademicaCarreras(
  client: Client,
  hostId: string,
): Promise<Offer.OfferProgram[]> {
  const url = buildURL(
    "https://leoalumnos-svc.udg.mx/alum/api/programas/:hostId/programas-centros",
    { hostId },
  );

  const programs = await client.fetch.fetch<Offer.RawOfferProgram[]>(url);
  return programs.map((program) =>
    OfferTransformer.transformOfferProgram(program),
  );
}

export async function OfertaCentroCiclos(
  client: Client,
  programId: string,
): Promise<Offer.OfferCycle[]> {
  const url = buildURL(
    "https://leoalumnos-svc.udg.mx/alum/api/programas/:programId/ciclos",
    { programId },
  );
  const cycles = await client.fetch.fetch<Offer.RawOfferCycle[]>(url);
  return cycles.map((cycle) => OfferTransformer.transformOfferCycle(cycle));
}
// Oferta academica
interface GetOfferParams {
  hostId: string;
  programId: string;
  cycleId: string;
}

export async function OfertaAcademica(
  client: Client,
  { cycleId, hostId, programId }: GetOfferParams,
): Promise<Offer.OfferCourse[]> {
  const url = "https://leoalumnos-svc.udg.mx/alum/api/ofertas/horas-nrc";
  const offer = await client.fetch.fetch<Offer.RawOfferCourse[]>(url, {
    method: "POST",
    body: JSON.stringify({
      idcentro: hostId,
      idprograma: programId,
      idciclo: cycleId,
    }),
  });

  return offer.map((course) => OfferTransformer.transform(course));
}
