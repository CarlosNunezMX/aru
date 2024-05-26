import type { Card } from "./StudentCardTypes.d.ts";
import { AuthMethod } from "../../utils/Method.js";
import type { Login } from "../../auth/Login.js";
/**
 * Get the virtual student card info, this contains student info, and rectory info
 */
export declare class StudentCard extends AuthMethod<Card> {
    protected Route: string;
    constructor(Auth: Login);
    exec(): Promise<Card>;
}
