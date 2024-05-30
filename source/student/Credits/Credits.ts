import type { Login } from "../../auth/Login.js";
import { ErrorHandling } from "../../error/Request.js";
import { StudentPlans } from "../../info/Plans.js";
import { AuthHeaderPreset } from "../../utils/CommonHeaders.js";
import { AuthMethod } from "../../utils/Method.js";
import type { DirtyType } from "../../utils/generics/ResponseOK.js";
import type { CreditsType } from "./CreditsTypes.js";

export type CreditsInit = {
    idprograma: string;
    /** @description Format: YYYY-{A|B} */
    cicladmision: string;
}

export class Credits extends AuthMethod<CreditsType>{
    private props?: CreditsInit
    constructor(Auth: Login, init?: CreditsInit){
        super(Auth);
        this.props = init;
    }

    protected Route: string = "https://micro-leo.udg.mx/esc-alumnos/v1/:studentCode/:programID/:initialAcademicTerm/creditos";
    async exec() {
        await super.exec();
        const plans = new StudentPlans(this.Auth);
        const { cicladmision, idprograma } = this.props || (await plans.exec())[0];
        
        const req_url = this.Route.replace(':studentCode', this.Auth.StudentCode!)
            .replace(":programID", idprograma)
            .replace(":initialAcademicTerm", cicladmision);

        const req = await fetch(req_url, {
            headers: AuthHeaderPreset(this.AuthToken, this.Auth.getToken().token!)
        })

        if(!req.ok)
            ErrorHandling(req);

        const data = await req.json() as DirtyType<CreditsType>;
        return data.respuesta;
    }
}