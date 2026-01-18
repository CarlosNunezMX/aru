import type { AruCentros } from "./Centros";
import type { AruCarreras } from "./carreras/Carreras";

export default interface Plan {
  idcentro: string;
  siglacentro: AruCentros.Centros;
  siiacampus: AruCentros.Centros;
  desccentro: string;
  idsede: string;
  descsede: string;
  idprograma: AruCarreras.AnyCentro;
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
