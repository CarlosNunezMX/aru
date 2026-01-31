import { PrivateKey } from 'jsonwebtoken';
import { SessionToken } from '../auth/tokens/createSessionToken.js';

declare class Fetch {
    private key;
    private session?;
    private debug;
    constructor(key: PrivateKey, session?: SessionToken.Session | undefined, debug?: boolean);
    setSession(session: SessionToken.Session): void;
    private buildBody;
    fetch<T = unknown>(url: string, req?: RequestInit): Promise<T>;
}

export { Fetch as default };
