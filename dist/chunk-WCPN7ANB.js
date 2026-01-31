import { buildURL } from './chunk-PMKRVTJJ.js';

// source/modules/alumno/Alumno.ts
async function Alumno(client) {
  const url = buildURL(
    "https://leoalumnos-svc.udg.mx/alum/api/alumnos-sii/:codigo/datos-personales",
    { codigo: client.session.userID }
  );
  const res = await client.fetch.fetch(url);
  return res;
}

export { Alumno };
