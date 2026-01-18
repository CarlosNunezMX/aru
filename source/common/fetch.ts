import type { PrivateKey } from "jsonwebtoken";
import HttpError from "./httpError.js";
import { type Response } from "@interfaces/Common.js";
import { debugLogger } from "./log.js";
import SessionToken, { createISS } from "@auth/index.js";

export default class Fetch {
  constructor(
    private key: PrivateKey,
    private session?: SessionToken.Session,
  ) {}

  public setSession(session: SessionToken.Session) {
    this.session = session;
  }

  private buildBody(req: RequestInit): RequestInit {
    return {
      ...req,
      headers: {
        Referer: "https://leoalumnos.udg.mx/",
        Origin: "https://leoalumnos.udg.mx",
        authorization: `Bearer ${createISS(this.key)}`,
        "authorization-key": `Bearer ${
          !!this.session
            ? this.session.getSessionToken.bind(this.session)()
            : ""
        }`,
        "Content-Type": "application/json",
        ...req.headers,
      },
    } as RequestInit;
  }

  async fetch<T = unknown>(url: string, req: RequestInit = {}): Promise<T> {
    try {
      const reqBody = this.buildBody.bind(this)(req);
      const res = await fetch(url, reqBody);
      const type = res.headers.get("content-type") || "";
      const isJSON = type?.includes("application/json");

      let body: Response<T> | string;

      if (isJSON) body = (await res.json()) as Response<T>;
      else body = await res.text();

      if (!res.ok) {
        console.log(body);
        const errorMessage =
          typeof body === "string"
            ? body
            : body.respuesta || body.mensaje || "Error desconocido";

        throw new HttpError(res.status, errorMessage);
      }

      if (!isJSON) throw new Error("Expected JSON output");
      const { respuesta } = body as Response<T>;
      if (Array.isArray(respuesta) && respuesta[0].error)
        throw new HttpError(res.status, respuesta[0].error);

      return respuesta! as T;
    } catch (err: unknown) {
      if (err instanceof HttpError) throw err;

      debugLogger.error("CRITICAL", "Fetch->fetch", {
        url,
        method: req.method,
        err,
      });
      throw new HttpError(500, "Error desconocido");
    }
  }
}
