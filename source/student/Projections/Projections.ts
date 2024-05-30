import type { Login } from "../../auth/Login.js";
import type { ProjectionSubjectType, DirtyProjection } from "./ProjectionsType.js";

import { AuthHeaderPreset } from "../../utils/CommonHeaders.js";
import { AuthMethod } from "../../utils/Method.js";
import { ErrorHandling } from "../../error/Request.js";
import { StudentPlans } from "../../info/Plans.js";


export type ProjectionInit = {
    idprograma: string;
    /** @description Format YYYY-{A|B} */
    cicladmision: string;
}
/**
 * Get the student projection, this contains the pending subjects to take
 */
export class Projections extends AuthMethod<ProjectionSubjectType[]>{
    protected Route: string = "https://micro-leo.udg.mx/esc-alumnos/v1/:id-alumno/:id-programa/:id-ciclo-admision/proyecciones";
    private props?: ProjectionInit;
    constructor(Auth: Login, init?: ProjectionInit){
        super(Auth);
    }

    async exec(){
        await super.exec()

        // Get the student plans to read the program and admission cycle
        const plans = new StudentPlans(this.Auth);
        const { idprograma, cicladmision } = this.props || (await plans.exec())[0];

        const req_url = this.Route.replace(':id-alumno', this.Auth.StudentCode!)
            .replace(':id-programa', idprograma)
            .replace(':id-ciclo-admision', cicladmision);

        const req = await fetch(req_url, {
            headers: AuthHeaderPreset(this.AuthToken, this.Auth.getToken().token!)
        })

        if(!req.ok)
            ErrorHandling(req);

        const data = await req.json() as DirtyProjection;
        return data.respuesta;
    }
}

