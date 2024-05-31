export { Login } from "./auth/Login.js";

export { Credits } from "./student/Credits/Credits.js";

export { RequestError } from "./error/Request.js";

export { StudentPlans } from "./info/Plans.js";

export {Kardex} from "./kardex/Kardex.js";

export { AverageAdvance } from "./student/AverageAdvance/AvAdvance.js";
export { EliminarMateria } from "./student/RegistroMaterias/EliminarMateria.js";
export { Projections } from "./student/Projections/Projections.js";
export { RegistrarMateria } from "./student/RegistroMaterias/RegistrarMateria.js";
export { Schedule } from "./student/Schedules/Schedule.js";
export { StudentCard } from "./student/Card/StudentCard.js";
export { StudentInfo } from "./student/StudentInfo/StudentInfo.js";

export * as Method from "./utils/Method.js";

export type { credentials as UserCredentials } from "./auth/Login.js";

export type { MethodNotAllowedType } from "./error/method_now_allowed.js";
export type { UnauthorizedType } from "./error/unauthorized_type.js";
export * as ErrorTypes from "./error/index.js"

export type { Plans } from "./info/PlansType.js";

export type * as KardexTypes from "./kardex/KardexType.js"

export type { AverageAdvanceInit } from "./student/AverageAdvance/AvAdvance.js"
export type { AvAdvanceType, AvanceItem } from "./student/AverageAdvance/AvadvanceTypes.js"
export type { CreditsInit } from "./student/Credits/Credits.js";
export type { Card, SoyUdgError } from "./student/Card/StudentCardTypes.js";
export type { Dias, Horario, Horas, Materia, Profesor } from "./student/Schedules/ScheduleTypes.js";
export type { ProjectionSubjectType } from "./student/Projections/ProjectionsType.js"
export * as RegistroMateriaTypes from "./student/RegistroMaterias/RegistrarMateria.js";
export type { StudentInfoType, DomicilioFormated } from "./student/StudentInfo/InfoType.js";
export type { ScheduleInit } from "./student/Schedules/Schedule.js";
