import type { Login } from "../../auth/Login.js";
import { ClassInitializeError } from "../../error/Initializer.js";
import { ErrorHandling } from "../../error/Request.js";
import { AuthHeaderPreset } from "../../utils/CommonHeaders.js";
import { AuthMethod } from "../../utils/Method.js";
import type { DirtyOfertaMateria, MateriaOferta, OfertaAcademicaRequest } from "./oferta.js";

export class OfertaAcademica extends AuthMethod<MateriaOferta[], OfertaAcademicaRequest> {
    protected Route: string = "https://micro-leo.udg.mx/esc-ofertas/v1/horas-nrc";
    constructor(auth: Login, init: Required<OfertaAcademicaRequest>) {
        super(auth, init);
    }

    async exec(): Promise<MateriaOferta[]> {
        if (!this.Props)
            throw new ClassInitializeError("Expected OfertaAcademicaRequest");

        const cache = this.getCache<MateriaOferta[]>(OfertaAcademica as typeof AuthMethod);
        if (cache)
            return cache;

        const request = await fetch(this.Route, {
            method: "POST",
            body: JSON.stringify(this.Props),
            headers: AuthHeaderPreset(this.AuthToken, this.Auth.getToken().token!)
        });

        if (!request.ok)
            ErrorHandling(request);

        const { respuesta } = await request.json() as DirtyOfertaMateria;
        this.UpdateCache<MateriaOferta[]>(respuesta, OfertaAcademica as typeof AuthMethod);
        return respuesta;
    }
}