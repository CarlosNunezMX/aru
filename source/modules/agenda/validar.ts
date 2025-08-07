import type SessionToken from "@auth/index";
import type Fetch from "@common/fetch";
import HttpError from "@common/httpError";
import type { AruCarreras } from "@interfaces/carreras/Carreras";

const ValidarRegistro = (centro: string, carrera: AruCarreras.AnyCentro, ciclo: string) =>
    async (fetch: Fetch, session: SessionToken.Session) => {
        try {

            const url = "https://leoalumnos-svc.udg.mx/alum/api/registro/validaciones-alumnos";
            const body = {
                idalumno: session.userID,
                idcentro: centro,
                idciclo: ciclo,
                idprograma: carrera
            };

            await fetch.fetch<{ error?: string }[]>(url, {
                method: "POST",
                body: JSON.stringify(body)
            })

            return true;
        } catch (err) {
            if(!(err instanceof HttpError))
                throw err;
            if(err.code !== 201) throw err;
            return false;

        }
    };

export default ValidarRegistro;