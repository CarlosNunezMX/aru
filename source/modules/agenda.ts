import type { Client } from "@client";
import HttpError from "@common/httpError";

interface AgendaSharedProps {
  programId: string;
  hostId: string;
  cycleId: string;
  level: string | "LI";
  courses: string[];
}

type ValidarRegistroProps = Pick<
  AgendaSharedProps,
  "programId" | "hostId" | "cycleId"
>;

export async function DeleteCourse(
  client: Client,
  { courses, cycleId, hostId, level = "LI", programId }: AgendaSharedProps,
): Promise<void> {
  const studentId = client.session.studentId;
  const url = "https://leoalumnos-svc.udg.mx/alum/api/registro/cursos";

  const body = {
    idalumno: studentId,
    idprograma: programId,
    nivel: level,
    idciclo: cycleId,
    idcentro: hostId,
    cursos: courses,
  };

  await client.fetch.fetch(url, {
    method: "DELETE",
    body: JSON.stringify(body),
  });
}

export async function RegisterCourses(
  client: Client,
  { courses, cycleId, hostId, programId, level = "LI" }: AgendaSharedProps,
): Promise<void> {
  const url = "https://leoalumnos-svc.udg.mx/alum/api/registro/";
  const studentId = client.session.studentId;
  const body = {
    cursos: courses,
    idalumno: studentId,
    idcentro: hostId,
    idciclo: cycleId,
    idprograma: programId,
    nivel: level,
  };

  await client.fetch.fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function IsAgendaOpened(
  client: Client,
  { cycleId, hostId, programId }: ValidarRegistroProps,
): Promise<boolean> {
  try {
    const url =
      "https://leoalumnos-svc.udg.mx/alum/api/registro/validaciones-alumnos";
    const studentId = client.session.studentId;

    const body = {
      idalumno: studentId,
      idcentro: hostId,
      idciclo: cycleId,
      idprograma: programId,
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
