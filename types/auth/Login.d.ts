import { Method } from "../utils/Method.js";
type TokenType = {
    token: string | null;
    vigencia: Date | null;
};
/**
 * User credentials for login into Leo
 */
export type credentials = {
    User: string;
    Password: string;
};
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
export declare class Login extends Method {
    private User;
    private Password;
    protected Token: TokenType;
    protected Route: string;
    StudentCode?: string;
    private options?;
    constructor(credentials: credentials, options?: Partial<Options>);
    /**
     * Execute the login method, it's required for most of the methods.
     * This will load the token and the student code on the class
     */
    exec(): Promise<void>;
    /** Get the token and its vigency */
    getToken(): Required<TokenType>;
    /** Check if you need to regenerate a token */
    checkVigencia(): boolean;
}
export {};
