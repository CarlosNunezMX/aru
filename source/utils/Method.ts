import { Login } from "../auth/Login.js";
import { LeoAuth } from "./crypto/AuthToken.js";

/**
 * Use this class to create a new method, it contains the AuthToken, remember to call the exec method before using the AuthToken by super.exec()
 */
export class Method{
    protected AuthToken: string;
    protected Route: string = "";
    public isTokenUsed = false;
    private AuthTokenGenerator = new LeoAuth();
    
    constructor(){
        this.AuthToken = this.AuthTokenGenerator.encrypt();
    }

    /** 
     * Used for create a new token after it was used
     */
    protected recreateToken(){
        if(this.isTokenUsed){
            this.AuthToken = this.AuthTokenGenerator.encrypt();
            return;
        }
        this.isTokenUsed = true;
    }

    exec(){
        this.recreateToken();
    }
}

/**
 * Use this class to create a new method that requires a login, it contains the AuthToken and Token, remember to call the exec method before using the AuthToken by super.exec()
 */
export abstract class AuthMethod<Return = void> extends Method {
    declare protected Auth: Login;
    constructor(Auth: Login){
        super();
        this.Auth = Auth;
    }

    // @ts-ignore
    async exec(): Promise<Return>{
        super.exec();
        if(!this.Auth.checkVigencia()){
            await this.Auth.exec.bind(this.Auth)();
        }
    }
}