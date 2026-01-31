import { buildURL } from './chunk-PMKRVTJJ.js';

// source/modules/alumno/Adeudos.ts
async function Adeudos(client) {
  const url = buildURL("https://leoalumnos-svc.udg.mx/alum/api/alumnos-sii/:codigo/adeudos", {
    codigo: client.session.userID
  });
  const res = await client.fetch.fetch(url);
  if (typeof res === "string") return [];
  return res;
}
var Adeudos_default = Adeudos;

export { Adeudos, Adeudos_default };
