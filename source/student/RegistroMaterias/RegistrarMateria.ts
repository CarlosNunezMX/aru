import type { Login } from "../../auth/Login.js";
import { ErrorHandling } from "../../error/Request.js";
import { AuthHeaderPreset } from "../../utils/CommonHeaders.js";
import { AuthMethod } from "../../utils/Method.js";

export type RegistrarMateriaInit = {
    program: string;
    nivel: string;
    ciclo: string;
    centro: string;
    /**
     * NRC's de las materias a registrar
     */
    cursos: string[];
}

/** Este arreglo muestra los nrc's */
export type MateriaRegistrada = string[]
/**
 * Add a subject from the student's schedule by NRC
 */
export class RegistrarMateria extends AuthMethod<MateriaRegistrada> {
    Props: RegistrarMateriaInit;
    protected Route: string = "https://micro-leo.udg.mx/esc-registro/v1/";
    constructor(Auth: Login, init: RegistrarMateriaInit){
        super(Auth);
        this.Props = init;
    }
     /**
     * @todo Revisar que el tipo de dato de respuesta sea el adecuado.
     */
    async exec(){
        const request = await fetch(this.Route, {
            method: "POST",
            headers: AuthHeaderPreset(this.AuthToken, this.Auth.getToken().token!),
            body: JSON.stringify({
                idalumno: this.Auth.StudentCode!,
                idprograma: this.Props.program,
                nivel: this.Props.nivel,
                idciclo: this.Props.ciclo,
                idcentro: this.Props.centro,
                cursos: this.Props.cursos
            })
        })
        
        if(!request.ok)
            ErrorHandling(request)

        return await request.json() as MateriaRegistrada;
    }
}