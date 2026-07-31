import type { Carreras } from "@interfaces/carreras/Carreras";
import type { Centros } from "@interfaces/centros";
import type { Schedule } from "./horarios";

export interface OfertaCentro {
  idcentro: string;
  siglas: Centros;
  descripcion: string;
}

export interface OfertaCarreras<T extends Centros> {
  idcentro: string;
  programa: Carreras.SelectCentroCarreras<T>;
  desprograma: string;
}

export interface Oferta<
  Centro extends Centros,
  Carrera extends Carreras.SelectCentroCarreras<Centro>,
> {
  idciclo: string;
  subjmateria: string;
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
  horarios: Schedule.Schedule[];
  profesores: Schedule.Professor[];
}

export interface OfertaCiclos {
  ciclo: string;
  descripcion: string;
}
