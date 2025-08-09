import type SessionToken from "@auth/index";
import type Fetch from "@common/fetch";
import buildURL from "@common/url";
import type { LaunchCB } from "@interfaces/Client";
import type Plan from "@interfaces/planes";

const PlanesEstudios: LaunchCB<Plan[]> = async (fetch: Fetch, session: SessionToken.Session) => {
  const url = buildURL("https://leoalumnos-svc.udg.mx/alum/api/alumnos-esc/:code/planes-estudios", {
    code: session.userID
  });

  return await fetch.fetch<Plan[]>(url);

}

export default PlanesEstudios;
