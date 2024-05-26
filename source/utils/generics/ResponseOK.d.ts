export type DirtyType<T> = {
    mensaje: string;
    codigo: number;
    respuesta: T;
}