export { Login } from "./auth/Login.js";
export { StudentInfo } from "./student/StudentInfo/StudentInfo.js";
export { RequestError } from "./error/Request.js";
export { StudentCard } from "./student/Card/StudentCard.js";
export { StudentPlans } from "./info/Plans.js"
export {Schedule} from "./student/Schedules/Schedule.js";

export type { credentials as UserCredentials } from "./auth/Login.js";
export type { StudentInfoType, DirtyStudentInfoType, DomicilioFormated } from "./student/StudentInfo/InfoType.js";

export type { MethodNotAllowedType } from "./error/method_now_allowed.js";
export type { UnauthorizedType } from "./error/unauthorized_type.js";

export type { Card, SoyUdgError } from "./student/Card/StudentCardTypes.js";
export type { Plans } from "./info/PlansType.js";
export type { ScheduleInit } from "./student/Schedules/Schedule.js"
export type { Dias, Horario, Horas, Materia, Profesor } from "./student/Schedules/ScheduleTypes.js";