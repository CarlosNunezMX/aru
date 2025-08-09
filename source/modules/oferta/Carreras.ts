import type SessionToken from "@auth/index";
import type Fetch from "@common/fetch";
import buildURL from "@common/url";
import type { LaunchCB } from "@interfaces/Client";
import type { AruOferta } from "@interfaces/modules/Oferta";

function retriveCarreras(centro: string) {
    const _: LaunchCB<AruOferta.Carreras[]> = async (fetch: Fetch, session: SessionToken.Session) => {
        const url = buildURL("https://leoalumnos-svc.udg.mx/alum/api/programas/:centro/programas-centros", {
            centro
        })

        return await fetch.fetch<AruOferta.Carreras[]>(url);
    }
    return _;
}

export default retriveCarreras;
