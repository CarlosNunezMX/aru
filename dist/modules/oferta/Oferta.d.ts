import { Centros } from '../../interfaces/Centros.d.js';
import { Carreras } from '../../interfaces/carreras/Carreras.d.js';
import { Oferta } from '../../interfaces/modules/Oferta.d.js';
import { Client } from '../../client.js';
import '../../interfaces/modules/Horarios.d.js';
import '../../common/fetch.js';
import 'jsonwebtoken';
import '../../auth/tokens/createSessionToken.js';

interface OfertaParams {
    idCentro: string;
    carrera: Carreras.AnyCentro;
    ciclo: string;
}
declare function OfertaAcademica(client: Client, { carrera, ciclo, idCentro }: OfertaParams): Promise<Oferta<Centros, Carreras.AnyCentro>>;

export { OfertaAcademica };
