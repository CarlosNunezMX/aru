import HttpError from "@common/httpError";
import type { AruCarreras } from "@interfaces/carreras/Carreras";
import type { Client } from "source/client";

interface ValidarRegistroProps {
  centro: string;
  carrera: AruCarreras.AnyCentro;
  ciclo: string;
}

export async function ValidarRegistro(
  client: Client,
  { carrera, centro, ciclo }: ValidarRegistroProps,
): Promise<boolean> {
  try {
    const url =
      "https://leoalumnos-svc.udg.mx/alum/api/registro/validaciones-alumnos";
    const body = {
      idalumno: client.session!.userID,
      idcentro: centro,
      idciclo: ciclo,
      idprograma: carrera,
    };

    await client.fetch.fetch<{ error?: string }[]>(url, {
      method: "POST",
      body: JSON.stringify(body),
    });

    return true;
  } catch (err) {
    if (!(err instanceof HttpError)) throw err;
    if (err.code !== 201) throw err;
    return false;
  }
}

