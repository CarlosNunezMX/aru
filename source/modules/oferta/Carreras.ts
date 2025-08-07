import type SessionToken from "@auth/index";
import type Fetch from "@common/fetch";
import buildURL from "@common/url";
import type { AruOferta } from "@interfaces/modules/Oferta";

export default function retriveCarreras(centro: string) {
    return async (fetch: Fetch, session: SessionToken.Session) => {
        const url = buildURL("https://leoalumnos-svc.udg.mx/alum/api/programas/:centro/programas-centros", {
            centro
        })

        return await fetch.fetch<AruOferta.Carreras[]>(url);
    }
}
