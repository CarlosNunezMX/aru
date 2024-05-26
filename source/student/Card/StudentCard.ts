import type { SoyUdgError, Card, DirtyCard } from "./StudentCardTypes.d.ts"
import { AuthMethod } from "../../utils/Method.js";
import { RequestError } from "../../error/Request.js";
import type { Login } from "../../auth/Login.js";

export class StudentCard extends AuthMethod<Card> {
  protected Route: string = "https://soyudg.udg.mx/alumnos/:studentCode";
  constructor(Auth: Login){
    super(Auth);
  }
  async exec(): Promise<Card> {
    const url = new URL(
      this.Route.replace(":studentCode", this.Auth.StudentCode!)
    )

    const request = await fetch(url.toString());

    const data = await request.json() as DirtyCard;
    if (data.data.error)
      throw new RequestError<SoyUdgError>(request);

    return data.data;
  }
}
