import type { Client } from "@client";
import { buildURL } from "@common/url";

import type * as Plan from "@interfaces/modules/planes";
import PlanTransformer from "@transformers/plan";

export async function StudentPlans(client: Client): Promise<Plan.Plan[]> {
  const url = buildURL(
    "https://leoalumnos-svc.udg.mx/alum/api/alumnos-esc/:code/planes-estudios",
    {
      code: client.session!.studentId,
    },
  );

  const plans = await client.fetch.fetch<Plan.RawPlan[]>(url);
  return plans.map((plan) => PlanTransformer(plan));
}
