import type { DirtyType } from "../../utils/generics/ResponseOK.js";

export type AvAdvanceType = {
    promgeneral: string;
    avance: AvanceItem[];
}

export type AvanceItem = {
    ciclo: string;
    cicladmision: string;
    idPrograma: string;
    siglcentro: string;
    idsede: string;
    promciclo: string;
    credciclos: string;
    porcavance: string;
}

export type DirtyAvAdvance = DirtyType<AvAdvanceType>