import type { Login } from "../../auth/Login.js";
import type { Materia } from "./ScheduleTypes.js";
import { AuthMethod } from "../../utils/Method.js";
export type ScheduleInit = {
    idprograma?: string;
    /** format 20xx-A|B */
    ciclo: string;
};
/**
 * Get the student schedule, this contains the student schedule and the teacher info
 */
export declare class Schedule extends AuthMethod<Materia[]> {
    protected Route: string;
    private props;
    constructor(Auth: Login, init: ScheduleInit);
    exec(): Promise<Materia[]>;
}
