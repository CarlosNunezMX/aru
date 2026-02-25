import { F as Fetch, S as Session, C as Client } from './client-cObyYvo_.js';
import { PrivateKey } from 'jsonwebtoken';

declare function createSession(usr: string, pwd: string, fetch: Fetch, hashedPassword?: boolean): Promise<Session>;

declare const _default: (key: PrivateKey) => string;

declare class HttpError extends Error {
    code: number;
    constructor(code: number, message: string | Object);
}

declare class NotSessionError extends Error {
    constructor();
}

type ExtractParamName<T extends string> = T extends `:${infer P}` ? P : never;
type ExtractParams<Path extends string> = Path extends `${infer Before}/:${infer Param}/${infer After}` ? ExtractParamName<`:${Param}`> | ExtractParams<`/${After}`> : Path extends `${infer Before}/:${infer Param}` ? ExtractParamName<`:${Param}`> : never;
type RouteParams<Path extends string> = {
    [K in ExtractParams<Path>]: string;
};
declare function buildURL<Path extends string>(url: Path, req: RouteParams<Path>): Path;

export { Fetch, HttpError, NotSessionError as NotSession, Session, buildURL, _default as createISS, createSession, Client as default };
