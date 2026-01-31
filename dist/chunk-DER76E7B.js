import { buildURL } from './chunk-PMKRVTJJ.js';

// source/modules/alumno/Horario.ts
function Horario(client, { carrera, ciclo }) {
  const url = buildURL(
    "https://leoalumnos-svc.udg.mx/alum/api/alumnos-esc/:code/:carrera/:ciclo/horarios",
    {
      carrera,
      ciclo,
      code: client.session.userID
    }
  );
  return client.fetch.fetch(url);
}

export { Horario };
