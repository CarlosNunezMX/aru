// Plans.ts
import type { MethodNotAllowedType } from "../error/method_now_allowed.js";
import type { UnauthorizedType } from "../error/unauthorized_type.js";
import type { DirtyPlans, Plans } from "./PlansType.js";

import { Login } from "../auth/Login.js";
import { RequestError } from "../error/Request.js";
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
        const url = new URL(
            this.Route.replace(":studentCode", this.Auth.StudentCode!)
        );

        const req = await fetch(url.toString(), {
            headers: AuthHeaderPreset(this.AuthToken, this.Auth.getToken().token!)
        })


        if(!req.ok){
            if(req.status === 401){
                throw new RequestError<UnauthorizedType>(req);
            }
            if(req.status === 405){
                throw new RequestError<MethodNotAllowedType>(req);
            }
        }


        const data = await req.json() as DirtyPlans;
        return data.respuesta;

    }
}