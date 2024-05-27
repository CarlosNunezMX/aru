export type UnsupportedType = {
    timestamp: number,
    status: 415,
    error: "Unsupported Media Type",
    path: string
}