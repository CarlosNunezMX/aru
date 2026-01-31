import { Carreras } from '../../interfaces/carreras/Carreras.d.js';
import { Client } from '../../client.js';
import '../../common/fetch.js';
import 'jsonwebtoken';
import '../../auth/tokens/createSessionToken.js';

interface RegistroMateriasProps {
    materias: string[];
    carrera: Carreras.AnyCentro;
    centro: string;
    ciclo: string;
    nivel: string | "LI";
}
declare function RegistrarMaterias(client: Client, { carrera, centro, ciclo, materias, nivel }: RegistroMateriasProps): Promise<void>;

export { RegistrarMaterias };
