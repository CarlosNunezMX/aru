import buildURL from "@common/url";
import { type Schedule } from "@interfaces/modules/horarios";
import type { Client } from "source/client";

interface HorarioProps {
  carrera: string;
  ciclo: string;
}

function Horario({ carrera, ciclo }: HorarioProps, client: Client): Promise<Schedule.Item[]> {
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
export default Horario;
