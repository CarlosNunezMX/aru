import type { Login } from "../../auth/Login.js";
import { AuthHeaderPreset } from "../../utils/CommonHeaders.js";
import { AuthMethod } from "../../utils/Method.js";
import type { DirtySchedule } from "./ScheduleTypes.js";
export type ScheduleInit = {
    program: string;
    /** format 20xx-A|B */
    ciclo: string;
}
export class Schedule extends AuthMethod{
    protected Route: string = "https://micro-leo.udg.mx/esc-alumnos/v1/:studentCode/:programID/:academicTerm/horarios";
    private props: ScheduleInit; 
    constructor(Auth: Login, init: ScheduleInit){
        super(Auth);
        this.props = init;
    }

    async exec(): Promise<void> {
        const req_url = this.Route.replace(':studentCode', this.Auth.StudentCode!)
            .replace(':programID', this.props.program)
            .replace(':academicTerm', this.props.ciclo);

        const req = await fetch(req_url, {
            headers: AuthHeaderPreset(this.AuthToken, this.Auth.getToken().token!)
        })

        const data = await req.json() as DirtySchedule;
        console.log(data.respuesta[0].profesores[0]);

    }
}

