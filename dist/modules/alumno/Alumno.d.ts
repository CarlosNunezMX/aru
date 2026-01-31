import { IAlumno } from '../../interfaces/modules/Alumno.js';
import { Client } from '../../client.js';
import '../../common/fetch.js';
import 'jsonwebtoken';
import '../../auth/tokens/createSessionToken.js';

declare function Alumno(client: Client): Promise<IAlumno>;

export { Alumno };
