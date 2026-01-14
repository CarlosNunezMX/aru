import type SessionToken from "@auth/index";
import type Fetch from "@common/fetch";
import buildURL from "@common/url";
import { type PersonalData } from "@interfaces/modules/PersonalData";

async function StudentData(
  fetch: Fetch,
  session: SessionToken.Session
): Promise<PersonalData> {
  const url = buildURL(
    "https://leoalumnos-svc.udg.mx/alum/api/alumnos-sii/:codigo/datos-personales",
    {
      codigo: session.userID,
    }
  );

  return await fetch.fetch<PersonalData>(url);
}
export default StudentData;
