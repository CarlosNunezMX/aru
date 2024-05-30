import type { Login } from "../auth/Login.js";
import type { DirtyType } from "../utils/generics/ResponseOK.js";

import { AuthMethod } from "../utils/Method.js";
import { AuthHeaderPreset } from "../utils/CommonHeaders.js";
import { ErrorHandling} from "../error/Request.js";
import { StudentPlans } from "../info/Plans.js";

export type KardexInit = {
    idcentro: string;
    ciclefectivo: string;
    cicladmision: string;
    idprograma: string;
    idsede: string;
}

export class Kardex extends AuthMethod<Kardex> {
    protected Route: string = "https://micro-leo.udg.mx/esc-alumnos/v1/kardex";
    protected props?: KardexInit;
    constructor(Auth: Login, init?: KardexInit) {
        super(Auth);
        this.props = init;
    }

    async exec() {
        const plans = new StudentPlans(this.Auth);
        const {cicladmision, ciclefectivo, idcentro, idprograma, idsede} = this.props || (await plans.exec())[0];
        await super.exec()
        const body = {
            idalumno: this.Auth.StudentCode!,
            idcentro,
            idciclo: ciclefectivo,
            idcicloadmi: cicladmision,
            idprograma,
            idsede
        };
        const request = await fetch(this.Route, {
            body: JSON.stringify(body),
            method: "POST",
            headers: AuthHeaderPreset(this.AuthToken, this.Auth.getToken().token!),
        })
        if(!request.ok)
            ErrorHandling(request);
        

        const data = await request.json() as DirtyType<Kardex>;
        return data.respuesta;
    }
}
