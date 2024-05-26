import { Login } from "../auth/Login.js";
import { LeoAuth } from "./crypto/AuthToken.js";

export class Method{
    protected AuthToken: string;
    protected Route: string = "";
    private isTokenUsed = false;
    private AuthTokenGenerator = new LeoAuth();

    constructor(){
        this.AuthToken = this.AuthTokenGenerator.encrypt();
    }

    protected recreateToken(){
        if(!this.isTokenUsed){
            return;
        }
        this.AuthToken = this.AuthTokenGenerator.encrypt();
    }

    exec(){
        this.recreateToken.bind(this)();
    }
}

export abstract class AuthMethod<Return = void> extends Method {
    declare protected Auth: Login;
    constructor(Auth: Login){
        super();
        this.Auth = Auth;
    }

    // @ts-ignore
    async exec(): Promise<Return>{
        super.exec();
        if(!this.Auth.checkVigencia())
            await this.Auth.exec();
    }
}