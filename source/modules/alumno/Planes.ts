import type SessionToken from "@auth/index";
import type Fetch from "@common/fetch";
import buildURL from "@common/url";
import type Plan from "@interfaces/Planes";

const PlanesEstudios  = async (fetch: Fetch, session: SessionToken.Session): Promise<Plan[]> => {
  const url = buildURL("https://leoalumnos-svc.udg.mx/alum/api/alumnos-esc/:code/planes-estudios", {
    code: session.userID
  });

  return await fetch.fetch<Plan[]>(url);

}

export default PlanesEstudios;
