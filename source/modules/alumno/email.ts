import buildURL from "@common/url";
import type { CorreoElectronico, Email } from "@interfaces/modules/email";
import type { Client } from "source/client";
import { AccountSecurityKit } from "../../auth/SecurityKit";

export async function EmailAccounts(client: Client, idCentro: string) {
  // Cuenta de Microsoft 365
  const url365 = buildURL(
    "https://leoalumnos-svc.udg.mx/alum/api/servicios-sii/:codigo/cuentas-office",
    {
      codigo: client.session.userID,
    },
  );
  // Cuenta de Google
  const urlGogle = buildURL(
    "https://leoalumnos-svc.udg.mx/alum/api/servicios-esc/:codigo/:idCentro/cuentas-google",
    {
      codigo: client.session.userID,
      idCentro,
    },
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
