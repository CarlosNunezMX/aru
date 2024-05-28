import type { Login } from "../../auth/Login.js";
import type { MateriaRegistrada, RegistrarMateriaInit } from "./RegistrarMateria.js";

import { AuthMethod } from "../../utils/Method.js";
import { AuthHeaderPreset } from "../../utils/CommonHeaders.js";
import { ErrorHandling } from "../../error/Request.js";
/**
 * Delete a subject from the student's schedule by NRC
 */
export class EliminarMateria extends AuthMethod<MateriaRegistrada>{
    protected Route: string = "https://micro-leo.udg.mx/esc-registro/v1/cursos";
    private Props: RegistrarMateriaInit;
    constructor(Auth: Login, init: RegistrarMateriaInit){
        super(Auth);
        this.Props = init;
    }
    /**
     * @todo Revisar que el tipo de dato de respuesta sea el adecuado.
     */
    async exec(){
        const request = await fetch(this.Route, {
            method: "DELETE",
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