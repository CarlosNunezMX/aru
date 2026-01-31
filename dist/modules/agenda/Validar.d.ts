import { Carreras } from '../../interfaces/carreras/Carreras.d.js';
import { Client } from '../../client.js';
import '../../common/fetch.js';
import 'jsonwebtoken';
import '../../auth/tokens/createSessionToken.js';

interface ValidarRegistroProps {
    centro: string;
    carrera: Carreras.AnyCentro;
    ciclo: string;
}
declare function ValidarRegistro(client: Client, { carrera, centro, ciclo }: ValidarRegistroProps): Promise<boolean>;

export { ValidarRegistro };
