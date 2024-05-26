export type Card = {
    sede: string;
    firmaRector: string;
    imss: string;
    nombre: string;
    error?: string;
    nombreRector: string;
    apellido_paterno: string;
    apellido_materno: string;
    centro: string;
    curp: string;
    foto: string;
    centroDesc: string;
    firma: string;

    tarjeta_informador: Array<unknown>
}

export type DirtyCard = {
    data: Card;
    code: number;
}

export type SoyUdgError = {
    data: {
        error: string;
        tarjeta_informador: Array<unknown>;
    }
    code: number;
}