import type { LoginResponseType } from "./Login.response.js";

import { AuthMethod, Method } from "../utils/Method.js";
import { HeaderPreset } from "../utils/CommonHeaders.js";
import { ErrorHandling } from "../error/Request.js";

import { encryptPassword } from "../utils/crypto/Password.js";
import { Cache } from "./Cache.js";
import type { Plans } from "../info/PlansType.js";
import { StudentPlans } from "../info/Plans.js";

type TokenType = {
    token: string | null;
    vigencia: Date | null;
}

/**
 * User credentials for login into Leo
 */

export type credentials = {
    User: string;
    Password: string;
}

export type Options = {
    /** 
     * @description It creates cache for some usual methods, example Plans methods and it will save in a new class.
     * @todo Create cache
     * @todo Create cache container class
     *  */
    createCache: boolean;
};

/**
 * Used for login into the Leo, it's required for most of the methods.
 * Use the method exec() before use for another class constructor
 */

export class Login extends Method {
    private User: string;
    private Password: string;
    protected Token: TokenType = {
        token: null,
        vigencia: null
    };
    protected Route: string = "https://micro-leo.udg.mx/login/v1/validar";
    public StudentCode?: string;
    private options?: Partial<Options>;
    Cache?: Cache;
    public constructor(credentials: credentials, options?: Partial<Options>) {
        super()
        this.User = credentials.User;
        this.Password = credentials.Password;
        this.options = options;

        if (this.options?.createCache)
            this.Cache = new Cache();
    }
    /**
     * Execute the login method, it's required for most of the methods.
     * This will load the token and the student code on the class
     */


    getPlanfromCache(student: string): Plans | undefined {
        if (this.Cache) {
            const cache = this.Cache.getCache<Plans>(StudentPlans as typeof AuthMethod, student)
            return Array.isArray(cache) ? cache : [];
        }

        return [];
    }

    async exec(): Promise<void> {
        super.exec();

        // Preparar consulta
        const url = new URL(this.Route);
        const params = new URLSearchParams({
            usr: this.User,
            pwd: encryptPassword(this.Password)
        });
        url.search = params.toString();


        // Realizar consulta
        const data = await fetch(url.toString(), {
            headers: HeaderPreset(this.AuthToken),
            method: "POST"
        })
        if (!data.ok)
            ErrorHandling(data);

        const credentials = (await data.json() as LoginResponseType);

        this.Token.token = credentials.respuesta.id_token;
        this.Token.vigencia = new Date(credentials.respuesta.vigencia);
        this.StudentCode = credentials.respuesta.usua_id;
    }

    /** Get the token and its vigency */
    getToken(): Required<TokenType> {
        return this.Token;
    }

    /** Check if you need to regenerate a token */
    checkVigencia(): boolean {

        if (this.Token.vigencia === null || this.Token.token === null) {
            return true;
        }



        const current = new Date(Date.now());
        if (current > this.Token.vigencia!) {
            return false;
        }
        return true;
    }

    setToken(token: Required<TokenType>): void {
        this.Token = token;
        if (this.checkVigencia()) {
            throw "Token isn't vigent!"
        }
    }
}
