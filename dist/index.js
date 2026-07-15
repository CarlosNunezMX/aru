import { auth_default, createISS_default, HttpError, createSession } from './chunk-DJY7TPBG.js';
export { HttpError, Session, buildURL, createISS_default as createISS, createSession } from './chunk-DJY7TPBG.js';

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
        "authorization-key": `Bearer ${!!this.session ? auth_default.getSessionToken(this.session.sessionID) : ""}`,
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

export { Fetch, index_default as default };
