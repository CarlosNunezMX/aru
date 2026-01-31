import { Adeudos } from './modules/alumno/Adeudos.js';
import { Alumno } from './modules/alumno/Alumno.js';
import { Horario } from './modules/alumno/Horario.js';
import { a as PlanesEstudios } from './Planes-D36lNsHs.js';

declare const index_Adeudos: typeof Adeudos;
declare const index_Alumno: typeof Alumno;
declare const index_Horario: typeof Horario;
declare const index_PlanesEstudios: typeof PlanesEstudios;
declare namespace index {
  export { index_Adeudos as Adeudos, index_Alumno as Alumno, index_Horario as Horario, index_PlanesEstudios as PlanesEstudios };
}

export { index as i };
