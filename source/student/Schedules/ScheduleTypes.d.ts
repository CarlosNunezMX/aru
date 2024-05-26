import type { DirtyType } from "../../utils/generics/ResponseOK.js";

export type DirtySchedule = DirtyType<Materia[]>;
export type Dias = "Lunes" | "Martes" | "Miercoles" | "Jueves" | "Viernes" | "Sabado" | "Domingo";
export type Materia = {
    crn: string;
    idcurso: string;
    nombcurso: string;
    numeseccion: string;
    idcampus: string;
    creditos: string;
    horarios: Horario[]
    profesores: Profesor[]
}

export type Horario = {
    /** formato: dd-mm-yyyy */
    fechinicio: string;
    /** formato: dd-mm-yyyy */
    fechfin: string;
    horas: Horas[]
}
export type Horas = {
    dia: Dias;
    /** formato: (start)hhmm-hhmm(end) */
    hora: string;
    idedificio: string;
    edificio: string;
    numesalon: string;
}

export type Profesor = {
    nombres: string;
    apellidos: string;
    idprofesor: string;
};