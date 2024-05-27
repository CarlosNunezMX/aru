import type { LoginResponseType } from "./Login.response.js";

import { Method } from "../utils/Method.js";
import { HeaderPreset } from "../utils/CommonHeaders.js";
import { ErrorHandling } from "../error/Request.js";

import { encryptPassword } from "../utils/crypto/Password.js";

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
    constructor(credentials: credentials){
        super()
        this.User = credentials.User;
        this.Password = credentials.Password;
    }
    /**
     * Execute the login method, it's required for most of the methods.
     * This will load the token and the student code on the class
     */
    async exec(): Promise<void>{
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
        if(!data.ok)
            ErrorHandling(data);

        const credentials = (await data.json() as LoginResponseType);
        
        this.Token.token = credentials.respuesta.id_token;
        this.Token.vigencia = new Date(credentials.respuesta.vigencia);
        this.StudentCode = credentials.respuesta.usua_id;
    }

    /** Get the token and its vigency */
    getToken(): Required<TokenType>{
        return this.Token;
    }

    /** Check if you need to regenerate a token */
    checkVigencia(): boolean{
        
        if(this.Token.vigencia === null || this.Token.token === null){
            return true;
        }

        

        const current = new Date(Date.now());
        if( current > this.Token.vigencia!){
            return false;
        }
        return true;
    }
}
