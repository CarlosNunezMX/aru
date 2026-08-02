import type { Client } from "@client";
import { buildURL } from "@common/url";
import { AccountSecurityKit } from "@auth/SecurityKit";

import type { CorreoElectronico, Email } from "@interfaces/modules/email";

export async function EmailAccounts(client: Client, hostId: string) {
  const studentId = client.session!.sessionID;
  // Cuenta de Microsoft 365
  const url365 = buildURL(
    "https://leoalumnos-svc.udg.mx/alum/api/servicios-sii/:studentId/cuentas-office",
    { studentId },
  );
  // Cuenta de Google
  const urlGogle = buildURL(
    "https://leoalumnos-svc.udg.mx/alum/api/servicios-esc/:studentId/:hostId/cuentas-google",
    { studentId, hostId },
  );

  const [MicrosoftRaw, GoogleRaw] = await Promise.all([
    client.fetch.fetch<CorreoElectronico>(url365),
    client.fetch.fetch<CorreoElectronico>(urlGogle),
  ]);
  const [MicrosoftPWD, GooglePWD] = await Promise.all([
    AccountSecurityKit.decrypt(MicrosoftRaw.correos[0].contrasenia),
    AccountSecurityKit.decrypt(GoogleRaw.correos[0].contrasenia),
  ]);

  const microsoft: Email = {
    mail: MicrosoftRaw.correos[0].correlectro,
    password: MicrosoftPWD,
    status: MicrosoftRaw.correos[0].estacuenta.toLowerCase() === "activa",
  };
  const google: Email = {
    mail: GoogleRaw.correos[0].correlectro,
    password: GooglePWD,
    status: GoogleRaw.correos[0].estacuenta.toLowerCase() === "activa",
  };
  return { microsoft, google };
}
