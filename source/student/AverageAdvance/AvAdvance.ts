import type { Login } from "../../auth/Login.js";
import type { AvAdvanceType, DirtyAvAdvance } from "./AvadvanceTypes.js";

import { AuthMethod } from "../../utils/Method.js";
import { AuthHeaderPreset } from "../../utils/CommonHeaders.js";
import { ErrorHandling } from "../../error/Request.js";
import { StudentPlans } from "../../info/Plans.js";

/**
 * Initial data for AverageAdvance
 */
export type AverageAdvanceInit = {
    idprograma: string;
    /** 
     * formato 20XX-A|B 
     * @description Start cycle where the student started
    */
    cicladmision: string;
}

/**
 * Get the student average advance
 */
export class AverageAdvance extends AuthMethod<AvAdvanceType>{
    private props?: AverageAdvanceInit;
    protected Route: string = "https://micro-leo.udg.mx/esc-alumnos/v1/:studentCode/:programID/:initialAcademicTerm/avances-promedio";
    constructor(Auth: Login, init?: AverageAdvanceInit){
        super(Auth)
        this.props = init;
    }

    async exec() {
        const cache = this.getCache<AvAdvanceType>(AverageAdvance as typeof AuthMethod);
        if(cache)
            return cache;
        const {idprograma, cicladmision} = this.props || this.Auth.getPlanfromCache(this.Auth.StudentCode!)![0] || (await new StudentPlans(this.Auth).exec())[0];
        await super.exec()
        const req_url = this.Route.replace(':studentCode', this.Auth.StudentCode!)
            .replace(':programID', idprograma)
            .replace(':initialAcademicTerm', cicladmision);

        const req = await fetch(req_url, { headers: AuthHeaderPreset(this.AuthToken, this.Auth.getToken().token!) })
        if(!req.ok)
            ErrorHandling(req);
        const data = await req.json() as DirtyAvAdvance;
        this.UpdateCache(data.respuesta, AverageAdvance as typeof AuthMethod);
        return data.respuesta;
    }
}
