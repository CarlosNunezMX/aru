import { Login } from "../auth/Login.js";
export declare class Method {
    protected AuthToken: string;
    protected Route: string;
    private isTokenUsed;
    private AuthTokenGenerator;
    constructor();
    protected recreateToken(): void;
    exec(): void;
}
export declare abstract class AuthMethod<Return = void> extends Method {
    protected Auth: Login;
    constructor(Auth: Login);
    exec(): Promise<Return>;
}
