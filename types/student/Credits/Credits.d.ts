import type { Login } from "../../auth/Login.js";
import { AuthMethod } from "../../utils/Method.js";
import type { CreditsType } from "./CreditsTypes.js";
export type CreditsInit = {
    idprograma: string;
    /** @description Format: YYYY-{A|B} */
    cicladmision: string;
};
export declare class Credits extends AuthMethod<CreditsType> {
    private props?;
    constructor(Auth: Login, init?: CreditsInit);
    protected Route: string;
    exec(): Promise<CreditsType>;
}
