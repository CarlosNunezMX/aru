import { buildURL } from "@common/url";
import type { Card } from "@interfaces/index";

export default class SoyAlumnoNoDisponible extends Error {
  constructor() {
    super("Soy Alumno no disponible");
    this.name = "SoyAlumnoNoDisponible";
  }
}

function Encode(code: string): string {
  const format = `${code}-${Math.floor(Date.now() / 1e3)}`;
  return btoa(btoa(format));
}

export async function Credential(id: string) {
  const url = buildURL(
    "https://soyudg.udg.mx/alumnos/show?encryptedId=:studentCode",
    {
      studentCode: Encode(id),
    },
  );

  const data = await fetch(url, {
    tls: {
      rejectUnauthorized: false,
    },
  });
  const json = (await data.json()) as { code: number; data: Card };
  if (!json.data) new SoyAlumnoNoDisponible();
  return json.data;
}
