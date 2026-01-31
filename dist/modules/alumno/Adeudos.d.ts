import { Client } from '../../client.js';
import '../../common/fetch.js';
import 'jsonwebtoken';
import '../../auth/tokens/createSessionToken.js';

declare function Adeudos(client: Client): Promise<never[]>;

export { Adeudos, Adeudos as default };
