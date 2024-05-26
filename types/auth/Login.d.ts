import { Method } from "../utils/Method.js";
type TokenType = {
    token: string | null;
    vigencia: Date | null;
};
export type credentials = {
    User: string;
    Password: string;
};
export declare class Login extends Method {
    private User;
    private Password;
    protected Token: TokenType;
    protected Route: string;
    StudentCode?: string;
    constructor(credentials: credentials);
    exec(): Promise<void>;
    getToken(): Required<TokenType>;
    checkVigencia(): boolean;
}
export {};
