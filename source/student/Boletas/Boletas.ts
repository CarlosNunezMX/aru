import type { Login } from "../../auth/Login.js";
import { ErrorHandling } from "../../error/Request.js";
import { StudentPlans } from "../../info/Plans.js";
import { type Plans } from "../../info/PlansType.js";
import { AuthHeaderPreset } from "../../utils/CommonHeaders.js";
import { AuthMethod } from "../../utils/Method.js";
import type { DirtyType } from "../../utils/generics/ResponseOK.js";
import type { BoletaType } from "./BoletaInfo.js";
export type BoletaInit = {
    idprograma: string;
    ciclefectivo: string;
}
export class Boleta extends AuthMethod<BoletaType, BoletaInit> {
    protected Route: string = "https://micro-leo.udg.mx/esc-alumnos/v1/:student code/:programID/:ciclo/boletas";

    constructor(Auth: Login, init?: BoletaInit){
        super(Auth, init);
    }

    async exec() {
        await super.exec();
        const Plans = new StudentPlans(this.Auth);
        const cache = this.getCache<BoletaType>(Boleta as typeof AuthMethod);
        if(cache)
            return cache;
        const {ciclefectivo, idprograma} = this.Props || this.Auth.getPlanfromCache(this.Auth.StudentCode!)![0] || (await Plans.exec())[0];

        const url = this.Route.replace(":student code", this.Auth.StudentCode!)
            .replace(":programID", idprograma)
            .replace(":ciclo", ciclefectivo);

        const req = await fetch(url, {
            headers: AuthHeaderPreset(this.AuthToken, this.Auth.getToken().token!)
        });

        if(!req.ok)
            ErrorHandling(req);

        const data = await req.json() as DirtyType<BoletaType>;
        this.UpdateCache.bind(this)(data.respuesta, Boleta as typeof AuthMethod);
        return data.respuesta;
    }
}
