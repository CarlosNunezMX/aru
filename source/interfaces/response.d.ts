export interface Response<T> {
  codigo: number;
  mensaje: string;
  respuesta?: T | { error: string }[];
}

export interface Verification {
  id_token: string;
  vigencia: string;
  usua_id: string;
  usua_mov: string;
  fecha_mov: string;
  ip_mov: string;
  vigencia_extra: string;
}

export type VerificationResponse = Response<Verification>;
