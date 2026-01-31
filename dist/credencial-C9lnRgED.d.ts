import { Card } from './interfaces/modules/soyalumno.d.js';

declare function Credencial(id: string): Promise<Card>;

declare const credencial_Credencial: typeof Credencial;
declare namespace credencial {
  export { credencial_Credencial as Credencial };
}

export { Credencial as C, credencial as c };
