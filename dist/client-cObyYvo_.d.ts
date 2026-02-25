import { PrivateKey } from 'jsonwebtoken';

declare class Fetch {
    private key;
    private session?;
    private debug;
    constructor(key: PrivateKey, session?: Session | undefined, debug?: boolean);
    setSession(session: Session): void;
    private buildBody;
    fetch<T = unknown>(url: string, req?: RequestInit): Promise<T>;
}

declare class Session {
    sessionID: string;
    userID: string;
    readonly expiration: Date;
    constructor(sessionID: string, userID: string, expiration: Date);
    isExpirated(): boolean;
}

declare class Client {
    private _session?;
    private readonly _fetch;
    constructor(key: PrivateKey, debug?: boolean);
    login(usr: string, pwd: string, hashedPassword?: boolean): Promise<this>;
    set session(session: Session);
    get session(): Session;
    get fetch(): Fetch;
}

export { Client as C, Fetch as F, Session as S };
