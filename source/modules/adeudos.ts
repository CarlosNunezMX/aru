import type SessionToken from "@auth/index";
import type Fetch from "@common/fetch";
import buildURL from "@common/url";
import type { LaunchCB } from "@interfaces/Client";

const Adeudos: LaunchCB<never[]> = async (fetch: Fetch, session: SessionToken.Session) => {
  const url = buildURL("https://leoalumnos-svc.udg.mx/alum/api/alumnos-sii/:codigo/adeudos", {
    codigo: session.userID
  });

  // TODO: Type this
  const res = await fetch.fetch<string | never[]>(url);
  if (typeof res === "string") return [];

  return res;
}

export default Adeudos
