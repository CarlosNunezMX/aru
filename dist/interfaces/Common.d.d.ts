interface Response<T>{
    codigo: number;
    mensaje: string;
    respuesta?: T | {error: string}[];
}

export type { Response };
