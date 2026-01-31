import { createISS_default } from './chunk-IC7FKQRD.js';
import { HttpError } from './chunk-NUKHZIIW.js';
import { debugLogger } from './chunk-QVB5BX5G.js';

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

export { Fetch };
