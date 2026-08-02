import type { Plan, RawPlan } from "@interfaces/modules/planes";

export default function PlanTransformer(raw: RawPlan): Plan {
  return {
    host: raw.desccentro,
    hostId: raw.idcentro,
    oldHostId: raw.siiacampus,
    hostAcronym: raw.siglacentro,

    venue: raw.descsede,
    venueId: raw.idsede,

    program: raw.descprograma,
    programId: raw.idprograma,
    admissionPeriod: raw.cicladmision,
    currentPeriod: raw.ciclefectivo,

    status: raw.descestatus,
    statusId: raw.idestatus,
    statusType: raw.tipoestatus,

    planId: raw.idPlan,
    level: raw.descnivel,
    certification: raw.certificacion,
    email: raw.emailudg,
  };
}
