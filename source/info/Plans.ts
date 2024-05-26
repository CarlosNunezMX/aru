import { Login } from "../auth/Login.js";
import { AuthHeaderPreset } from "../utils/CommonHeaders.js";
import { AuthMethod } from "../utils/Method.js";
import type { DirtyPlans, Plans } from "./PlansType.js";

export class StudentPlans extends AuthMethod<Plans>{
    protected Route: string = "https://micro-leo.udg.mx/esc-alumnos/v1/:studentCode/planes-estudios"; 
    constructor(Auth: Login){
        super(Auth);
    }

    async exec() {
        const url = new URL(
            this.Route.replace(":studentCode", this.Auth.StudentCode!)
        );

        const req = await fetch(url.toString(), {
            headers: AuthHeaderPreset(this.AuthToken, this.Auth.getToken().token!)
        })


        const data = await req.json() as DirtyPlans;
        return data.respuesta;

    }
}