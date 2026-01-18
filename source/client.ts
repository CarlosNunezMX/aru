import type SessionToken from "@auth/index";
import { createSession } from "@auth/index";
import Fetch from "@common/fetch";
import NotSessionError from "@common/sessionError";
import type { PrivateKey } from "jsonwebtoken";

export class Client {
  public session?: SessionToken.Session;
  private readonly _fetch: Fetch;
  constructor(private key: PrivateKey) {
    this._fetch = new Fetch(key);
  }

  async login(usr: string, pwd: string) {
    this.session = await createSession(usr, pwd, this._fetch);
    this._fetch.setSession(this.session);
    return this;
  }

  public get fetch() {
    if (this.session === undefined) throw new NotSessionError();
    return this._fetch;
  }
}
