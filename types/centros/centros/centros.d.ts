import { AuthMethod } from "../../utils/Method.js";
import type { CentroEducativo } from "./centro.js";
export declare class Centros extends AuthMethod<CentroEducativo[]> {
    protected Route: string;
    exec(): Promise<CentroEducativo[]>;
}
