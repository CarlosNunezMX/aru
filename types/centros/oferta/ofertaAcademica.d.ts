import type { Login } from "../../auth/Login.js";
import { AuthMethod } from "../../utils/Method.js";
import type { MateriaOferta, OfertaAcademicaRequest } from "./oferta.js";
export declare class OfertaAcademica extends AuthMethod<MateriaOferta[], OfertaAcademicaRequest> {
    protected Route: string;
    constructor(auth: Login, init: Required<OfertaAcademicaRequest>);
    exec(): Promise<MateriaOferta[]>;
}
