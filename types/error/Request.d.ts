/// <reference types="node" resolution-mode="require"/>
export declare class RequestError<BodyType = null> extends Error {
    readonly status: number;
    readonly url: string;
    readonly Response: Response;
    body: Promise<BodyType> | null;
    constructor(response: Response);
    GetBody(): Promise<BodyType> | null;
}
