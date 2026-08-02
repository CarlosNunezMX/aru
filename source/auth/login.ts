import type { Fetch } from "@common/fetch";
import type { Verification } from "@interfaces/index";
import { hashPassword } from "./password";
import { Session } from "./session";
import { ClientCredentials } from "./credentials";

export default async function createSession(
  credentials: ClientCredentials,
  fetch: Fetch,
): Promise<Session> {
  const url = "https://leoalumnos-svc.udg.mx/alum/api/login/validar";
  const res = await fetch.fetch<Verification>(url, {
    method: "POST",
    body: JSON.stringify({
      usr: credentials.user,
      pwd: credentials.isPasswordHashed
        ? credentials.password
        : await hashPassword(credentials.password),
    }),
  });

  return new Session(res.id_token, res.usua_id, new Date(res.vigencia));
}
