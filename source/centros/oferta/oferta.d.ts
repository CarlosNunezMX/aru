import type { Horario, Profesor } from "../../student/Schedules/ScheduleTypes.js";
import type { DirtyType } from "../../utils/generics/ResponseOK.js";

export interface MateriaOferta {
    idciclo: string;
    idcentro: string;
    subjmateria: string;
    idsede: string;
    idprograma: string;
    crn: string;
    idmateria: string;
    descmateria: string;
    seccion: string;
    creditos: string;
    cupos: string;
    cupodisponibl: string;
    esttacrn: string;

    horarios: Horario[];
    profesores: Profesor[]
}

export type DirtyOfertaMateria = DirtyType<MateriaOferta[]>;

export type OfertaAcademicaRequest = {
    idcentro: string;
    idciclo: string;
    idprograma: string;
};