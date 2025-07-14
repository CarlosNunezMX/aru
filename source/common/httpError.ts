export default class HttpError extends Error {
    constructor(public code: number, message: string | Object) {
        super(typeof message === "string" ? message : JSON.stringify(message));
    }
}