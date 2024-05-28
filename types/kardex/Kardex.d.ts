import type { Login } from "../auth/Login.js";
import { AuthMethod } from "../utils/Method.js";
export type KardexInit = {
    campus: string;
    ciclo: string;
    cicloAdmision: string;
    progam: string;
    cede: string;
};
export declare class Kardex extends AuthMethod<Kardex> {
    protected Route: string;
    protected RequestBody: KardexInit;
    constructor(Auth: Login, init: KardexInit);
    exec(): Promise<Kardex>;
}
