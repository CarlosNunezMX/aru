import type SessionToken from "@auth/index";
import type Fetch from "@common/fetch";
import buildURL from "@common/url";

export default async function Adeudos(fetch: Fetch, session: SessionToken.Session){
    const url = buildURL("https://leoalumnos-svc.udg.mx/alum/api/alumnos-sii/:codigo/adeudos", {
        codigo: session.userID
    });

    // TODO: Type this
    const res = await fetch.fetch<string | never[]>(url);
    if(typeof res === "string") return [];

    return res;
} 