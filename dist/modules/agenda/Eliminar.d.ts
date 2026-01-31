import { Carreras } from '../../interfaces/carreras/Carreras.d.js';
import { Client } from '../../client.js';
import '../../common/fetch.js';
import 'jsonwebtoken';
import '../../auth/tokens/createSessionToken.js';

interface EliminarMateriaProps {
    cursos: string[];
    carrera: Carreras.AnyCentro;
    centro: string;
    ciclo: string;
    nivel: string;
}
declare function EliminarMateria(client: Client, { carrera, centro, ciclo, cursos, nivel }: EliminarMateriaProps): Promise<void>;

export { EliminarMateria };
