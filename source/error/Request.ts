import type { UnsupportedType } from "./UnsupportedType.js";
import type { MethodNotAllowedType } from "./method_now_allowed.js";
import type { UnauthorizedType } from "./unauthorized_type.js";

/**
 * Class for handle http requests error by throwing this class
 * @todo Documentar todos los errores
 */
export class RequestError<BodyType = null> extends Error{
    readonly status: number;
    readonly url: string;
    readonly Response: Response;
    body: Promise<BodyType> | null = null;
    constructor(response: Response){
        super(`Error al realizar la petición a ${response.url}`);
        this.status = response.status;
        this.url = response.url;
        this.Response = response;
    }
    /**
     * Recovers response body if it's a json or text
     */
    GetBody(): Promise<BodyType> | null {
        if(this.Response.headers.get("content-type")?.includes("application/json")){
            return (this.Response.json() as Promise<BodyType>);
        }
        if(this.Response.headers.get("content-type")?.includes("text/plain")){
            return (this.Response.text() as Promise<BodyType>);
        }
        return null;
    }
}

export function ErrorHandling(request: Response){
    if(request.status === 401)
        throw new RequestError<UnauthorizedType>(request)
    if (request.status === 415)
        throw new RequestError<UnsupportedType>(request);
    if(request.status === 405)
        throw new RequestError<MethodNotAllowedType>(request);
}