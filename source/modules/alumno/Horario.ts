import buildURL from "@common/url";
import { type Schedule } from "@interfaces/modules/Horarios";
import type { Client } from "source/client";

interface HorarioProps {
  carrera: string;
  ciclo: string;
}

export function Horario(client: Client, { carrera, ciclo }: HorarioProps): Promise<Schedule.Item[]> {
  const url = buildURL(
    "https://leoalumnos-svc.udg.mx/alum/api/alumnos-esc/:code/:carrera/:ciclo/horarios",
    {
      carrera,
      ciclo,
      code: client.session!.userID,
    },
  );

  return client.fetch.fetch<Schedule.Item[]>(url);
}
