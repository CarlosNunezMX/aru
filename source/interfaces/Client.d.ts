import type SessionToken from "@auth/index";
import type Fetch from "@common/fetch";

export type LaunchCB<T = unknown> = (
  fetch: Fetch,
  session: SessionToken.Session,
) => Promise<T>;
