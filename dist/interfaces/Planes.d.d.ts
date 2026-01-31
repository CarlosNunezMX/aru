import { Centros } from './Centros.d.js';
import { Carreras } from './carreras/Carreras.d.js';

interface Plan {
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

export type { Plan as default };
