export interface Kardex {
  datosPersonales: KardexDatosPersonales;
  planesEstudios: KardexPlanesEstudios;
  creditos: KardexCreditos;
  promedios: Promedios;
  historiaAcademicaKardex: MateriaKardex[];
  curriculares: null | unknown; // Aparece como null en el ejemplo
  resumenCreditos: KardexResumenCreditos[];
  certificado: string;
  informacion: null | unknown;
  aviso: string;
}


export interface KardexDatosPersonales {
  nombre: string;
}

export interface KardexPlanesEstudios {
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

export interface KardexCreditos {
  credadquirido: string; // Nota: El JSON lo entrega como string "130"
  credporcentaj: string;
  credfaltantes: string;
  credtotaprogr: string;
}

export interface KardexPromedios {
  promgeneral: string;
}

export interface KardexMateria {
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

export interface KardexResumenCreditos {
  areaformacion: string;
  credrequaerea: string;
  credadquaerea: string;
  credfaltaerea: string;
  credTaes: string | null;
  credorden: number; // Nota: Este sí viene como número en el JSON
}
