import type { Login } from "../../auth/Login.js";
import type { AvAdvanceType, DirtyAvAdvance } from "./AvadvanceTypes.js";

import { AuthMethod } from "../../utils/Method.js";
import { AuthHeaderPreset } from "../../utils/CommonHeaders.js";
import { ErrorHandling } from "../../error/Request.js";

/**
 * Initial data for AverageAdvance
 */
export type AverageAdvanceInit = {
    program: string;
    /** 
     * formato 20XX-A|B 
     * @description Start cycle where the student started
    */
    initialCiclo: string;
}

/**
 * Get the student average advance
 */
export class AverageAdvance extends AuthMethod<AvAdvanceType>{
    private props: AverageAdvanceInit;
    protected Route: string = "https://micro-leo.udg.mx/esc-alumnos/v1/:studentCode/:programID/:initialAcademicTerm/avances-promedio";
    constructor(Auth: Login, init: AverageAdvanceInit){
        super(Auth)
        this.props = init;
    }

    async exec() {
        await super.exec()
        const req_url = this.Route.replace(':studentCode', this.Auth.StudentCode!)
            .replace(':programID', this.props.program)
            .replace(':initialAcademicTerm', this.props.initialCiclo);

        const req = await fetch(req_url, { headers: AuthHeaderPreset(this.AuthToken, this.Auth.getToken().token!) })
        if(!req.ok)
            ErrorHandling(req);
        const data = await req.json() as DirtyAvAdvance;
        return data.respuesta;
    }
}