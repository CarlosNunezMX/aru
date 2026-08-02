import type { Plan } from "./planes";



export interface Constancia {
  datosPersonales: DatosPersonales;
  planesEstudios: PlanesEstudios;
  creditosPrograma: CreditosPrograma;
  creditos: ResumenCreditos;
  promedios: Promedios;
  materiasAprobadas: MateriaAprobada[];
}

export interface DatosPersonales {
  nombre: string;
}

export interface PlanesEstudios {
  idcentro: string;
  siglacentro: string;
  siiacampus: string;
  desccentro: string;
  idsede: string;
  descsede: string;
  idprograma: string;
  descprograma: string;
  nivel: string;
  cicladmision: string;
  ciclefectivo: string;
  idestatus: string;
  descestatus: string;
  tipoestatus: string;
  idPlan: string;
  descnivel: string;
  certificacion: string | null;
  emailudg: string;
}

export interface CreditosPrograma {
  idprograma: string;
  descprograma: string;
  idnivel: string;
  descnivel: string;
  credmaximos: string | null;
  credminimos: string; // "375"
  planestudio: string;
  indiprograma: string;
}

export interface ResumenCreditos {
  credadquirido: string; // "130"
  credporcentaj: string; // "34.66"
  credfaltantes: string; // "245"
  credtotaprogr: string; // "375"
}

export interface Promedios {
  promgeneral: string; // "88.18"
}

export interface MateriaAprobada {
  crn: string;
  idmateria: string;
  idsubj: string;
  descmateria: string;
  creditos: string; // "8"
  calificacion: string; // Puede ser número ("74") o letra ("AC")
  desccalifica: string; // "SETENTA Y CUATRO"
  ciclo: string; // "2025-B"
  fechmes: string; // "09/DIC/2025"
  fecha: string; // "2025-12-09 00:00:00"
  tipocalifica: string; // "ORDINARIO (OE)"
}
