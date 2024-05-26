export type LoginResponseType = {
    codigo: 201;
    mensaje: string;
    respuesta: {
        /**
         * Este es el token que se debe usar para las peticiones
        */
        id_token: string;

        vigencia: string;
        vigencia_extra: string;
        fecha_mov: string;

        /**
         * Este es el codigo de Leo (aka SIIAU 2)
         */
        usua_id: string;
        /**
        * Este es el codigo de Leo (aka SIIAU 2)
        */
        usuario_mov: string;
        /**
        * IG: Es la ip del servidor de Leo
        */
        ip_mov: string;
    }
}