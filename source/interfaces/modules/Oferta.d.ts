import type { AruCarreras } from "@interfaces/carreras/Carreras";
import type { AruUtils } from "@interfaces/Centros";
import type { AruHorario } from "./Horarios";

export namespace AruOferta {

    export interface Centros {
        idcentro: string;
        siglas: AruUtils.Centros;
        descripcion: string;
    }


    export interface Carreras<T extends AruUtils.Centros = AruUtils.Centros> {
        idcentro: string;
        programa: AruUtils.TSelectCarrera<T>;
        desprograma: string;
    }

    export interface Oferta<Centro extends AruUtils.Centros = AruUtils.Centros, Carrera extends AruUtils.TSelectCarrera<Centro>> {
        idciclo: string;
        subjmateria: string
        idsede: string;
        idprograma: Carrera;
        crn: string;
        idmateria: string;
        descmateria: string;
        seccion: string;
        creditos: string;
        cupos: string;
        cupodisponibl: string;
        estacrn: string;
        horarios: AruHorario.Horario[];
        profesores: AruHorario.Profesor[];
    }

}