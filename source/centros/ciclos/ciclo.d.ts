import type { DirtyType } from "../../utils/generics/ResponseOK.js";

export interface Ciclo {
    /**
     * @description Match with "**20xx**-{A|B}"
     */
    ciclo: string;

    descripcion: string;
}

export type DirtyCiclo = DirtyType<Ciclo[]>