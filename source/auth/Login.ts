import type { LoginResponseType } from "./Login.response.js";
import type { UnauthorizedType } from "../error/unauthorized_type.js";

import { Method } from "../utils/Method.js";
import { HeaderPreset } from "../utils/CommonHeaders.js";
import { RequestError } from "../error/Request.js";

import { encryptPassword } from "../utils/crypto/Password.js";
import type { MethodNotAllowedType } from "../error/method_now_allowed.js";

type TokenType = {
    token: string | null;
    vigencia: Date | null;
}

export type credentials = {
    User: string;
    Password: string;
}

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
        if(data.status !== 201 && data.status !== 200){
            if(data.status == 401)
                throw new RequestError<UnauthorizedType>(data);
            if(data.status == 405)
                throw new RequestError<MethodNotAllowedType>(data);
            throw new RequestError<Record<string, any>>(data);
        }

        const credentials = (await data.json() as LoginResponseType);
        
        this.Token.token = credentials.respuesta.id_token;
        this.Token.vigencia = new Date(credentials.respuesta.vigencia);
        this.StudentCode = credentials.respuesta.usua_id;
    }

    getToken(): Required<TokenType>{
        return this.Token;
    }

    checkVigencia(){
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
