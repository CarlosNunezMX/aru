/// <reference types="node" resolution-mode="require"/>
/**
 * Class for handle http requests error by throwing this class
 * @todo Documentar todos los errores
 */
export declare class RequestError<BodyType = null> extends Error {
    readonly status: number;
    readonly url: string;
    readonly Response: Response;
    body: Promise<BodyType> | null;
    constructor(response: Response);
    /**
     * Recovers response body if it's a json or text
     */
    GetBody(): Promise<BodyType> | null;
}
export declare function ErrorHandling(request: Response): void;
