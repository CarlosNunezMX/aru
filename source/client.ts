import { Session, createSession } from "@auth/index";
import { Fetch } from "@common/fetch";
import NotSessionError from "@common/sessionError";
import type { ClientCredentials } from "@auth/credentials";
import type { PrivateKey } from "jsonwebtoken";

export class Client {
  private _session?: Session;
  private readonly _fetch: Fetch;
  private credentials?: ClientCredentials;
  constructor(key: PrivateKey, debug: boolean = false) {
    this._fetch = new Fetch(key, undefined, debug);
  }

  setCredentials(credentials: ClientCredentials): Client {
    this.credentials = credentials;
    return this;
  }

  public hasCredentials(): boolean {
    return !!this.credentials;
  }

  public isClientReady(): boolean {
    return !!this.hasCredentials() && !!this._session;
  }

  async login(credentials?: ClientCredentials): Promise<Client> {
    if (!credentials && !this.credentials)
      throw "Expected credentials be filled before login.";
    const creds = (credentials ?? this.credentials) as ClientCredentials;
    this._session = await createSession(creds, this._fetch);
    this._fetch.setSession(this._session);
    if (credentials) this.credentials = credentials;
    return this;
  }
  public set session(session: Session) {
    this._session = session;
    this.fetch.setSession.bind(this.fetch)(this._session);
  }
  public get session(): Session {
    return this._session!;
  }
  public get fetch() {
    if (this._session === undefined) throw new NotSessionError();
    return this._fetch;
  }
}
