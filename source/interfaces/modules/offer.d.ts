import type { Centros } from "@interfaces/centros";
import type { Schedule } from "./schedules";

export interface OfferHost {
  id: string;
  acronym: string;
  name: string;
}

export interface RawOfferHost {
  idcentro: string;
  siglas: Centros;
  descripcion: string;
}

export interface RawOfferProgram {
  idcentro: string;
  programa: string;
  desprograma: string;
}

export interface OfferProgram {
  hostId: string;
  programId: string;
  program: string;
}

export interface RawOfferTeacher {
  nombprofesor: string;
  indiprimario: string;
}

export interface RawOfferSchedule {
  fechinicio: string;
  fechfin: string;
  horas?: RawOfferHours[];
}
export interface RawOfferHours {
  horainicio: string;
  horafin: string;
  dia: Schedule.WeekDay;
  idedificio: string;
  descedificio: string;
  aula: string;
}

export interface RawOfferCourse {
  idciclo: string;
  subjmateria: string;
  idsede: string;
  idprograma: Carrera;
  crn: string;
  idmateria: string;
  descmateria: string;
  descarrera: string;
  seccion: string;
  creditos: string;
  cupos: string;
  cupodisponibl: string;
  estacrn: string;
  horarios: RawOfferSchedule[];
  profesores: RawOfferTeacher[];
}

export interface OfferCourse {
  cycleId: string;
  subject: string;
  hostId: string;
  programId: string;
  program: string;

  courseId: string;
  courseName: string;
  subjectId: string;

  section: string;
  sectionId: string;
  credits: number;
  availableSeats: number;
  seats: number;

  schedule: Schedule.Schedule[];
  teachers: string[];
}

export interface RawOfferCycle {
  ciclo: string;
  descripcion: string;
}

export interface OfferCycle {
  id: string;
  cycle: string;
}
