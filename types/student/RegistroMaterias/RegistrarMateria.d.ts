import type { Login } from "../../auth/Login.js";
import { AuthMethod } from "../../utils/Method.js";
export type RegistrarMateriaInit = {
    idprograma?: string;
    nivel?: string;
    ciclo: string;
    idcentro?: string;
    /**
     * NRC's de las materias a registrar
     */
    cursos: string[];
};
/** Este arreglo muestra los nrc's */
export type MateriaRegistrada = string[];
/**
 * Add a subject from the student's schedule by NRC
 */
export declare class RegistrarMateria extends AuthMethod<MateriaRegistrada> {
    Props: RegistrarMateriaInit;
    protected Route: string;
    constructor(Auth: Login, init: RegistrarMateriaInit);
    /**
    * @todo Revisar que el tipo de dato de respuesta sea el adecuado.
    */
    exec(): Promise<MateriaRegistrada>;
}
