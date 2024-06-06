import { Login } from "../auth/Login.js";
/**
 * Use this class to create a new method, it contains the AuthToken, remember to call the exec method before using the AuthToken by super.exec()
 */
export declare class Method {
    protected AuthToken: string;
    protected Route: string;
    isTokenUsed: boolean;
    private AuthTokenGenerator;
    constructor();
    /**
     * Used for create a new token after it was used
     */
    protected recreateToken(): void;
    exec(): void;
}
/**
 * Use this class to create a new method that requires a login, it contains the AuthToken and Token, remember to call the exec method before using the AuthToken by super.exec()
 */
export declare abstract class AuthMethod<Return = void, initType = undefined> extends Method {
    protected Auth: Login;
    ShouldUpCache: boolean;
    protected Props?: initType;
    constructor(Auth: Login, init?: initType);
    exec(): Promise<Return>;
    UpdateCache<T>(data: T, c: typeof AuthMethod): void;
    getCache<R>(c: typeof AuthMethod): R | undefined;
}
