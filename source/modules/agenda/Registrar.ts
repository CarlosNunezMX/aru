import type { AruCarreras } from "@interfaces/carreras/Carreras";
import type { RegistroInit } from "@interfaces/modules/agenda/registro";
import type { Client } from "source/client";

interface RegistroMateriasProps {
  materias: string[];
  carrera: AruCarreras.AnyCentro;
  centro: string;
  ciclo: string;
  nivel: string | "LI";
}

export default async function RegistrarMaterias(
  client: Client,
  { carrera, centro, ciclo, materias, nivel = "LI" }: RegistroMateriasProps,
): Promise<void> {
  const url = "https://leoalumnos-svc.udg.mx/alum/api/registro/";
  const body = {
    cursos: materias,
    idalumno: client.session!.userID,
    idcentro: centro,
    idciclo: ciclo,
    idprograma: carrera,
    nivel,
  } satisfies RegistroInit;

  await client.fetch.fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
  });
}
