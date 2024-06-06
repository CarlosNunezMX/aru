import type { Login } from "../../auth/Login.js";
import { AuthMethod } from "../../utils/Method.js";
import type { BoletaType } from "./BoletaInfo.js";
export type BoletaInit = {
    idprograma: string;
    ciclefectivo: string;
};
export declare class Boleta extends AuthMethod<BoletaType, BoletaInit> {
    protected Route: string;
    constructor(Auth: Login, init?: BoletaInit);
    exec(): Promise<BoletaType>;
}
