import type { Login } from "../../auth/Login.js";
import type { MateriaRegistrada, RegistrarMateriaInit } from "./RegistrarMateria.js";

import { AuthMethod } from "../../utils/Method.js";
import { AuthHeaderPreset } from "../../utils/CommonHeaders.js";
import { ErrorHandling } from "../../error/Request.js";
import { StudentPlans } from "../../info/Plans.js";
/**
 * Delete a subject from the student's schedule by NRC
 */
export class EliminarMateria extends AuthMethod<MateriaRegistrada, RegistrarMateriaInit>{
    protected Route: string = "https://micro-leo.udg.mx/esc-registro/v1/cursos";
    constructor(Auth: Login, init: RegistrarMateriaInit){
        super(Auth, init);
    }

    
    /**
     * @todo Revisar que el tipo de dato de respuesta sea el adecuado.
     */
    async exec(){
        await super.exec();
        const cache = this.Auth.getPlanfromCache(this.Auth.StudentCode!);
        const plans = new StudentPlans(this.Auth);
        if(this.Props!.idcentro || this.Props!.idprograma || this.Props!.nivel){
            const res = await plans.exec();
            this.Props!.idcentro = cache![0].idcentro|| res[0].idcentro;
            this.Props!.idprograma = cache![0].idprograma|| res[0].idprograma;
            this.Props!.nivel = cache![0].nivel || res[0].nivel;
        }
        const request = await fetch(this.Route, {
            method: "DELETE",
            headers: AuthHeaderPreset(this.AuthToken, this.Auth.getToken().token!),
            body: JSON.stringify({
                idalumno: this.Auth.StudentCode!,
                idprograma: this.Props!.idprograma,
                nivel: this.Props!.nivel,
                idciclo: this.Props!.ciclo,
                idcentro: this.Props!.idcentro,
                cursos: this.Props!.cursos
            })
        })
        
        if(!request.ok)
            ErrorHandling(request)

        return await request.json() as MateriaRegistrada;
    }
}