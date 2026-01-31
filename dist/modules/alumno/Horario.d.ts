import { Schedule } from '../../interfaces/modules/Horarios.d.js';
import { Client } from '../../client.js';
import '../../common/fetch.js';
import 'jsonwebtoken';
import '../../auth/tokens/createSessionToken.js';

interface HorarioProps {
    carrera: string;
    ciclo: string;
}
declare function Horario(client: Client, { carrera, ciclo }: HorarioProps): Promise<Schedule.Item[]>;

export { Horario };
