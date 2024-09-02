import { ClassInitializeError } from "../../error/Initializer.js";
import { ErrorHandling } from "../../error/Request.js";
import { AuthHeaderPreset } from "../../utils/CommonHeaders.js";
import { AuthMethod } from "../../utils/Method.js";
import type { Ciclo, DirtyCiclo } from "./ciclo.js";

export class Ciclos extends AuthMethod<Ciclo[], string> {
    protected Route: string = "https://micro-leo.udg.mx/esc-programas/v1/:carrera/ciclos";

    async exec(): Promise<Ciclo[]> {
        if (!this.Props)
            throw new ClassInitializeError("Prop ProgramaEducativo is required!");


        const cache = this.getCache<Ciclo[]>(Ciclos as typeof AuthMethod);
        if (cache)
            return cache;

        const url = this.Route.replace(":carrera", this.Props);
        const request = await fetch(url, {
            headers: AuthHeaderPreset(this.AuthToken, this.Auth.getToken().token!)
        })

        if (!request.ok)
            ErrorHandling(request);

        const data = await request.json() as DirtyCiclo;

        this.UpdateCache.bind(this)(data.respuesta, Ciclos as typeof AuthMethod)
        return data.respuesta;
    }
}