import type Fetch from "@common/fetch";
import type Verification from "@interfaces/Verification";
import { hashPassword } from "./password";
import { Session } from "./session";

export default async function createSession(
  usr: string,
  pwd: string,
  fetch: Fetch,
  hashedPassword?: boolean,
): Promise<Session> {
  const url = "https://leoalumnos-svc.udg.mx/alum/api/login/validar";
  const res = await fetch.fetch<Verification>(url, {
    method: "POST",
    body: JSON.stringify({
      usr: usr,
      pwd: hashedPassword ? pwd : await hashPassword(pwd),
    }),
  });

  return new Session(res.id_token, res.usua_id, new Date(res.vigencia));
}
