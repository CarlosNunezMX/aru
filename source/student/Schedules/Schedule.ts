import type { Login } from "../../auth/Login.js";
import type { DirtySchedule, Materia } from "./ScheduleTypes.js";

import { AuthHeaderPreset } from "../../utils/CommonHeaders.js";
import { AuthMethod } from "../../utils/Method.js";
import { ErrorHandling } from "../../error/Request.js";
import { StudentPlans } from "../../info/Plans.js";

export type ScheduleInit = {
    idprograma?: string;
    /** format 20xx-A|B */
    ciclo: string;
}

/**
 * Get the student schedule, this contains the student schedule and the teacher info
 */
export class Schedule extends AuthMethod<Materia[]>{
    protected Route: string = "https://micro-leo.udg.mx/esc-alumnos/v1/:studentCode/:programID/:academicTerm/horarios";
    private props: ScheduleInit; 
    constructor(Auth: Login, init: ScheduleInit){
        super(Auth);
        this.props = init;
    }

    async exec(){
        await super.exec()
        const idprograma = this.props.idprograma || (await new StudentPlans(this.Auth).exec())[0].idprograma;
        const req_url = this.Route.replace(':studentCode', this.Auth.StudentCode!)
            .replace(':programID', idprograma)
            .replace(':academicTerm', this.props.ciclo);

        const req = await fetch(req_url, {
            headers: AuthHeaderPreset(this.AuthToken, this.Auth.getToken().token!)
        })

        if(!req.ok)
            ErrorHandling(req);

        const data = await req.json() as DirtySchedule;
        return data.respuesta;

    }
}

