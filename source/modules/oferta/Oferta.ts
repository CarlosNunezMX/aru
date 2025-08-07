import type SessionToken from "@auth/index"
import type Fetch from "@common/fetch"
import { type AruCarreras } from "@interfaces/carreras/Carreras"


export async function OfertaAcademica(idCentro: string, carrera: AruCarreras.AnyCentro, ciclo: string) {
    return async (fetch: Fetch, session: SessionToken.Session) => {
        const url = "https://leoalumnos-svc.udg.mx/alum/api/ofertas/horas-nrc";
        return await fetch.fetch(url, {
            method: "POST",
            body: JSON.stringify({
                idcentro: idCentro,
                idprograma: carrera,
                idciclo: ciclo
            })
        })
    }
}