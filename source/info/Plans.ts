// Plans.ts
import type { DirtyPlans, Plans } from "./PlansType.js";

import { Login } from "../auth/Login.js";
import { ErrorHandling } from "../error/Request.js";
import { AuthHeaderPreset } from "../utils/CommonHeaders.js";
import { AuthMethod } from "../utils/Method.js";

/**
 * Get the student available plans
 */
export class StudentPlans extends AuthMethod<Plans>{
    protected Route: string = "https://micro-leo.udg.mx/esc-alumnos/v1/:studentCode/planes-estudios"; 
    constructor(Auth: Login){
        super(Auth);
    }

    async exec() {
        await super.exec()
        const cache = this.getCache<Plans>(StudentPlans as typeof AuthMethod);
        
        if(cache)
            return cache

        const url = this.Route.replace(":studentCode", this.Auth.StudentCode!);

        const req = await fetch(url, {
            headers: AuthHeaderPreset(this.AuthToken, this.Auth.getToken().token!)
        })


        if(!req.ok)
            ErrorHandling(req);


        const data = await req.json() as DirtyPlans;
        this.UpdateCache.bind(this)(data.respuesta, StudentPlans as typeof AuthMethod)
        return data.respuesta;

    }
}