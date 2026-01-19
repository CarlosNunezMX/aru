import type SessionToken from "@auth/index";
import { createSession } from "@auth/index";
import Fetch from "@common/fetch";
import NotSessionError from "@common/sessionError";
import type { PrivateKey } from "jsonwebtoken";

export class Client {
  private _session?: SessionToken.Session;
  private readonly _fetch: Fetch;
  constructor(key: PrivateKey, debug: boolean = false) {
    this._fetch = new Fetch(key, undefined, debug);
  }
  async login(usr: string, pwd: string, hashedPassword?: boolean) {
    this._session = await createSession(usr, pwd, this._fetch, hashedPassword);
    this._fetch.setSession(this._session);
    return this;
  }
  public set session(session: SessionToken.Session) {
    this._session = session;
    this.fetch.setSession.bind(this.fetch)(this._session);
  }
  public get session(): SessionToken.Session { return this._session!; }
  public get fetch() {
    if (this._session === undefined) throw new NotSessionError();
    return this._fetch;
  }
}
