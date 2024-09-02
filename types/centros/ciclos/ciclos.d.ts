import { AuthMethod } from "../../utils/Method.js";
import type { Ciclo } from "./ciclo.js";
export declare class Ciclos extends AuthMethod<Ciclo[], string> {
    protected Route: string;
    exec(): Promise<Ciclo[]>;
}
