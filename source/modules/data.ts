import type SessionToken from "@auth/index";
import type Fetch from "@common/fetch";
import buildURL from "@common/url";
import type PersonalData from "@interfaces/modules/PersonalData"

export default async function StudentData(fetch: Fetch, session: SessionToken.Session){
    const url = buildURL("https://leoalumnos-svc.udg.mx/alum/api/alumnos-sii/:codigo/datos-personales", {
        codigo: session.userID
    });

    const res = await fetch.fetch<PersonalData>(url);
    return res;
}
