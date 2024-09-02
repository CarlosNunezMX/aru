import type { Login } from "../../auth/Login.js";
import { AuthMethod } from "../../utils/Method.js";
import type { Programa } from "./programa.js";
export declare class ProgramasCentros extends AuthMethod<Programa[], string> {
    protected Route: string;
    constructor(Auth: Login, init: string);
    exec(): Promise<Programa[]>;
}
