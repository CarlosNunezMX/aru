import { buildURL } from "@common/url";
import type {
  RawStudentCard,
  StudentCard as TStudentCard,
} from "@interfaces/index";
import StudentCardTransformer from "@transformers/studentCard";

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

export async function StudentCard(id: string): Promise<TStudentCard> {
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
  const json = (await data.json()) as { code: number; data: RawStudentCard };
  if (!json.data || json.data.error) new SoyAlumnoNoDisponible();

  return StudentCardTransformer(json.data);
}
