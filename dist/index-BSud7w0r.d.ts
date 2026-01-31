import { EliminarMateria } from './modules/agenda/Eliminar.js';
import { RegistrarMaterias } from './modules/agenda/Registrar.js';
import { ValidarRegistro } from './modules/agenda/Validar.js';

declare const index_EliminarMateria: typeof EliminarMateria;
declare const index_RegistrarMaterias: typeof RegistrarMaterias;
declare const index_ValidarRegistro: typeof ValidarRegistro;
declare namespace index {
  export { index_EliminarMateria as EliminarMateria, index_RegistrarMaterias as RegistrarMaterias, index_ValidarRegistro as ValidarRegistro };
}

export { index as i };
