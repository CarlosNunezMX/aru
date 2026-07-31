import type { Centros } from "./centros";
import type { Carreras } from "./carreras";

export interface Plan {
  idcentro: string;
  siglacentro: Centros;
  siiacampus: Centros;
  desccentro: string;
  idsede: string;
  descsede: string;
  idprograma: Carreras.AnyCentro;
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
