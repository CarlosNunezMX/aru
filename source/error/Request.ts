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