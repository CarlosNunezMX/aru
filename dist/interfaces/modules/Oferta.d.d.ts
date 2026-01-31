import { Carreras } from '../carreras/Carreras.d.js';
import { Centros } from '../Centros.d.js';
import { Schedule } from './Horarios.d.js';

interface OfertaCentro {
  idcentro: string;
  siglas: Centros;
  descripcion: string;
}


interface OfertaCarreras<T extends Centros> {
  idcentro: string;
  programa: AruUtils.TSelectCarrera<T>;
  desprograma: string;
}

interface Oferta<Centro extends Centros, Carrera extends Carreras.TSelectCarrera<Centro>> {
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
  horarios: Schedule.Schedule[];
  profesores: Schedule.Professor[];
}

export type { Oferta, OfertaCarreras, OfertaCentro };
