import type { Carreras } from "@interfaces/carreras";
import type { Client } from "source/client";
import type { RegistroInit } from "@interfaces/index";
import HttpError from "@common/httpError";

interface AgendaSharedProps {
  carrera: Carreras.AnyCentro;
  centro: string;
  ciclo: string;
  nivel: string | "LI";
}

interface EliminarMateriaProps extends AgendaSharedProps {
  cursos: string[];
}

interface RegistroMateriasProps extends AgendaSharedProps {
  materias: string[];
}

type ValidarRegistroProps = Pick<
  AgendaSharedProps,
  "carrera" | "centro" | "ciclo"
>;

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

export async function RegistrarMaterias(
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
