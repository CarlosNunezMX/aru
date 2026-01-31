import type Fetch from "@common/fetch";
import { SessionToken } from "./tokens/createSessionToken";
import type Verification from "@interfaces/Verification";
import { hashPassword } from "./password";

export default async function createSession(usr: string, pwd: string, fetch: Fetch, hashedPassword?: boolean): Promise<SessionToken.Session> {
  const url = "https://leoalumnos-svc.udg.mx/alum/api/login/validar";
  const res = await fetch.fetch<Verification>(url, {
    method: "POST",
    body: JSON.stringify({
      usr: usr,
      pwd: hashedPassword ? pwd : hashPassword(pwd)
    })
  });

  return new SessionToken.Session(
    res.id_token,
    res.usua_id
  )

}
