import type { AruCarreras } from "@interfaces/carreras/Carreras";
import type { Client } from "source/client";

interface EliminarMateriaProps {
  cursos: string[];
  carrera: AruCarreras.AnyCentro;
  centro: string;
  ciclo: string;
  nivel: string;
}

export default async function EliminarMateria(
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

  const res = await client.fetch.fetch(url, {
    method: "DELETE",
    body: JSON.stringify(body),
  });
}
