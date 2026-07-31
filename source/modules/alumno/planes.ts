import buildURL from "@common/url";
import type { Plan } from "@interfaces/index";
import type { Client } from "source/client";

export async function PlanesEstudios(client: Client): Promise<Plan[]> {
  const url = buildURL(
    "https://leoalumnos-svc.udg.mx/alum/api/alumnos-esc/:code/planes-estudios",
    {
      code: client.session!.userID,
    },
  );

  return await client.fetch.fetch<Plan[]>(url);
}
