import type { DirtyType } from "../../utils/generics/ResponseOK.js";

export interface Programa {
    idcentro: string;
    programa: string;
    descprograma: string;
}

export type DirtyProgramaCentro = DirtyType<Programa[]>