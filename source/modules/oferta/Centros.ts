import type SessionToken from "@auth/index";
import type Fetch from "@common/fetch";
import type { LaunchCB } from "@interfaces/Client";
import type { AruOferta } from "@interfaces/modules/Oferta";

const Centros: LaunchCB<AruOferta.Centros[]> = async (fetch: Fetch, session: SessionToken.Session) => {
    const url = "https://leoalumnos-svc.udg.mx/alum/api/programas/centros"
    return await fetch.fetch<AruOferta.Centros[]>(url);
}
export default Centros;
