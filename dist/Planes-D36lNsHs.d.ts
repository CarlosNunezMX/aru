import Plan from './interfaces/Planes.d.js';
import { Client } from './client.js';

declare function PlanesEstudios(client: Client): Promise<Plan[]>;

declare const Planes_PlanesEstudios: typeof PlanesEstudios;
declare namespace Planes {
  export { Planes_PlanesEstudios as PlanesEstudios };
}

export { Planes as P, PlanesEstudios as a };
