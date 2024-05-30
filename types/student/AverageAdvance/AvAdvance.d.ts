import type { Login } from "../../auth/Login.js";
import type { AvAdvanceType } from "./AvadvanceTypes.js";
import { AuthMethod } from "../../utils/Method.js";
/**
 * Initial data for AverageAdvance
 */
export type AverageAdvanceInit = {
    idprograma: string;
    /**
     * formato 20XX-A|B
     * @description Start cycle where the student started
    */
    cicladmision: string;
};
/**
 * Get the student average advance
 */
export declare class AverageAdvance extends AuthMethod<AvAdvanceType> {
    private props?;
    protected Route: string;
    constructor(Auth: Login, init?: AverageAdvanceInit);
    exec(): Promise<AvAdvanceType>;
}
