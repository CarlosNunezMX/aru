import type { Login } from "../auth/Login.js";
import type { DirtyType } from "../utils/generics/ResponseOK.js";

import { AuthMethod } from "../utils/Method.js";
import { AuthHeaderPreset } from "../utils/CommonHeaders.js";
import { ErrorHandling} from "../error/Request.js";

export type KardexInit = {
    campus: string;
    ciclo: string;
    cicloAdmision: string;
    progam: string;
    cede: string;
}

export class Kardex extends AuthMethod<Kardex> {
    protected Route: string = "https://micro-leo.udg.mx/esc-alumnos/v1/kardex";
    protected RequestBody: KardexInit;
    constructor(Auth: Login, init: KardexInit) {
        super(Auth);
        this.RequestBody = init;
    }

    async exec() {
        await super.exec()
        const body = {
            idalumno: this.Auth.StudentCode!,
            idcentro: this.RequestBody.campus,
            idciclo: this.RequestBody.ciclo,
            idcicloadmi: this.RequestBody.cicloAdmision,
            idprograma: this.RequestBody.progam,
            idsede: this.RequestBody.cede
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
