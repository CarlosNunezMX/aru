import { buildURL } from './chunk-PMKRVTJJ.js';

// source/modules/oferta/Carreras.ts
async function Carreras(client, centro) {
  const url = buildURL(
    "https://leoalumnos-svc.udg.mx/alum/api/programas/:centro/programas-centros",
    {
      centro
    }
  );
  return await client.fetch.fetch(url);
}

export { Carreras };
