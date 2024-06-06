import type { AuthMethod, Method } from "../utils/Method.js";
export declare class Cache {
    private _Cache;
    lastUpdate: Date;
    getCache<R>(c: typeof AuthMethod | typeof Method, studentCode: string): R;
    setCache<I>(student: string, c: typeof AuthMethod | typeof Method, value: I): void;
    clearCache(student: string): void;
}
