import type { DirtyType } from "../../utils/generics/ResponseOK.js";

export type ProjectionSubjectType = {
    idMateria: string;
    idsubj: string;
    materia: string;
    creditos: string;
}

export type DirtyProjection = DirtyType<ProjectionSubjectType[]>