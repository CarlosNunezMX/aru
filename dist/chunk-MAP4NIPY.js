import { buildURL } from './chunk-PMKRVTJJ.js';
import { __export } from './chunk-MLKGABMK.js';

// source/modules/alumno/Planes.ts
var Planes_exports = {};
__export(Planes_exports, {
  PlanesEstudios: () => PlanesEstudios
});
async function PlanesEstudios(client) {
  const url = buildURL("https://leoalumnos-svc.udg.mx/alum/api/alumnos-esc/:code/planes-estudios", {
    code: client.session.userID
  });
  return await client.fetch.fetch(url);
}

export { PlanesEstudios, Planes_exports };
