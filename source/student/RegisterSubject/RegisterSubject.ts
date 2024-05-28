import type { Login } from "../../auth/Login.js";
import type { DirtyRegisterSubject, RegisterSubjectType } from "./RegisterSubjectTypes.js";

import { AuthMethod } from "../../utils/Method.js";
import { AuthHeaderPreset } from "../../utils/CommonHeaders.js";
import { ErrorHandling } from "../../error/Request.js";

export type RegisterSubjectInit = {
    idalumno: string;
    idprograma: string;
    nivel: string;
    idciclo: string;
    idcentro: string;
    cursos: string[];
}

export class RegisterSubject extends AuthMethod<RegisterSubjectType> {
    protected Route: string = "https://micro-leo.udg.mx/esc-registro/v1/";
    protected RequestBody: RegisterSubjectInit;

    constructor(Auth: Login, init: RegisterSubjectInit) {
        super(Auth);
        this.RequestBody = init;
    }

    async exec() {
        await super.exec();
        const body = {
            idalumno: this.RequestBody.idalumno,
            idprograma: this.RequestBody.idprograma,
            nivel: this.RequestBody.nivel,
            idciclo: this.RequestBody.idciclo,
            idcentro: this.RequestBody.idcentro,
            cursos: this.RequestBody.cursos
        };
        const request = await fetch(this.Route, {
            method: "POST",
            headers: AuthHeaderPreset(this.AuthToken, this.Auth.getToken().token!),
            body: JSON.stringify(body),
        })
        if(!request.ok)
            ErrorHandling(request);
        

        const data = await request.json() as DirtyRegisterSubject;
        return data.respuesta;
    }
}
