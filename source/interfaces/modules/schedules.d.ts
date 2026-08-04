export interface ItemRaw {
  crn: string;
  idcurso: string;
  nombrecurso: string;
  numeseccion: string;
  idcampus: string;
  creditos: string;
  horarios: RawSchedule[];
  profesores: RawTeacher[];
  tiporegistro: string;
}

export interface Item {
  sectionId: string;
  registryType: string;
  sectionName: string;

  courseId: string;
  courseName: string;

  credits: number;

  campusId: string;
  teachers: Teacher[];
  schedule: Schedule[];
}

export type WeekDay =
  | "Lunes"
  | "Martes"
  | "Miércoles"
  | "Jueves"
  | "Viernes"
  | "Sábado";

export interface RawHour {
  dia: WeekDay;
  hora: string;
  idedificio: string;
  edificio: string;
  numesalon: string;
}

export interface Hour {
  day: WeekDay;
  start: string;
  end: string;

  building: string;
  buildingId: string;
  classroom: string;
}

export interface RawTeacher {
  nombres: string;
  apellidos: string;
  idprofesor: string;
}

export interface Teacher {
  id: string;
  name: string;
  lastName: string;
}

export type RawSchedule = {
  /**
   * dd-mm-yyyy
   */
  fechainicio: string;
  /**
   * dd-mm-yyyy
   */
  fechafin: string;
  horas: RawHour[];
};

export interface Schedule {
  start: Date;
  end: Date;
  hours: Hour[];
}
