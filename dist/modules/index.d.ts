import { a as Client } from '../client-Xsnfhgkg.js';
import 'jsonwebtoken';

declare function Adeudos(client: Client): Promise<never[]>;

interface AgendaSharedProps {
    programId: string;
    hostId: string;
    cycleId: string;
    level: string | "LI";
    courses: string[];
}
type ValidarRegistroProps = Pick<AgendaSharedProps, "programId" | "hostId" | "cycleId">;
declare function DeleteCourse(client: Client, { courses, cycleId, hostId, level, programId }: AgendaSharedProps): Promise<void>;
declare function RegisterCourses(client: Client, { courses, cycleId, hostId, programId, level }: AgendaSharedProps): Promise<void>;
declare function IsAgendaOpened(client: Client, { cycleId, hostId, programId }: ValidarRegistroProps): Promise<boolean>;

interface Email {
    mail: string;
    status: boolean;
    password: string;
}

declare namespace Schedule$1 {
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
    horas: Hour[];
  }
}

interface OfferHost {
  id: string;
  acronym: string;
  name: string;
}

interface OfferProgram {
  hostId: string;
  programId: string;
  program: string;
}

interface OfferCourse {
  cycleId: string;
  subject: string;
  hostId: string;
  programId: string;
  program: string;

  courseId: string;
  courseName: string;
  subjectId: string;

  section: string;
  credits: number;
  availableSeats: number;
  seats: number;

  schedule: Schedule$1.Schedule[];
  teachers: string[];
}

interface OfferCycle {
  id: string;
  cycle: string;
}

type Card = {
    sede: string;
    firmaRector: string;
    imss: string;
    nombre: string;
    error?: string;
    nombreRector: string;
    apellido_paterno: string;
    apellido_materno: string;
    centro: string;
    curp: string;
    foto: string;
    centroDesc: string;
    firma: string;

    tarjeta_informador: Array<unknown>
}

interface Constancia {
  datosPersonales: DatosPersonales;
  planesEstudios: PlanesEstudios;
  creditosPrograma: CreditosPrograma;
  creditos: ResumenCreditos;
  promedios: Promedios$1;
  materiasAprobadas: MateriaAprobada[];
}

interface DatosPersonales {
  nombre: string;
}

interface PlanesEstudios {
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

interface CreditosPrograma {
  idprograma: string;
  descprograma: string;
  idnivel: string;
  descnivel: string;
  credmaximos: string | null;
  credminimos: string; // "375"
  planestudio: string;
  indiprograma: string;
}

interface ResumenCreditos {
  credadquirido: string; // "130"
  credporcentaj: string; // "34.66"
  credfaltantes: string; // "245"
  credtotaprogr: string; // "375"
}

interface Promedios$1 {
  promgeneral: string; // "88.18"
}

interface MateriaAprobada {
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

interface Kardex$1 {
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


interface KardexDatosPersonales {
  nombre: string;
}

interface KardexPlanesEstudios {
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

interface KardexCreditos {
  credadquirido: string; // Nota: El JSON lo entrega como string "130"
  credporcentaj: string;
  credfaltantes: string;
  credtotaprogr: string;
}

interface KardexResumenCreditos {
  areaformacion: string;
  credrequaerea: string;
  credadquaerea: string;
  credfaltaerea: string;
  credTaes: string | null;
  credorden: number; // Nota: Este sí viene como número en el JSON
}

interface Address {
  country: string;
  state: string;
  city: string;
  zipCode: string;
  street: string;
}

interface Student$1 {
  studentId: string;
  name: string;
  genre: "M" | "F";
  birthdate: Date;

  curp: string;
  rfc: string | null;
  imss: string;

  email: string;
  emergencyPhone: string;
  photo: string;
  sign: string;

  blodId: string | null;
  blodType: string | null;
  fullAddress: string;
  address: Address;
}

// ==| Report Object |== //
interface ReportItem {
  grade: string | number;
  gradeString: string;
  definitive: boolean;
}

interface Report$1 {
  courseId: string;
  sectionId: string;
  cycleId: string;

  ordinary: ReportItem;
  extraordinary?: ReportItem;
}

/**
 *  @TODO: Create a more pullish data container,
 *  and create it's transformer
 */

interface Props$1 {
    programId: string;
    cycleId: string;
}
declare function Constancy(client: Client, { cycleId, programId }: Props$1): Promise<Constancia>;

declare function Credential(id: string): Promise<Card>;

declare function EmailAccounts(client: Client, hostId: string): Promise<{
    microsoft: Email;
    google: Email;
}>;

interface Props {
    hostId: string;
    currentCycleId: string;
    admissionCycleId: string;
    programId: string;
    venueId: string;
}
declare function Kardex(client: Client, { admissionCycleId, currentCycleId, hostId, programId, venueId }: Props): Promise<Kardex$1>;

declare function OfferHosts(client: Client): Promise<OfferHost[]>;
declare function OfferPrograms(client: Client, hostId: string): Promise<OfferProgram[]>;
declare function OfferCycles(client: Client, programId: string): Promise<OfferCycle[]>;
interface GetOfferParams {
    hostId: string;
    programId: string;
    cycleId: string;
}
declare function Offer(client: Client, { cycleId, hostId, programId }: GetOfferParams): Promise<OfferCourse[]>;

interface Plan {
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

declare function StudentPlans(client: Client): Promise<Plan[]>;

interface ReportProps {
    cycleId: string;
    programId: string;
}
declare function Report(client: Client, { cycleId, programId }: ReportProps): Promise<Report$1[]>;

interface ScheduleProps {
    programId: string;
    cycleId: string;
}
declare function Schedule(client: Client, { programId, cycleId }: ScheduleProps): Promise<Schedule$1.Item[]>;

declare function Student(client: Client): Promise<Student$1>;

export { Adeudos, Constancy, Credential, DeleteCourse, EmailAccounts, IsAgendaOpened, Kardex, Offer, OfferCycles, OfferHosts, OfferPrograms, RegisterCourses, Report, Schedule, Student, StudentPlans };
