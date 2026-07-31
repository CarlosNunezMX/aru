export interface Kardex {
  datosPersonales: DatosPersonales;
  planesEstudios: PlanesEstudios;
  creditos: Creditos;
  promedios: Promedios;
  historiaAcademicaKardex: MateriaKardex[];
  curriculares: null | unknown; // Aparece como null en el ejemplo
  resumenCreditos: ResumenCreditos[];
  certificado: string;
  informacion: null | unknown;
  aviso: string;
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

export interface Creditos {
  credadquirido: string; // Nota: El JSON lo entrega como string "130"
  credporcentaj: string;
  credfaltantes: string;
  credtotaprogr: string;
}

export interface Promedios {
  promgeneral: string;
}

export interface MateriaKardex {
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

export interface ResumenCreditos {
  areaformacion: string;
  credrequaerea: string;
  credadquaerea: string;
  credfaltaerea: string;
  credTaes: string | null;
  credorden: number; // Nota: Este sí viene como número en el JSON
}
