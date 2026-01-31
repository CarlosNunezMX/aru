import { Carreras } from './modules/oferta/Carreras.js';
import { Centros } from './modules/oferta/Centros.js';
import { OfertaAcademica } from './modules/oferta/Oferta.js';

declare const index_Carreras: typeof Carreras;
declare const index_Centros: typeof Centros;
declare const index_OfertaAcademica: typeof OfertaAcademica;
declare namespace index {
  export { index_Carreras as Carreras, index_Centros as Centros, index_OfertaAcademica as OfertaAcademica };
}

export { index as i };
