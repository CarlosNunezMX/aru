import type { DirtyType } from "../utils/generics/ResponseOK.js";
export type Plans = {
    idcentro: string,
    siglacentro: string,
    siiacampus: string,
    desccentro: string,
    idsede: string,
    descsede: sting,
    idprograma: string,
    descprograma: string,
    nivel: string,
    cicladmision: string,
    ciclefectivo: string,
    idestatus: string,
    descestatus: string,
    tipoestatus: string,
    idPlan: string,
    descnivel: string,
    certificacion: string,
}[];

export type DirtyPlans = DirtyType<Plans>;