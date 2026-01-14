import type SessionToken from "@auth/index";
import { createSession } from "@auth/index";
import Fetch from "@common/fetch";
import NotSessionError from "@common/sessionError";
import type { LaunchCB } from "@interfaces/Client";
import type { PrivateKey } from "jsonwebtoken";


export class Client {
    session?: SessionToken.Session;
    private fetch: Fetch;
    constructor(
        private key: PrivateKey
    ) {
        this.fetch = new Fetch(key);
    };

    async login(usr: string, pwd: string) {
        this.session = await createSession(usr, pwd, this.fetch)
        this.fetch.setSession(this.session);
        return this;
    }

    async launch<T>(fn: (fetch: Fetch, session: SessionToken.Session) => Promise<T>): Promise<T> {
        if (!this.session)
            throw new NotSessionError();

        return await fn(this.fetch, this.session);
    }
}


