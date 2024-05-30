import type { Login } from "../../auth/Login.js";
import type { ProjectionSubjectType } from "./ProjectionsType.js";
import { AuthMethod } from "../../utils/Method.js";
export type ProjectionInit = {
    idprograma: string;
    /** @description Format YYYY-{A|B} */
    cicladmision: string;
};
/**
 * Get the student projection, this contains the pending subjects to take
 */
export declare class Projections extends AuthMethod<ProjectionSubjectType[]> {
    protected Route: string;
    private props?;
    constructor(Auth: Login, init?: ProjectionInit);
    exec(): Promise<ProjectionSubjectType[]>;
}
