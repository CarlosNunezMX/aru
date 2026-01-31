import { HttpError } from './chunk-7BWY7PGV.js';
export { HttpError, buildURL } from './chunk-7BWY7PGV.js';
import { sign } from 'jsonwebtoken';

// source/auth/tokens/createSessionToken.ts
var SessionToken;
((SessionToken3) => {
  const MAGIC_KEY = "b8d0343efc18fb979821e53db80b8496";
  const SEPARATOR = "~";
  const TOKEN_KEY = "yvICnGtE@IENOuAv$tIFLyABLAALnMBI~$4";
  function retrivetoMove(transformed) {
    const cositaPosition = transformed.indexOf(SEPARATOR);
    return transformed.slice(cositaPosition + 1, cositaPosition + 2).charCodeAt(0);
  }
  function clean(token) {
    const separatorIndex = token.indexOf(SEPARATOR);
    const separated = token.slice(0, separatorIndex);
    const toMove = token.charAt(separatorIndex + 1);
    const numb = token.charAt(separatorIndex + 2);
    const reduce = separated.slice(numb);
    const reduced = token.slice(0, numb);
    return reduce + reduced + SEPARATOR + toMove;
  }
  SessionToken3.clean = clean;
  function encode(sessionID, key = MAGIC_KEY) {
    const sessionIDLenght = sessionID.length;
    const toMove = Math.floor(15 * Math.random() + 33);
    const magic = 122 - toMove + 1;
    let text = "";
    for (let i = 0; i < sessionIDLenght; i++) {
      let acc = sessionID.charCodeAt(i) - toMove + key.charCodeAt(i) - toMove;
      text += String.fromCharCode(acc % magic + toMove);
    }
    text += SEPARATOR + String.fromCharCode(toMove) + text;
    return clean(text);
  }
  SessionToken3.encode = encode;
  function decode(transformedSessionID, key = MAGIC_KEY) {
    const toMoved = retrivetoMove(transformedSessionID);
    const length = transformedSessionID.slice(0, transformedSessionID.indexOf(SEPARATOR)).length;
    const transformToMoved = 122 - toMoved + 1;
    let token = "";
    for (let i = 0; i < length; i++) {
      let acc = transformedSessionID.charCodeAt(i) - key.charCodeAt(i);
      if (acc < 0) acc = transformToMoved + acc;
      token += String.fromCharCode(acc + toMoved);
    }
    return token;
  }
  SessionToken3.decode = decode;
  class Session {
    constructor(sessionID, userID) {
      this.sessionID = sessionID;
      this.userID = userID;
    }
    getSessionToken() {
      const key = decode(clean(TOKEN_KEY));
      const encodedStudentID = encode(this.sessionID, key);
      return encodedStudentID;
    }
  }
  SessionToken3.Session = Session;
})(SessionToken || (SessionToken = {}));

// source/auth/password.ts
async function hashPassword(password) {
  if (typeof Bun !== "undefined") {
    return await Bun.password.hash(password, "bcrypt");
  }
  const bcrypt = await import('bcrypt');
  return bcrypt.hash(password, 10);
}

// source/auth/login.ts
async function createSession(usr, pwd, fetch2, hashedPassword) {
  const url = "https://leoalumnos-svc.udg.mx/alum/api/login/validar";
  const res = await fetch2.fetch(url, {
    method: "POST",
    body: JSON.stringify({
      usr,
      pwd: hashedPassword ? pwd : hashPassword(pwd)
    })
  });
  return new SessionToken.Session(
    res.id_token,
    res.usua_id
  );
}
var createISS_default = (key) => sign({}, key, {
  algorithm: "RS256",
  expiresIn: 60,
  issuer: "I0wzMC00THVNbjBzKg=="
});

// source/common/log.ts
var DebugLogger;
((_DebugLogger) => {
  class DebugLogger2 {
    getInfo() {
      const date = new Date(Date.now()).toUTCString();
      return {
        date
      };
    }
    get isDev() {
      return process.env["NODE_ENV"] !== "production";
    }
    error(type, ...log) {
      if (!this.isDev)
        return;
      const info = this.getInfo();
      console.error(`[${type}] at ${info.date} - `, ...log);
    }
  }
  _DebugLogger.DebugLogger = DebugLogger2;
})(DebugLogger || (DebugLogger = {}));
var debugLogger = new DebugLogger.DebugLogger();

// source/common/fetch.ts
var Fetch = class {
  constructor(key, session, debug = true) {
    this.key = key;
    this.session = session;
    this.debug = debug;
  }
  setSession(session) {
    this.session = session;
  }
  buildBody(req) {
    return {
      ...req,
      headers: {
        Referer: "https://leoalumnos.udg.mx/",
        Origin: "https://leoalumnos.udg.mx",
        authorization: `Bearer ${createISS_default(this.key)}`,
        "authorization-key": `Bearer ${!!this.session ? this.session.getSessionToken.bind(this.session)() : ""}`,
        "Content-Type": "application/json",
        ...req.headers
      },
      verbose: this.debug
    };
  }
  async fetch(url, req = {}) {
    try {
      const reqBody = this.buildBody.bind(this)(req);
      const res = await fetch(url, reqBody);
      const type = res.headers.get("content-type") || "";
      const isJSON = type?.includes("application/json");
      let body;
      if (isJSON) body = await res.json();
      else body = await res.text();
      if (!res.ok) {
        console.log(body);
        const errorMessage = typeof body === "string" ? body : body.respuesta || body.mensaje || "Error desconocido";
        throw new HttpError(res.status, errorMessage);
      }
      if (!isJSON) throw new Error("Expected JSON output");
      const { respuesta } = body;
      if (Array.isArray(respuesta) && respuesta[0].error)
        throw new HttpError(res.status, respuesta[0].error);
      return respuesta;
    } catch (err) {
      if (err instanceof HttpError) throw err;
      debugLogger.error("CRITICAL", "Fetch->fetch", {
        url,
        method: req.method,
        err
      });
      throw new HttpError(500, "Error desconocido");
    }
  }
};

// source/common/sessionError.ts
var NotSessionError = class extends Error {
  constructor() {
    super("No hay una sesi\xF3n iniciada");
  }
};

// source/client.ts
var Client = class {
  _session;
  _fetch;
  constructor(key, debug = false) {
    this._fetch = new Fetch(key, void 0, debug);
  }
  async login(usr, pwd, hashedPassword) {
    this._session = await createSession(usr, pwd, this._fetch, hashedPassword);
    this._fetch.setSession(this._session);
    return this;
  }
  set session(session) {
    this._session = session;
    this.fetch.setSession.bind(this.fetch)(this._session);
  }
  get session() {
    return this._session;
  }
  get fetch() {
    if (this._session === void 0) throw new NotSessionError();
    return this._fetch;
  }
};

// source/index.ts
var index_default = Client;
/****
 * @author CarlosNuñezMX
 * @url ../../../docs/sessionTokens.md
 * @license GPLv3 and Universidad de Guadalajara
*/

export { Fetch, createISS_default as createISS, createSession, index_default as default };
