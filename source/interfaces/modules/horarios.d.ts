export namespace AruHorario {

    export type DiaSem = "Lunes" | "Martes" | "Miercoles" | "Jueves" | "Viernes" | "Sábado";
    export interface Hora {
        /**
         * @description ```
         * 0900
         *  ^ ^
         *  H M
         * ```
         */
        horainicio: string;
        /**
         * @description ```
         * 0900
         *  ^ ^
         *  H M
         * ```
         */
        horafin: string;
        dia: DiaSem;
        idedificio: string;
        descedificio: string;
        aula: string;

    };

    export interface Profesor {
        indiprimario: string;
        nombprofesor: string;
    }

    export type Horario = {
        fechainicio: string;
        fechafin: string;
        horas: Hora[]
    }

}