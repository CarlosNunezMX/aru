import { auth_default, buildURL, HttpError } from '../chunk-QC6FMZIP.js';

// source/modules/oferta.ts
async function OfertaAcademicaCentros(client) {
  const url = "https://leoalumnos-svc.udg.mx/alum/api/programas/centros";
  return await client.fetch.fetch(url);
}
async function OfertaAcademicaCarreras(client, centro) {
  const url = buildURL(
    "https://leoalumnos-svc.udg.mx/alum/api/programas/:centro/programas-centros",
    { centro }
  );
  return await client.fetch.fetch(url);
}
function OfertaCentroCiclos(client, carrera) {
  const url = buildURL(
    "https://leoalumnos-svc.udg.mx/alum/api/programas/:carrera/ciclos",
    { carrera }
  );
  return client.fetch.fetch(url);
}
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

// source/modules/agenda.ts
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

// source/modules/credential.ts
var SoyAlumnoNoDisponible = class extends Error {
  constructor() {
    super("Soy Alumno no disponible");
    this.name = "SoyAlumnoNoDisponible";
  }
};
function Encode(code) {
  const format = `${code}-${Math.floor(Date.now() / 1e3)}`;
  return btoa(btoa(format));
}
async function Credential(id) {
  const url = buildURL(
    "https://soyudg.udg.mx/alumnos/show?encryptedId=:studentCode",
    {
      studentCode: Encode(id)
    }
  );
  const data = await fetch(url, {
    tls: {
      rejectUnauthorized: false
    }
  });
  const json = await data.json();
  if (!json.data) new SoyAlumnoNoDisponible();
  return json.data;
}

// source/modules/alumno/planes.ts
async function PlanesEstudios(client) {
  const url = buildURL(
    "https://leoalumnos-svc.udg.mx/alum/api/alumnos-esc/:code/planes-estudios",
    {
      code: client.session.userID
    }
  );
  return await client.fetch.fetch(url);
}

// source/modules/alumno/adeudos.ts
async function Adeudos(client) {
  const url = buildURL("https://leoalumnos-svc.udg.mx/alum/api/alumnos-sii/:codigo/adeudos", {
    codigo: client.session.userID
  });
  const res = await client.fetch.fetch(url);
  if (typeof res === "string") return [];
  return res;
}

// source/modules/alumno/alumno.ts
async function Alumno(client) {
  const url = buildURL(
    "https://leoalumnos-svc.udg.mx/alum/api/alumnos-sii/:codigo/datos-personales",
    { codigo: client.session.userID }
  );
  const res = await client.fetch.fetch(url);
  return res;
}

// source/modules/alumno/schedule.ts
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

// source/auth/SecurityKit.ts
var AccountSecurityKit = class {
  static key = this.generateKey();
  static generateKey() {
    const raw = "M@@kD;uEr@s?ClkMpM9CqmFABD:nuq>o~)8";
    const clean_raw = auth_default.decode(auth_default.clean(raw));
    const encoded = new TextEncoder().encode(clean_raw);
    return crypto.subtle.importKey("raw", encoded, { name: "AES-CBC" }, false, [
      "decrypt"
    ]);
  }
  static fromBase64(str) {
    const bin = atob(str);
    const bytes = new Uint8Array(bin.length);
    return new Promise((res) => {
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      res(bytes);
    });
  }
  static retriveIV(str) {
    let reduced = str.substring(0, 24);
    const splited = reduced.replaceAll("-", "/").split("");
    splited[reduced.length - 1] = "=";
    splited[reduced.length - 2] = "=";
    return this.fromBase64(splited.join(""));
  }
  static retriveBody(str) {
    let reduced = str.substring(24);
    const last = reduced.charAt(reduced.length - 1);
    reduced = reduced.slice(0, -1).replaceAll("-", "/");
    const splited = reduced.split("");
    if (last === "1") splited[splited.length - 1] = "=";
    else if (last === "2") {
      splited[splited.length - 1] = "=";
      splited[splited.length - 2] = "=";
    }
    return this.fromBase64(splited.join(""));
  }
  static async decrypt(pwd) {
    const key = await this.key;
    const [iv, body] = await Promise.all([
      this.retriveIV(pwd),
      this.retriveBody(pwd)
    ]);
    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-CBC", iv },
      key,
      body
    );
    return new TextDecoder().decode(decrypted).slice(0, -13);
  }
};

// source/modules/alumno/email.ts
async function EmailAccounts(client, idCentro) {
  const url365 = buildURL(
    "https://leoalumnos-svc.udg.mx/alum/api/servicios-sii/:codigo/cuentas-office",
    {
      codigo: client.session.userID
    }
  );
  const urlGogle = buildURL(
    "https://leoalumnos-svc.udg.mx/alum/api/servicios-esc/:codigo/:idCentro/cuentas-google",
    {
      codigo: client.session.userID,
      idCentro
    }
  );
  const [MicrosoftRaw, GoogleRaw] = await Promise.all([
    client.fetch.fetch(url365),
    client.fetch.fetch(urlGogle)
  ]);
  const [MicrosoftPWD, GooglePWD] = await Promise.all([
    AccountSecurityKit.decrypt(MicrosoftRaw.correos[0].contrasenia),
    AccountSecurityKit.decrypt(GoogleRaw.correos[0].contrasenia)
  ]);
  const microsoft = {
    mail: MicrosoftRaw.correos[0].correlectro,
    password: MicrosoftPWD,
    status: MicrosoftRaw.correos[0].estacuenta.toLowerCase() === "activa"
  };
  const google = {
    mail: GoogleRaw.correos[0].correlectro,
    password: GooglePWD,
    status: GoogleRaw.correos[0].estacuenta.toLowerCase() === "activa"
  };
  return { microsoft, google };
}

export { Adeudos, Alumno, Credential, EliminarMateria, EmailAccounts, Horario, OfertaAcademica, OfertaAcademicaCarreras, OfertaAcademicaCentros, OfertaCentroCiclos, PlanesEstudios, RegistrarMaterias, ValidarRegistro };
