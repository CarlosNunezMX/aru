import { Centros } from '../../interfaces/Centros.d.js';
import { OfertaCarreras } from '../../interfaces/modules/Oferta.d.js';
import { Client } from '../../client.js';
import '../../interfaces/carreras/Carreras.d.js';
import '../../interfaces/modules/Horarios.d.js';
import '../../common/fetch.js';
import 'jsonwebtoken';
import '../../auth/tokens/createSessionToken.js';

declare function Carreras(client: Client, centro: string): Promise<OfertaCarreras<Centros>[]>;

export { Carreras };
