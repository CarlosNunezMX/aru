import Fetch from './common/fetch.js';
import { SessionToken } from './auth/tokens/createSessionToken.js';
import { PrivateKey } from 'jsonwebtoken';

declare class Client {
    private _session?;
    private readonly _fetch;
    constructor(key: PrivateKey, debug?: boolean);
    login(usr: string, pwd: string, hashedPassword?: boolean): Promise<this>;
    set session(session: SessionToken.Session);
    get session(): SessionToken.Session;
    get fetch(): Fetch;
}

export { Client };
