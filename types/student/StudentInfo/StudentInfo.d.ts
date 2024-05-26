import type { Login } from "../../auth/Login.js";
import type { StudentInfoType } from "./InfoType.js";
import { AuthMethod } from "../../utils/Method.js";
/**
 * Get the student info, photo and signature
 */
export declare class StudentInfo extends AuthMethod<StudentInfoType> {
    constructor(Auth: Login);
    protected Route: string;
    exec(): Promise<StudentInfoType>;
}
