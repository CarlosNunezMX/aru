import { buildURL } from './chunk-PMKRVTJJ.js';
import { __export } from './chunk-MLKGABMK.js';

// source/modules/soyalumno/credencial.ts
var credencial_exports = {};
__export(credencial_exports, {
  Credencial: () => Credencial
});
function Encode(code) {
  const format = `${code}-${Math.floor(Date.now() / 1e3)}`;
  return btoa(btoa(format));
}
async function Credencial(id) {
  const url = buildURL("https://soyudg.udg.mx/alumnos/show?encryptedId=:studentCode", {
    studentCode: Encode(id)
  });
  const data = await fetch(url, {
    tls: {
      rejectUnauthorized: false
    }
  });
  const json = await data.json();
  return json.data;
}

export { Credencial, credencial_exports };
