declare class HttpError extends Error {
    code: number;
    constructor(code: number, message: string | Object);
}

export { HttpError as default };
