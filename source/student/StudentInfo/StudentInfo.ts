import type { Login } from "../../auth/Login.js";
import type { DirtyStudentInfoType, StudentInfoType } from "./InfoType.js";

import { ErrorHandling } from "../../error/Request.js";
import { AuthHeaderPreset } from "../../utils/CommonHeaders.js";
import { AuthMethod } from "../../utils/Method.js";

/**
 * Get the student info, photo and signature
 */
export class StudentInfo extends AuthMethod<StudentInfoType>{
    constructor(Auth: Login){
        super(Auth);
    }

    protected Route: string = "https://micro-leo.udg.mx/sii-alumnos/v1/:studentCode/datos-personales";

    async exec() {
        await super.exec();
        const url = new URL(this.Route.replace(":studentCode", this.Auth.StudentCode as string))
        const req = await fetch(url.toString(), {
            headers: AuthHeaderPreset(this.AuthToken, this.Auth.getToken().token as string),
        })
        
        if(!req.ok)
            ErrorHandling(req);

        const data = await req.json() as DirtyStudentInfoType;
        return data.respuesta;
    }
}