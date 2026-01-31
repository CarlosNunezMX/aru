import { OfertaCentro } from '../../interfaces/modules/Oferta.d.js';
import { Client } from '../../client.js';
import '../../interfaces/carreras/Carreras.d.js';
import '../../interfaces/Centros.d.js';
import '../../interfaces/modules/Horarios.d.js';
import '../../common/fetch.js';
import 'jsonwebtoken';
import '../../auth/tokens/createSessionToken.js';

declare function Centros(client: Client): Promise<OfertaCentro[]>;

export { Centros, Centros as default };
