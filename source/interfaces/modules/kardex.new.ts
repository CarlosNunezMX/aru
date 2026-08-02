import type { Plan } from "./planes";

/** == RAW KARDEX == */
export interface RawKardex {
  datosPersonales: RawDatosPersonales;
  planesEstudios: RawPlanEstudios;
  creditos: RawCredits;
  promedios: RawGrade;
  historiaAcademicaKardex: RawCourse[];
  curriculares: null | unknown; // Aparece como null en el ejemplo
  resumenCreditos: RawCreditsSummary[];
  certificado: string;
  informacion: null | string;
  aviso: string;
}

interface RawDatosPersonales {
  nombre: string;
}

export interface RawPlanEstudios {
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

export interface RawCredits {
  credadquirido: string;
  credporcentaj: string;
  credfaltantes: string;
  credtotaprogr: string;
}

export interface RawGrade {
  promgeneral: string;
}

export interface RawCourse {
  crn: string;
  idsede: string | null;
  clavmateria: string;
  titucurso: string;
  calinumeletra: string;
  tipocaptura: string;
  creditos: string;
  horacurso: string;
  fechcaptura: string;
  clasificacion: string;
  idtae: string | null;
  desctae: string | null;
  idarea: string;
  descarea: string;
}

export interface RawTaeCreditsSummary {
  desctae: string;
  credrequtae: string;
  credadqutae: string;
  credfalttae: string;
}
export interface RawCreditsSummary {
  areaformacion: string;
  credrequaerea: string;
  credadquaerea: string;
  credfaltaerea: string;
  credTaes: RawTaeCreditsSummary | null;
  credorden: number; // Nota: Este sí viene como número en el JSON
}

// ==| New Kardex Object |== //
interface Kardex {
  name: string;
  plan: Plan;
  grade: number;
  curriculares: unknown | null;

  adquiredCredits: number;
  creditsPercentage: number;
  reamingCredits: number;
  totalCredits: number;
  summaryCredits: CreditSummary[];

  issuedCertificate: "PARCIAL" | "COMPLETO";
  note: string | null;
  warning: string;
  courses: Course[];
}

export interface Course {
  id: string;
  name: string;
  credits: number;
  duration: number;

  sectionId: string;
  venueId: string;

  grade: string;
  gradeType: string;
  gradeDate: Date;
  cycleId: string;

  taeId: string | null;
  tae: string | null;

  areaId: string;
  area: string;
}

export interface CreditSummary {
  name: string;
  required: number;
  adquired: number;
  reaming: number;
  tae: Omit<CreditSummary, "tae">;
}
