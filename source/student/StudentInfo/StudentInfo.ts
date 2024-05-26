import type { Login } from "../../auth/Login.js";
import type { DirtyStudentInfoType, StudentInfoType } from "./InfoType.js";
import type { UnauthorizedType } from "../../error/unauthorized_type.js";
import type { MethodNotAllowedType } from "../../error/method_now_allowed.js";

import { RequestError } from "../../error/Request.js";
import { AuthHeaderPreset } from "../../utils/CommonHeaders.js";
import { AuthMethod } from "../../utils/Method.js";

export class StudentInfo extends AuthMethod<StudentInfoType>{
    constructor(Auth: Login){
        super(Auth);
    }

    protected Route: string = "https://micro-leo.udg.mx/sii-alumnos/v1/:studentCode/datos-personales";

    override async exec() {
        await super.exec();
        const url = new URL(this.Route.replace(":studentCode", this.Auth.StudentCode as string))
        const req = await fetch(url.toString(), {
            headers: AuthHeaderPreset(this.AuthToken, this.Auth.getToken().token as string),
        })
        
        if(!req.ok){
            if(req.status === 401){
                throw new RequestError<UnauthorizedType>(req);
            }
            if(req.status === 405){
                throw new RequestError<MethodNotAllowedType>(req);
            }

        }

        const data = await req.json() as DirtyStudentInfoType;
        return data.respuesta;
    }
}