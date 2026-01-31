import { NotSessionError } from './chunk-WQVO3AFI.js';
import { Fetch } from './chunk-44OVLOOV.js';
import { createSession } from './chunk-MEDQFLTT.js';

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

export { Client };
