import type { Carreras } from "@interfaces/carreras";
import type { Client } from "source/client";

interface EliminarMateriaProps {
  cursos: string[];
  carrera: Carreras.AnyCentro;
  centro: string;
  ciclo: string;
  nivel: string;
}

export async function EliminarMateria(
  client: Client,
  { carrera, centro, ciclo, cursos, nivel = "LI" }: EliminarMateriaProps,
): Promise<void> {
  const url = "https://leoalumnos-svc.udg.mx/alum/api/registro/cursos";
  const body = {
    idalumno: client.session!.userID,
    idprograma: carrera,
    nivel,
    idciclo: ciclo,
    idcentro: centro,
    cursos,
  };

  await client.fetch.fetch(url, {
    method: "DELETE",
    body: JSON.stringify(body),
  });
}
