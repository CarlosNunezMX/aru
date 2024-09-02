import { ErrorHandling } from "../../error/Request.js";
import { AuthHeaderPreset } from "../../utils/CommonHeaders.js";
import { AuthMethod } from "../../utils/Method.js";
import type { CentroEducativo, DirtyCentroEducativo } from "./centro.js";

export class Centros extends AuthMethod<CentroEducativo[]> {
    protected Route: string = "https://micro-leo.udg.mx/esc-programas/v1/centros";
    async exec(): Promise<CentroEducativo[]> {
        super.exec();
        const cache = this.getCache<CentroEducativo[]>(Centros as typeof AuthMethod);
        if (cache)
            return cache;
        const req = await fetch("https://micro-leo.udg.mx/esc-programas/v1/centros", {
            headers: AuthHeaderPreset(this.AuthToken, this.Auth.getToken().token!)
        })

        if (!req.ok)
            ErrorHandling(req);

        const data = (await req.json()) as DirtyCentroEducativo;

        this.UpdateCache.bind(this)(data.respuesta, Centros as typeof AuthMethod)
        return data.respuesta;
    }

}