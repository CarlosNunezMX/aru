import type { Login } from "../auth/Login";
import { RequestError } from "../error/Request";
import { AuthHeaderPreset } from "../utils/CommonHeaders";
import { AuthMethod } from "../utils/Method";
import type { DirtyStudentInfoType, StudentInfoType } from "./InfoType";

export class StudentInfo extends AuthMethod<StudentInfoType>{
    constructor(Auth: Login){
        super(Auth);
    }

    protected Route: string = "https://micro-leo.udg.mx/sii-alumnos/v1/:studentCode/datos-personales";

    override async exec() {
        await super.exec();
        const url = new URL(this.Route.replace(":studentCode", this.Auth.StudentCode as string))
        const data = await fetch(url.toString(), {
            headers: AuthHeaderPreset(this.AuthToken, this.Auth.getToken().token as string),
        })
        if(data.status !== 200){
            // TODO: Tipear esto, no se que regresa
            throw new RequestError<Record<string, any>>(data);
        }

        const dirtyResult = await data.json() as DirtyStudentInfoType;
        return dirtyResult.respuesta;
    }
}