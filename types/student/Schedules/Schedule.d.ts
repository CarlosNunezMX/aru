import type { Login } from "../../auth/Login.js";
import { AuthMethod } from "../../utils/Method.js";
export type ScheduleInit = {
    program: string;
    /** format 20xx-A|B */
    ciclo: string;
};
/**
 * Get the student schedule, this contains the student schedule and the teacher info
 */
export declare class Schedule extends AuthMethod {
    protected Route: string;
    private props;
    constructor(Auth: Login, init: ScheduleInit);
    exec(): Promise<void>;
}
