interface Verification {
    id_token: string;
    vigencia: string;
    usua_id: string;
    usua_mov: string;
    fecha_mov: string;
    ip_mov: string;
    vigencia_extra: string;
}

type VerificationResponse = Response<Verification>;

export type { VerificationResponse, Verification as default };
