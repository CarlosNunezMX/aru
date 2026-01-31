import { __export, buildURL, HttpError } from '../chunk-7BWY7PGV.js';

// source/modules/oferta/index.ts
var oferta_exports = {};
__export(oferta_exports, {
  Carreras: () => Carreras,
  Centros: () => Centros,
  OfertaAcademica: () => OfertaAcademica
});

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

// source/modules/oferta/Centros.ts
async function Centros(client) {
  const url = "https://leoalumnos-svc.udg.mx/alum/api/programas/centros";
  return await client.fetch.fetch(url);
}

// source/modules/oferta/Oferta.ts
async function OfertaAcademica(client, { carrera, ciclo, idCentro }) {
  const url = "https://leoalumnos-svc.udg.mx/alum/api/ofertas/horas-nrc";
  return client.fetch.fetch(url, {
    method: "POST",
    body: JSON.stringify({
      idcentro: idCentro,
      idprograma: carrera,
      idciclo: ciclo
    })
  });
}

// source/modules/agenda/index.ts
var agenda_exports = {};
__export(agenda_exports, {
  EliminarMateria: () => EliminarMateria,
  RegistrarMaterias: () => RegistrarMaterias,
  ValidarRegistro: () => ValidarRegistro
});

// source/modules/agenda/Eliminar.ts
async function EliminarMateria(client, { carrera, centro, ciclo, cursos, nivel = "LI" }) {
  const url = "https://leoalumnos-svc.udg.mx/alum/api/registro/cursos";
  const body = {
    idalumno: client.session.userID,
    idprograma: carrera,
    nivel,
    idciclo: ciclo,
    idcentro: centro,
    cursos
  };
  await client.fetch.fetch(url, {
    method: "DELETE",
    body: JSON.stringify(body)
  });
}

// source/modules/agenda/Registrar.ts
async function RegistrarMaterias(client, { carrera, centro, ciclo, materias, nivel = "LI" }) {
  const url = "https://leoalumnos-svc.udg.mx/alum/api/registro/";
  const body = {
    cursos: materias,
    idalumno: client.session.userID,
    idcentro: centro,
    idciclo: ciclo,
    idprograma: carrera,
    nivel
  };
  await client.fetch.fetch(url, {
    method: "POST",
    body: JSON.stringify(body)
  });
}

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

// source/modules/alumno/index.ts
var alumno_exports = {};
__export(alumno_exports, {
  Adeudos: () => Adeudos,
  Alumno: () => Alumno,
  Horario: () => Horario,
  PlanesEstudios: () => PlanesEstudios
});

// source/modules/alumno/Adeudos.ts
async function Adeudos(client) {
  const url = buildURL("https://leoalumnos-svc.udg.mx/alum/api/alumnos-sii/:codigo/adeudos", {
    codigo: client.session.userID
  });
  const res = await client.fetch.fetch(url);
  if (typeof res === "string") return [];
  return res;
}

// source/modules/alumno/Alumno.ts
async function Alumno(client) {
  const url = buildURL(
    "https://leoalumnos-svc.udg.mx/alum/api/alumnos-sii/:codigo/datos-personales",
    { codigo: client.session.userID }
  );
  const res = await client.fetch.fetch(url);
  return res;
}

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

export { agenda_exports as Agenda, alumno_exports as Alumno, credencial_exports as Credencial, oferta_exports as Oferta, Planes_exports as PlanesEstudios };
