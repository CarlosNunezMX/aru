import type { Plans } from "./PlansType.js";
import { Login } from "../auth/Login.js";
import { AuthMethod } from "../utils/Method.js";
/**
 * Get the student available plans
 */
export declare class StudentPlans extends AuthMethod<Plans> {
    protected Route: string;
    constructor(Auth: Login);
    exec(): Promise<Plans>;
}
