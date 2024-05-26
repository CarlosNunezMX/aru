export { Login } from "./auth/Login.js";
export { StudentInfo } from "./student/StudentInfo/StudentInfo.js";
export { RequestError } from "./error/Request.js";
export { StudentCard } from "./student/Card/StudentCard.js";

export type { credentials as UserCredentials } from "./auth/Login.js";
export type { StudentInfoType, DirtyStudentInfoType, DomicilioFormated } from "./student/StudentInfo/InfoType.js";

export type { MethodNotAllowedType } from "./error/method_now_allowed.js";
export type { UnauthorizedType } from "./error/unauthorized_type.js";

export type { Card, SoyUdgError } from "./student/Card/StudentCardTypes.js";