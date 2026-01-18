export namespace Schedule {
  export interface Item {
    crn: string;
    idcurso: string;
    nombrecurso: string;
    numeseccion: string;
    idcampus: string;
    creditos: string;
    horarios: Schedule[];
    profesores: Professor[];
    tiporegistro: string;
  }
  export type WeekDay =
    | "Lunes"
    | "Martes"
    | "Miércoles"
    | "Jueves"
    | "Viernes"
    | "Sábado";
  export interface Hour {
    dia: WeekDay;
    hora: string;
    idedificio: string;
    edificio: string;
    numesalon: string;
  }

  export interface Professor {
    nombres: string;
    apellidos: string;
    idprofesor: string;
  }

  export type Schedule = {
    /**
     * dd-mm-yyyy
     */
    fechainicio: string;
    /**
     * dd-mm-yyyy
     */
    fechafin: string;
    horas: Hour[];
  };
}
