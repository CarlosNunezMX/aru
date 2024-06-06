import { StudentPlans } from "../info/Plans.js";
import type { Plans } from "../info/PlansType.js";
import type { AuthMethod, Method } from "../utils/Method.js";

type ClassCache<Val> = Map<typeof AuthMethod | typeof Method, Val>;
export class Cache{
    private _Cache: Map<string, ClassCache<any>> = new Map();
    lastUpdate: Date = new Date();

    getCache<R>(c: typeof AuthMethod | typeof Method, studentCode: string){
        return this._Cache.get(studentCode)?.get(c) as R;
    }

    setCache<I>(student: string, c: typeof AuthMethod | typeof Method, value: I){
        const prev = this._Cache.get(student);
        if(!prev){
            const _Cache = new Map<typeof AuthMethod | typeof Method, I>();
            _Cache.set(c, value);
            this._Cache.set(student, _Cache);
            return;
        }
        prev.set(c, value);
    }

    clearCache(student: string){
        this._Cache.delete(student);
    }

    getPlanfromCache(student: string): Plans | undefined{
        return this.getCache(StudentPlans as typeof AuthMethod, student);
    }
}