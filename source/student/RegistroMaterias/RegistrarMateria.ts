import type { Login } from "../../auth/Login.js";
import { ErrorHandling } from "../../error/Request.js";
import { StudentPlans } from "../../info/Plans.js";
import { AuthHeaderPreset } from "../../utils/CommonHeaders.js";
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
        await super.exec();
        const plans = new StudentPlans(this.Auth);
        if(this.Props.idcentro || this.Props.idprograma || this.Props.nivel){
            const res = await plans.exec();
            this.Props.idcentro = res[0].idcentro;
            this.Props.idprograma = res[0].idprograma;
            this.Props.nivel = res[0].nivel;
        }
        const request = await fetch(this.Route, {
            method: "POST",
            headers: AuthHeaderPreset(this.AuthToken, this.Auth.getToken().token!),
            body: JSON.stringify({
                idalumno: this.Auth.StudentCode!,
                idprograma: this.Props.idprograma,
                nivel: this.Props.nivel,
                idciclo: this.Props.ciclo,
                idcentro: this.Props.idcentro,
                cursos: this.Props.cursos
            })
        })
        
        if(!request.ok)
            ErrorHandling(request)

        return await request.json() as MateriaRegistrada;
    }
}