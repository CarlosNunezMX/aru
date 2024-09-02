import type { Login } from "../../auth/Login.js";
import { ErrorHandling } from "../../error/Request.js";
import { AuthHeaderPreset } from "../../utils/CommonHeaders.js";
import { AuthMethod } from "../../utils/Method.js";
import type { DirtyProgramaCentro, Programa } from "./programa.js";

export class ProgramasCentros extends AuthMethod<Programa[], string> {
    protected Route: string = "https://micro-leo.udg.mx/esc-programas/v1/:centro/programas-centros";

    constructor(Auth: Login, init: string) {
        super(Auth, init)
    }

    async exec(): Promise<Programa[]> {
        await super.exec();
        const cache = this.getCache<Programa[]>(ProgramasCentros as typeof AuthMethod);

        if (cache)
            return cache;

        const url = this.Route.replace(":centro", this.Props!)
        const req = await fetch(url, {
            headers: AuthHeaderPreset(this.AuthToken, this.Auth.getToken().token!)
        });
        if (!req.ok)
            ErrorHandling(req);

        const data = await req.json() as DirtyProgramaCentro;

        this.UpdateCache.bind(this)(data.respuesta, ProgramasCentros as typeof AuthMethod)
        return data.respuesta;

    }
}