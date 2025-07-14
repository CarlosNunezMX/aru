export interface Response<T>{
    codigo: number;
    mensaje: string;
    respuesta?: T;
};