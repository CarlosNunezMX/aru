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

interface RawConstancy {
  datosPersonales: { nombre: string };
  planesEstudios: RawConstancyStudentPlans;
  creditosPrograma: RawConstancyProgramCredits;
  creditos: RawConstancyCreditsSummary;
  promedios: { promgeneral: string };
  materiasAprobadas: RawConstancyApprovedCourse[];
}

interface RawConstancyStudentPlans {
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

interface RawConstancyProgramCredits {
  idprograma: string;
  descprograma: string;
  idnivel: string;
  descnivel: string;
  credmaximos: string | null;
  credminimos: string; // "375"
  planestudio: string;
  indiprograma: string;
}

interface RawConstancyCreditsSummary {
  credadquirido: string; // "130"
  credporcentaj: string; // "34.66"
  credfaltantes: string; // "245"
  credtotaprogr: string; // "375"
}

interface RawConstancyApprovedCourse {
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

// ==| Student Card |==
// @TODO: next update

interface Signature {
  signaturer: string;
  signature: string;
}

interface StudentCard$1 {
  name: string;
  lastName: string;

  imss: string;
  curp: string;

  idHost: string;
  host: string;
  venue: string;

  rectorSignature: Signature;
  signature: string;

  photo: string;
  qr: string;

  tarjeta_informador: Array<unknown>;
}

interface Email {
  mail: string;
  status: boolean;
  password: string;
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

interface Item {
  sectionId: string;
  registryType: string;
  sectionName: string;

  courseId: string;
  courseName: string;

  credits: number;

  campusId: string;
  teachers: Teacher[];
  schedule: Schedule$1[];
}

type WeekDay =
  | "Lunes"
  | "Martes"
  | "Miércoles"
  | "Jueves"
  | "Viernes"
  | "Sábado";

interface Hour {
  day: WeekDay;
  start: string;
  end: string;

  building: string;
  buildingId: string;
  classroom: string;
}

interface Teacher {
  id: string;
  name: string;
  lastName: string;
}

interface Schedule$1 {
  start: Date;
  end: Date;
  horas: Hour[];
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

// ==| New Student Object |==

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

/**
 *  @TODO: Create a more pullish data container,
 *  and create it's transformer
 */

interface Props$1 {
    programId: string;
    cycleId: string;
}
declare function Constancy(client: Client, { cycleId, programId }: Props$1): Promise<RawConstancy>;

declare function StudentCard(id: string): Promise<StudentCard$1>;

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
declare function Schedule(client: Client, { programId, cycleId }: ScheduleProps): Promise<Item[]>;

declare function Student(client: Client): Promise<Student$1>;

export { Adeudos, Constancy, DeleteCourse, EmailAccounts, IsAgendaOpened, Kardex, Offer, OfferCycles, OfferHosts, OfferPrograms, RegisterCourses, Report, Schedule, Student, StudentCard, StudentPlans };
