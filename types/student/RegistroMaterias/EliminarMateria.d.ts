import type { Login } from "../../auth/Login.js";
import type { MateriaRegistrada, RegistrarMateriaInit } from "./RegistrarMateria.js";
import { AuthMethod } from "../../utils/Method.js";
/**
 * Delete a subject from the student's schedule by NRC
 */
export declare class EliminarMateria extends AuthMethod<MateriaRegistrada> {
    protected Route: string;
    private Props;
    constructor(Auth: Login, init: RegistrarMateriaInit);
    /**
     * @todo Revisar que el tipo de dato de respuesta sea el adecuado.
     */
    exec(): Promise<MateriaRegistrada>;
}
