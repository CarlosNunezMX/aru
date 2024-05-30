import type { Login } from "../auth/Login.js";
import { AuthMethod } from "../utils/Method.js";
export type KardexInit = {
    idcentro: string;
    ciclefectivo: string;
    cicladmision: string;
    idprograma: string;
    idsede: string;
};
export declare class Kardex extends AuthMethod<Kardex> {
    protected Route: string;
    protected props?: KardexInit;
    constructor(Auth: Login, init?: KardexInit);
    exec(): Promise<Kardex>;
}
