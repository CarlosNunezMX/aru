import { PrivateKey } from 'jsonwebtoken';

declare class Fetch {
    private key;
    private session?;
    private debug;
    constructor(key: PrivateKey, session?: SessionToken.Session | undefined, debug?: boolean);
    setSession(session: SessionToken.Session): void;
    private buildBody;
    fetch<T = unknown>(url: string, req?: RequestInit): Promise<T>;
}

/****
 * @author CarlosNuñezMX
 * @url ../../../docs/sessionTokens.md
 * @license GPLv3 and Universidad de Guadalajara
*/
declare namespace SessionToken {
    function clean(token: string): string;
    function encode(sessionID: string, key?: string): string;
    function decode(transformedSessionID: string, key?: string): string;
    class Session {
        sessionID: string;
        userID: string;
        constructor(sessionID: string, userID: string);
        getSessionToken(): string;
    }
}

declare class Client {
    private _session?;
    private readonly _fetch;
    constructor(key: PrivateKey, debug?: boolean);
    login(usr: string, pwd: string, hashedPassword?: boolean): Promise<this>;
    set session(session: SessionToken.Session);
    get session(): SessionToken.Session;
    get fetch(): Fetch;
}

export { Client as C, Fetch as F, SessionToken as S };
