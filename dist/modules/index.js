import { auth_default, buildURL, HttpError } from '../chunk-FCGG466J.js';

// source/modules/adeudos.ts
async function Adeudos(client) {
  const studentId = client.session.studentId;
  const url = buildURL("https://leoalumnos-svc.udg.mx/alum/api/alumnos-sii/:studentId/adeudos", { studentId });
  const res = await client.fetch.fetch(url);
  if (typeof res === "string")
    return [];
  return res;
}

// source/transformers/agenda.ts
var months = {
  enero: 0,
  febrero: 1,
  marzo: 2,
  abril: 3,
  mayo: 4,
  junio: 5,
  julio: 6,
  agosto: 7,
  septiembre: 8,
  octubre: 9,
  noviembre: 10,
  diciembre: 11
};
function parseRegistrationPeriod(text) {
  const regex = /(\d{2}) de (\w+) de (\d{4}) a (?:partir de )?las (\d{2}:\d{2})/gi;
  const matches = [...text.matchAll(regex)];
  if (matches.length !== 2) {
    throw new Error("No se pudo extraer el periodo de registro.");
  }
  const toDate = (match) => {
    const [, day, month, year, time] = match;
    const [hour, minute] = time.split(":").map(Number);
    return new Date(Number(year), months[month.toLowerCase()], Number(day), hour, minute);
  };
  return {
    start: toDate(matches[0]),
    end: toDate(matches[1])
  };
}

// source/modules/agenda.ts
async function DeleteCourse(client, { courses, cycleId, hostId, level = "LI", programId }) {
  const studentId = client.session.studentId;
  const url = "https://leoalumnos-svc.udg.mx/alum/api/registro/cursos";
  const body = {
    idalumno: studentId,
    idprograma: programId,
    nivel: level,
    idciclo: cycleId,
    idcentro: hostId,
    cursos: courses
  };
  await client.fetch.fetch(url, {
    method: "DELETE",
    body: JSON.stringify(body)
  });
}
async function RegisterCourses(client, { courses, cycleId, hostId, programId, level = "LI" }) {
  const url = "https://leoalumnos-svc.udg.mx/alum/api/registro/";
  const studentId = client.session.studentId;
  const body = {
    cursos: courses,
    idalumno: studentId,
    idcentro: hostId,
    idciclo: cycleId,
    idprograma: programId,
    nivel: level
  };
  await client.fetch.fetch(url, {
    method: "POST",
    body: JSON.stringify(body)
  });
}
async function IsAgendaOpened(client, { cycleId, hostId, programId }) {
  try {
    const url = "https://leoalumnos-svc.udg.mx/alum/api/registro/validaciones-alumnos";
    const studentId = client.session.studentId;
    const body = {
      idalumno: studentId,
      idcentro: hostId,
      idciclo: cycleId,
      idprograma: programId
    };
    await client.fetch.fetch(url, {
      method: "POST",
      body: JSON.stringify(body)
    });
    return true;
  } catch (err) {
    if (!(err instanceof HttpError))
      throw err;
    if (err.code !== 201)
      throw err;
    return parseRegistrationPeriod(err.message);
  }
}

// source/modules/constancy.ts
async function Constancy(client, { cycleId, programId }) {
  const studentId = client.session.studentId;
  const url = buildURL("https://leoalumnos-svc.udg.mx/alum/api/alumnos-esc/:studentId/:programId/:cycleId/constancias", { studentId, cycleId, programId });
  const req = await client.fetch.fetch(url);
  return req;
}

// source/transformers/studentCard.ts
function StudentCardTransformer(raw) {
  const toSignature = (signaturer, signature) => ({
    signature,
    signaturer
  });
  return {
    name: raw.nombre,
    lastName: `${raw.apellido_paterno} ${raw.apellido_materno}`,
    curp: raw.curp,
    imss: raw.imss,
    host: raw.centroDesc,
    idHost: raw.centro,
    venue: raw.sede,
    photo: raw.foto,
    qr: raw.qr,
    signature: raw.firma,
    rectorSignature: toSignature(raw.nombreRector, raw.firmaRector),
    tarjeta_informador: raw.tarjeta_informador
  };
}

// source/modules/studentCard.ts
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
async function StudentCard(id) {
  const url = buildURL("https://soyudg.udg.mx/alumnos/show?encryptedId=:studentCode", {
    studentCode: Encode(id)
  });
  const data = await fetch(url, {
    tls: {
      rejectUnauthorized: false
    }
  });
  const json = await data.json();
  if (!json.data || json.data.error)
    new SoyAlumnoNoDisponible();
  return StudentCardTransformer(json.data);
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
      for (let i = 0; i < bin.length; i++)
        bytes[i] = bin.charCodeAt(i);
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
    if (last === "1")
      splited[splited.length - 1] = "=";
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
    const decrypted = await crypto.subtle.decrypt({ name: "AES-CBC", iv }, key, body);
    return new TextDecoder().decode(decrypted).slice(0, -13);
  }
};

// source/modules/email.ts
async function EmailAccounts(client, hostId) {
  const studentId = client.session.sessionID;
  const url365 = buildURL("https://leoalumnos-svc.udg.mx/alum/api/servicios-sii/:studentId/cuentas-office", { studentId });
  const urlGogle = buildURL("https://leoalumnos-svc.udg.mx/alum/api/servicios-esc/:studentId/:hostId/cuentas-google", { studentId, hostId });
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

// source/modules/kardex.ts
async function Kardex(client, { admissionCycleId, currentCycleId, hostId, programId, venueId }) {
  const studentId = client.session.studentId;
  const url = "https://leoalumnos-svc.udg.mx/alum/api/alumnos-esc/kardex";
  const req = await client.fetch.fetch(url, {
    body: JSON.stringify({
      idalumno: studentId,
      idcentro: hostId,
      idciclo: currentCycleId,
      idcicloadmi: admissionCycleId,
      idprograma: programId,
      idsede: venueId
    })
  });
  return req;
}

// source/transformers/offer.ts
var OfferTransformer = class {
  static transformHours(raw) {
    const parseRawHourStr = (str) => `${str.slice(0, 2)}:${str.slice(-2)}`;
    return {
      building: raw.descedificio,
      buildingId: raw.idedificio,
      classroom: raw.aula,
      day: raw.dia,
      end: parseRawHourStr(raw.horafin),
      start: parseRawHourStr(raw.horainicio)
    };
  }
  static transformSchedule(raw) {
    return {
      end: new Date(raw.fechfin),
      start: new Date(raw.fechinicio),
      hours: raw.horas ? raw.horas.map((h) => this.transformHours(h)) : []
    };
  }
  static transform(raw) {
    return {
      cycleId: raw.idciclo,
      subject: raw.subjmateria,
      hostId: raw.idsede,
      programId: raw.idprograma,
      program: raw.descarrera,
      courseId: raw.idmateria,
      courseName: raw.descmateria,
      subjectId: raw.idmateria,
      section: raw.seccion,
      sectionId: raw.crn,
      seats: Number(raw.cupos),
      availableSeats: Number(raw.cupodisponibl),
      credits: Number(raw.creditos),
      teachers: raw.profesores.map((prof) => prof.nombprofesor),
      schedule: raw.horarios.map((schedule) => this.transformSchedule(schedule))
    };
  }
  static transformOfferHost(host) {
    return {
      id: host.idcentro,
      acronym: host.siglas,
      name: host.descripcion
    };
  }
  static transformOfferProgram(raw) {
    return {
      hostId: raw.idcentro,
      program: raw.desprograma,
      programId: raw.programa
    };
  }
  static transformOfferCycle(raw) {
    return {
      cycle: raw.descripcion,
      id: raw.ciclo
    };
  }
};

// source/modules/offer.ts
async function OfferHosts(client) {
  const url = "https://leoalumnos-svc.udg.mx/alum/api/programas/centros";
  const hosts = await client.fetch.fetch(url);
  return hosts.map((host) => OfferTransformer.transformOfferHost(host));
}
async function OfferPrograms(client, hostId) {
  const url = buildURL("https://leoalumnos-svc.udg.mx/alum/api/programas/:hostId/programas-centros", { hostId });
  const programs = await client.fetch.fetch(url);
  return programs.map((program) => OfferTransformer.transformOfferProgram(program));
}
async function OfferCycles(client, programId) {
  const url = buildURL("https://leoalumnos-svc.udg.mx/alum/api/programas/:programId/ciclos", { programId });
  const cycles = await client.fetch.fetch(url);
  return cycles.map((cycle) => OfferTransformer.transformOfferCycle(cycle));
}
async function Offer(client, { cycleId, hostId, programId }) {
  const url = "https://leoalumnos-svc.udg.mx/alum/api/ofertas/horas-nrc";
  const offer = await client.fetch.fetch(url, {
    method: "POST",
    body: JSON.stringify({
      idcentro: hostId,
      idprograma: programId,
      idciclo: cycleId
    })
  });
  return offer.map((course) => OfferTransformer.transform(course));
}

// source/transformers/plan.ts
function PlanTransformer(raw) {
  return {
    host: raw.desccentro,
    hostId: raw.idcentro,
    oldHostId: raw.siiacampus,
    hostAcronym: raw.siglacentro,
    venue: raw.descsede,
    venueId: raw.idsede,
    program: raw.descprograma,
    programId: raw.idprograma,
    admissionPeriod: raw.cicladmision,
    currentPeriod: raw.ciclefectivo,
    status: raw.descestatus,
    statusId: raw.idestatus,
    statusType: raw.tipoestatus,
    planId: raw.idPlan,
    level: raw.descnivel,
    certification: raw.certificacion,
    email: raw.emailudg
  };
}

// source/modules/planes.ts
async function StudentPlans(client) {
  const url = buildURL("https://leoalumnos-svc.udg.mx/alum/api/alumnos-esc/:code/planes-estudios", {
    code: client.session.studentId
  });
  const plans = await client.fetch.fetch(url);
  return plans.map((plan) => PlanTransformer(plan));
}

// source/transformers/report.ts
function ReportTransformer(raw) {
  const buildGrade = (grade, str, definitive) => ({
    grade: grade !== "AC" ? Number(grade) : grade,
    gradeString: str,
    definitive: definitive === "SI"
  });
  return {
    courseId: raw.idcurso,
    cycleId: raw.idciclo,
    sectionId: raw.crn,
    ordinary: buildGrade(raw.caliordinario, raw.caliordiletra, raw.caliordirolad),
    extraordinary: raw.caliextraordi !== null ? buildGrade(raw.caliextraordi, raw.caliextrletra, raw.caliextrrolad) : void 0
  };
}

// source/modules/report.ts
async function Report(client, { cycleId, programId }) {
  const studentId = client.session.studentId;
  const url = buildURL("https://leoalumnos-svc.udg.mx/alum/api/alumnos-esc/:studentId/:programId/:cycleId/boletas", { studentId, cycleId, programId });
  const report = await client.fetch.fetch(url);
  return report.map((course) => ReportTransformer(course));
}

// source/transformers/schedule.ts
var ScheduleTransformer = class {
  static transformHour(raw) {
    const [start, end] = raw.hora.split("-");
    const startHour = start.slice(0, 2), startMinutes = start.slice(-2);
    const endHour = end.slice(0, 2), endMinutes = end.slice(-2);
    return {
      building: raw.edificio,
      buildingId: raw.idedificio,
      day: raw.dia,
      classroom: raw.edificio,
      end: `${endHour}:${endMinutes}`,
      start: `${startHour}:${startMinutes}`
    };
  }
  static transformSchedule(raw) {
    const transformDateString = (str) => {
      const [day, month, year] = str.trim().split("-");
      return `${year}/${month}/${day}`;
    };
    return {
      end: new Date(transformDateString(raw.fechafin)),
      start: new Date(transformDateString(raw.fechainicio)),
      horas: raw.horas.map((hour) => this.transformHour(hour))
    };
  }
  static transformTeacher(raw) {
    return {
      id: raw.idprofesor,
      lastName: raw.apellidos,
      name: raw.nombres
    };
  }
  static transform(raw) {
    return {
      campusId: raw.idcampus,
      courseId: raw.idcurso,
      courseName: raw.nombrecurso,
      teachers: raw.profesores.map((profesor) => this.transformTeacher(profesor)),
      credits: Number(raw.creditos),
      registryType: raw.tiporegistro,
      sectionId: raw.crn,
      sectionName: raw.numeseccion,
      schedule: raw.horarios.map((horario) => this.transformSchedule(horario))
    };
  }
};

// source/modules/schedule.ts
async function Schedule(client, { programId, cycleId }) {
  const studentId = client.session.studentId;
  const url = buildURL("https://leoalumnos-svc.udg.mx/alum/api/alumnos-esc/:studentId/:programId/:cycleId/horarios", { programId, cycleId, studentId });
  const items = await client.fetch.fetch(url);
  return items.map((item) => ScheduleTransformer.transform(item));
}

// source/transformers/student.ts
var StudentTransformer = class {
  static transformAddres(raw, street) {
    return {
      country: raw.pais,
      state: raw.pais,
      city: raw.municipio,
      zipCode: raw.cp,
      street
    };
  }
  static transform(raw) {
    return {
      name: raw.nombre,
      studentId: raw.alumcodigo,
      birthdate: new Date(raw.fechnacimient),
      genre: raw.genero,
      blodId: raw.tiposangre,
      blodType: raw.desctiposangr,
      curp: raw.curp,
      rfc: raw.rfc,
      email: raw.email,
      imss: raw.imss,
      emergencyPhone: raw.teleemergenci,
      fullAddress: raw.lugadomicilioDB,
      address: this.transformAddres(raw.lugadomicilio, raw.domicilio),
      photo: raw.foto,
      sign: raw.firma
    };
  }
};

// source/modules/student.ts
async function Student(client) {
  const studentId = client.session.studentId;
  const url = buildURL("https://leoalumnos-svc.udg.mx/alum/api/alumnos-sii/:studentId/datos-personales", { studentId });
  const student = await client.fetch.fetch(url);
  return StudentTransformer.transform(student);
}

export { Adeudos, Constancy, DeleteCourse, EmailAccounts, IsAgendaOpened, Kardex, Offer, OfferCycles, OfferHosts, OfferPrograms, RegisterCourses, Report, Schedule, Student, StudentCard, StudentPlans };
