import type SessionToken from "@auth/index"
import type Fetch from "@common/fetch"
import type { AruCentros } from "@interfaces/Centros";
import type { LaunchCB } from "@interfaces/Client";
import { type AruCarreras } from "@interfaces/carreras/Carreras"
import type { AruOferta } from "@interfaces/modules/Oferta";


function OfertaAcademica(idCentro: string, carrera: AruCarreras.AnyCentro, ciclo: string) {
    const _: LaunchCB<AruOferta.Oferta<AruCentros.Centros, AruCarreras.AnyCentro>> = async (fetch: Fetch, session: SessionToken.Session) => {
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
    return _;
}

export default OfertaAcademica;
