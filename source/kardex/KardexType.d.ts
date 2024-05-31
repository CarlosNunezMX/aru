export type KardexType = {
    datosPersonales: {
        nombre: string;
    };
    planesEstudios: planesEstudio;
    creditos: {
        credadquirido: string;
        credporcentaj: string;
        credfaltantes: string;
        credtotaprogr: string;
    };
    promedios: {
        promgeneral: string;
    };

    historiaAcademicaKardex: historiaAcademicaKardexItem[];
    curriculares: unknown[] | null;
    resumenCreditos: resumenCreditosItem[];
    certificado: "PARCIAL" | "COMPLETO";
    informacion: string;
}

export type planesEstudios = {
    idcentro: string;
    siglacentro: string;
    siiacampus: string;
    desccentro: string;
    idsede: string;
    descsede: string;
    idprograma: string;
    descprograma: string;
    nivel: string;
    cicladmision: string;
    ciclefectivo: string;
    idestatus: string;
    descestatus: string;
    tipoestatus: string;
    idPlan: string;
    descnivel: string;
    certificacion: string;
}

export type historiaAcademicaKardexItem = {
    crn: string;
    idsede: string;
    clavmateria: string;
    titucurso: string;
    calinumeletra: string;
    tipocaptura: string;
    creditos: string;
    horacurso: string;
    fechcaptura: string;
    clasificacion: string;
    idtae: null | string;
    tae: null | string;
}

export type resumenCreditosItem = {
    areaformacion: string;
    credrequaerea: string;
    credadquaerea: string;
    credfaltaerea: string;
    credTaes: null | CredTaesItem[];
}

export type CredTaesItem = {
    desctae: string;
    credrequtae: string;
    credadqutae: string;
    credfalttae: string;
};