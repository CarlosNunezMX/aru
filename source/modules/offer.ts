import type { Client } from "@client";
import { buildURL } from "@common/url";

import type * as TOffer from "@interfaces/modules/offer";
import { OfferTransformer } from "@transformers/offer";

// Centros para oferta academica
export async function OfferHosts(client: Client): Promise<TOffer.OfferHost[]> {
  const url = "https://leoalumnos-svc.udg.mx/alum/api/programas/centros";
  const hosts = await client.fetch.fetch<TOffer.RawOfferHost[]>(url);
  return hosts.map((host) => OfferTransformer.transformOfferHost(host));
}

export async function OfferPrograms(
  client: Client,
  hostId: string,
): Promise<TOffer.OfferProgram[]> {
  const url = buildURL(
    "https://leoalumnos-svc.udg.mx/alum/api/programas/:hostId/programas-centros",
    { hostId },
  );

  const programs = await client.fetch.fetch<TOffer.RawOfferProgram[]>(url);
  return programs.map((program) =>
    OfferTransformer.transformOfferProgram(program),
  );
}

export async function OfferCycles(
  client: Client,
  programId: string,
): Promise<TOffer.OfferCycle[]> {
  const url = buildURL(
    "https://leoalumnos-svc.udg.mx/alum/api/programas/:programId/ciclos",
    { programId },
  );
  const cycles = await client.fetch.fetch<TOffer.RawOfferCycle[]>(url);
  return cycles.map((cycle) => OfferTransformer.transformOfferCycle(cycle));
}
// Oferta academica
interface GetOfferParams {
  hostId: string;
  programId: string;
  cycleId: string;
}

export async function Offer(
  client: Client,
  { cycleId, hostId, programId }: GetOfferParams,
): Promise<TOffer.OfferCourse[]> {
  const url = "https://leoalumnos-svc.udg.mx/alum/api/ofertas/horas-nrc";
  const offer = await client.fetch.fetch<TOffer.RawOfferCourse[]>(url, {
    method: "POST",
    body: JSON.stringify({
      idcentro: hostId,
      idprograma: programId,
      idciclo: cycleId,
    }),
  });

  return offer.map((course) => OfferTransformer.transform(course));
}
