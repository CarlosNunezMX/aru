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

declare class ClientCredentials {
    readonly user: string;
    readonly password: string;
    readonly isPasswordHashed: boolean;
    constructor(user: string, password: string, isPasswordHashed?: boolean);
}

declare class Client {
    private _session?;
    private readonly _fetch;
    private credentials?;
    constructor(key: PrivateKey, debug?: boolean);
    setCredentials(credentials: ClientCredentials): Client;
    hasCredentials(): boolean;
    isClientReady(): boolean;
    login(credentials?: ClientCredentials): Promise<Client>;
    set session(session: Session);
    get session(): Session;
    get fetch(): Fetch;
}

export { ClientCredentials as C, Fetch as F, Session as S, Client as a };
