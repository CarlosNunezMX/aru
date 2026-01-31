import { HttpError } from './chunk-NUKHZIIW.js';

// source/modules/agenda/Validar.ts
async function ValidarRegistro(client, { carrera, centro, ciclo }) {
  try {
    const url = "https://leoalumnos-svc.udg.mx/alum/api/registro/validaciones-alumnos";
    const body = {
      idalumno: client.session.userID,
      idcentro: centro,
      idciclo: ciclo,
      idprograma: carrera
    };
    await client.fetch.fetch(url, {
      method: "POST",
      body: JSON.stringify(body)
    });
    return true;
  } catch (err) {
    if (!(err instanceof HttpError)) throw err;
    if (err.code !== 201) throw err;
    return false;
  }
}

export { ValidarRegistro };
