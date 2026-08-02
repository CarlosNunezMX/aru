import type { Client } from "@client";
import { buildURL } from "@common/url";

import type {
  Student as TStudent,
  RawStudent,
} from "@interfaces/modules/student";
import StudentTransformer from "@transformers/student";

export async function Student(client: Client): Promise<TStudent> {
  const studentId = client.session!.studentId;
  const url = buildURL(
    "https://leoalumnos-svc.udg.mx/alum/api/alumnos-sii/:studentId/datos-personales",
    { studentId },
  );
  const student = await client.fetch.fetch<RawStudent>(url);
  return StudentTransformer.transform(student);
}
