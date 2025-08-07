import type SessionToken from "@auth/index";
import type Fetch from "@common/fetch";
import type { AruOferta } from "@interfaces/modules/Oferta";

export async function Centros(fetch: Fetch, session: SessionToken.Session) {
    const url = "https://leoalumnos-svc.udg.mx/alum/api/programas/centros"
    const res = await fetch.fetch<AruOferta.Centros[]>(url);

    return res;

}

