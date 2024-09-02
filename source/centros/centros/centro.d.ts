import type { DirtyType } from "../../utils/generics/ResponseOK.js";

export interface CentroEducativo {
    idcentro: string;
    siglas: string;
    descripcion: string;
}

export type DirtyCentroEducativo = DirtyType<CentroEducativo[]>