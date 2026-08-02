export interface RawPlan {
  idcentro: string;
  siglacentro: string;
  siiacampus: string;
  desccentro: string;
  idsede: string;
  descsede: string;
  idprograma: string;
  descprograma: string;
  cicladmision: string;
  ciclefectivo: string;
  idestatus: string;
  descestatus: string;
  tipoestatus: string;
  idPlan: string;
  descnivel: string;
  certificacion: unknown;
  emailudg: string;
}

export interface Plan {
  host: string;
  hostId: string;
  oldHostId: string;
  hostAcronym: string;

  venueId: string;
  venue: string;

  program: string;
  programId: string;
  admissionPeriod: string;
  currentPeriod: string;

  status: string;
  statusType: string;
  statusId: string;

  planId: string;
  level: string;
  certification: unknown;
  email: string;
}
